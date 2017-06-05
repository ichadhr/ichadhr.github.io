jQuery(document).ready(function ($) {

    (function() {
        function Centerify(elem, options) {
            var self = this;
            self.$elem = $(elem);
            self.$sections = self.$elem.children('.project');
            self.isAnimating = false;
            self.bodyAndHeadEl = $('body');
            self.speed = 200;
            self.wait = 500;
            self.offset = 320;

            init();

            function init() {
                onResize();
            }

            function onResize() {
                self.windowHeight = $(window).height();
                self.windowWidth = $(window).width();
                self.offsetPercentage = self.offset / self.windowHeight;
            }

            function centerOnSegment(percentage) {
                if (!percentage || self.isAnimating || (self.windowHeight < 700) || (self.windowWidth < 1000)) {
                    return;
                }

                var scrollDone = function() {
                    self.isAnimating = false;

                    $(window).off('scroll', scrollEvent);
                    $(window).unbind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', scrollEvent);

                    if (self.bodyAndHeadEl.get(0).scrollTop === 0) {
                        return;
                    }
                };

                var scrollEvent = function(e) {
                    if (e.which > 0 || e.type == 'mousedown' || e.type == 'mousewheel') {
                        self.bodyAndHeadEl.stop();
                        scrollDone();
                    }
                };

                $(window).bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', scrollEvent);
                clearTimeout(self.onScrollTimer);

                self.isAnimating = true;
                self.bodyAndHeadEl.stop().animate({
                    scrollTop: (Math.round(percentage) * self.windowHeight + self.offset)
                }, self.speed, function () {
                    return scrollDone();
                });
            }

            $(window).bind('scroll', function() {
                clearTimeout(self.onScrollTimer);

                self.onScrollTimer = setTimeout(function () {
                    var currentScroll =  self.bodyAndHeadEl.scrollTop();
                    var currentPercentage = ((currentScroll / self.windowHeight) - self.offsetPercentage).toFixed(2);
                    var currentModulo = Math.abs(currentPercentage % 1);
                    console.log(currentModulo);

                    if (currentPercentage > -0.14 && (currentModulo < 0.14 || currentModulo > 0.86)) {
                        centerOnSegment(currentPercentage);
                    }
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

    $('#projects').centerify();

});
