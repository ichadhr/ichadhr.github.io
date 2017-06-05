jQuery(document).ready(function ($) {

  (function() {
    function Centerify(elem, options) {
      var self = this;

      self.$elem = $(elem);
      self.$sections = self.$elem.children('section');
      self.isAnimating = false;
      self.bodyAndHeadEl = $('body');
      self.count = self.$sections.length;
      self.speed = 100;
      self.wait = 500;

      init();

      function init() {
        onResize();
      }

      function onResize() {
        self.windowHeight = $(window).height();
      }

      function centerOnSegment(percentage) {
        if (!percentage) {
          return;
        }

        if (self.isAnimating) {
          return;
        }

        var done = function done() {
          self.isAnimating = false;
          $(window).off('scroll', scrollEvent);
          $(window).unbind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', scrollEvent);

          if (self.bodyAndHeadEl.get(0).scrollTop === 0) {
            return;
          }
        };

        var scrollEvent = function scrollEvent(e) {
          if (e.which > 0 || e.type == 'mousedown' || e.type == 'mousewheel') {
            self.bodyAndHeadEl.stop();
            done();
          }
        };

        $(window).bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', scrollEvent);

        clearTimeout(self.onScrollTimer);

        self.isAnimating = true;

        self.bodyAndHeadEl.stop().animate({
          scrollTop: (Math.round(percentage) * self.windowHeight)
        }, self.speed, function () {
          return done();
        });
      }

      $(window).bind('scroll', function() {
        clearTimeout(self.onScrollTimer);

        self.onScrollTimer = setTimeout(function () {
          var currentScroll =  self.bodyAndHeadEl.scrollTop();
          var currentPercentage = (currentScroll / self.windowHeight).toFixed(2);
          centerOnSegment(currentPercentage);
        }, self.wait);
      });

      $(window).bind('resize', function() {
        onResize();
      });
    }

    $.fn.centerify = function(options) {
      return this.each(function() {
        if (!$(this).data('centerify'))
          $(this).data('centerify', new Centerify(this, options));
      });
    };
  })();

  // $('#index').centerify();

  (function() {
    function Drawify() {
      var docElem = window.document.documentElement;
      var $dots = $('#dots ul li');
      var $body = $('body');

      window.requestAnimFrame = function(){
        return (
          window.requestAnimationFrame     ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame  ||
          window.oRequestAnimationFrame    ||
          window.msRequestAnimationFrame   ||
          function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
          }
        );
      }();

      window.cancelAnimFrame = function(){
        return (
          window.cancelAnimationFrame     ||
          window.webkitCancelAnimationFrame ||
          window.mozCancelAnimationFrame  ||
          window.oCancelAnimationFrame    ||
          window.msCancelAnimationFrame   ||
          function(id){
            window.clearTimeout(id);
          }
        );
      }();

      function SVGEl( el ) {
        this.el = el;
        this.image = this.el.previousElementSibling;
        this.current_frame = 0;
        this.total_frames = 120;
        this.path = new Array();
        this.length = new Array();
        this.handle = 0;
        this.init();
      }

      SVGEl.prototype.init = function() {
        var self = this;
        [].slice.call( this.el.querySelectorAll('path')).forEach( function(path, i) {
          self.path[i] = path;
          var l = self.path[i].getTotalLength();
          self.length[i] = l;
          self.path[i].style.strokeDasharray = l + ' ' + l;
          self.path[i].style.strokeDashoffset = l;
        } );
      };

      SVGEl.prototype.render = function() {
        if( this.rendered ) return;
        this.rendered = true;
        this.draw();
        $(this.el).next().addClass('animate');
      };

      SVGEl.prototype.draw = function() {
        var self = this,
          progress = this.current_frame/this.total_frames;
        if (progress > 1) {
          window.cancelAnimFrame(this.handle);
          this.showImage();
        } else {
          this.current_frame++;
          for(var j=0, len = this.path.length; j<len;j++){
            this.path[j].style.strokeDashoffset = Math.floor(this.length[j] * (1 - progress));
          }
          this.handle = window.requestAnimFrame(function() { self.draw(); });
        }
      };

      SVGEl.prototype.showImage = function() {
        // console.log($(this.el));
        // classie.add( this.image, 'show' );
        // classie.add( this.el, 'hide' );
      };

      function getViewportH() {
        var client = docElem['clientHeight'],
          inner = window['innerHeight'];

        if( client < inner )
          return inner;
        else
          return client;
      }

      function getPageHeight() {
        return Math.max($(document).height(), $(window).height());
      }

      function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
      }

      // http://stackoverflow.com/a/5598797/989439
      function getOffset(el) {
        var offsetTop = 0, offsetLeft = 0;
        do {
          if ( !isNaN( el.offsetTop ) ) {
            offsetTop += el.offsetTop;
          }
          if ( !isNaN( el.offsetLeft ) ) {
            offsetLeft += el.offsetLeft;
          }
        } while( el = el.offsetParent )

        return {
          top : offsetTop,
          left : offsetLeft
        };
      }

      function inViewport(el, h) {
        var elH = el.offsetHeight,
          scrolled = scrollY(),
          viewed = scrolled + getViewportH(),
          elTop = getOffset(el).top,
          elBottom = elTop + elH,
          // if 0, the element is considered in the viewport as soon as it enters.
          // if 1, the element is considered in the viewport only when it's fully inside
          // value in percentage (1 >= h >= 0)
          h = h || 0.1;

        return (elTop + elH * h) <= viewed && (elBottom) >= scrolled;
      }

      function highlightDot() {
        var fullHeight = getPageHeight();
        var viewportHeight = getViewportH();
        var position = scrollY();
        var fakePosition = position - (viewportHeight / 4);
        var current = Math.max(Math.round(fakePosition * 4 / fullHeight), 0);
        $dots.removeClass('active');
        $dots.eq(current).addClass('active');
      }

      function init() {
        var svgs = Array.prototype.slice.call(document.querySelectorAll('#index svg')),
          svgArr = new Array(),
          didScroll = false,
          resizeTimeout;

        // the svgs already shown...
        svgs.forEach(function(el, i) {
          var svg = new SVGEl(el);
          svgArr[i] = svg;
          setTimeout(function(el) {
            return function() {
              if(inViewport(el.parentNode)) {
                svg.render();
              }
            };
          }(el), 250);
        });

        highlightDot();

        $dots.click(function() {
          var fullHeight = getPageHeight();
          var index = $dots.index(this);
          $body.stop().animate({
            scrollTop: Math.round((fullHeight / 4) * index)
          }, 200);
        });

        var scrollHandler = function() {
          if(!didScroll) {
            didScroll = true;
            setTimeout(function() { scrollPage(); }, 60);
          }
        };

        var scrollPage = function() {
          svgs.forEach(function(el, i) {
            if(inViewport(el.parentNode, 0.5)) {
              svgArr[i].render();
            }
          });
          highlightDot();
          didScroll = false;
        };

        var resizeHandler = function() {
          function delayed() {
            scrollPage();
            resizeTimeout = null;
          }
          if (resizeTimeout) {
            clearTimeout(resizeTimeout);
          }
          resizeTimeout = setTimeout(delayed, 200);
        };

        window.addEventListener( 'scroll', scrollHandler, false );
        window.addEventListener( 'resize', resizeHandler, false );
      }

      init();
    }

    $.fn.drawify = function(options) {
      return this.each(function() {
        if (!$(this).data('drawify'))
          $(this).data('drawify', new Drawify(this, options));
      });
    };
  })();

  $('#index').drawify();

});
