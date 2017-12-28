jQuery(document).ready(function($) {

    /*
     *  Begin add link email to contact (biar gaak kena spam)
     */
    function R(s) {
        return R13(R5(s));
    }

    function R5(s) {
        var b = [],
            c, i = s.length,
            a = '0'.charCodeAt(),
            z = a + 10;

        while (i--) {
            c = s.charCodeAt(i);
            if (c >= a && c < z) {
                b[i] = String.fromCharCode(((c - a + 5) % (10)) + a);
            } else {
                b[i] = s.charAt(i);
            }
        }

        return b.join('');
    }

    function R13(s) {
        var b = [],
            c, i = s.length,
            a = 'a'.charCodeAt(),
            z = a + 26,
            A = 'A'.charCodeAt(),
            Z = A + 26;

        while (i--) {
            c = s.charCodeAt(i);
            if (c >= a && c < z) {
                b[i] = String.fromCharCode(((c - a + 13) % (26)) + a);
            } else if (c >= A && c < Z) {
                b[i] = String.fromCharCode(((c - A + 13) % (26)) + A);
            } else {
                b[i] = s.charAt(i);
            }
        }

        return b.join('');
    }

    // function check document and all sub-resources have finished loading
    var docReady = function() {
        if (document.readyState === "complete") {
            return true;
        } else {
            return false;
        }
    }

    // loading bar
    var nanobar = new Nanobar({
        autoRun: true
    });

    // finish loading ?
    if (docReady) {
        nanobar.go(100);
    }

    /*
     *  End add link email to contact
     */

    // encrypt email
    var t = 'znvygb:'
    var m = 'vpunque@tznvy.pbz';
    // end encrypt email

    // remove active menu
    $('a.rc').click(function() {
        $('#menu li a').removeClass('active');
    });

    // active menu
    $('#menu li a').on('click', function() {
        $('#menu li a').removeClass('active');
        $(this).attr('class', 'active');
    });

    var lastElementClicked;

    Barba.Pjax.Dom.wrapperId = 'main-container';
    Barba.Pjax.Dom.containerClass = 'wrap-container';
    Barba.Pjax.ignoreClassLink = 'nopjax';
    Barba.Pjax.cacheEnabled = false;


    Barba.Pjax.init();
    // Barba.Prefetch.init();

    // Barba.Pjax.start();

    var LetsMove = Barba.BaseTransition.extend({
        start: function() {

            Promise
                .all([this.newContainerLoading, this.letProgress()])
                .then(this.movePages.bind(this));
        },

        letProgress: function() {

            nanobar.auto();
            // $(this.oldContainer).animate({
            //     opacity: 0
            // }).promise();

        },


        movePages: function() {
            /**
             * this.newContainer is the HTMLElement of the new Container
             * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
             * Please note, newContainer is available just after newContainerLoading is resolved!
             */

            var _this = this;
            var $el = $(this.newContainer);

            $(this.oldContainer).hide();

            $el.css({
                visibility: 'visible',
                opacity: 0
            });



            $el.animate({
                opacity: 1
            }, 500, function() {
                /**
                 * Do not forget to call .done() as soon your transition is finished!
                 * .done() will automatically remove from the DOM the old Container
                 */

                _this.done();

            });

            // scroll page to top
            window.scroll(0, 0);

        },
        // getNewPageFile: function() {
        //     return Barba.HistoryManager.currentStatus().url.split('/').pop();
        // }
    });


    Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {

        // add email on menu
        $('li#contact a').attr('href', R(t + m));

        // responsive menu
        var $toggle = $('.toggle');
        var $dropdown = $('.dropdown-menu li a');
        var $overlay = $('#overlay');

        $toggle.click(function() {
            var target = $(this).data('target');
            $('html').addClass(target + '-open');
        });

        $dropdown.click(function() {
            $('html').removeClass('menu-open elsewhere-open');
        });

        $overlay.click(function() {
            $('html').removeClass('menu-open elsewhere-open');
        });
        // end responsive menu

        // iframe responsive
        reframe('iframe');

        // lazy load
        $('img.lazy').unveil();

        // finish loading bar
        nanobar.go(100);

    });

    var Homepage = Barba.BaseView.extend({
        namespace: 'index',
        onEnter: function() {

        }
    });

    var Articel = Barba.BaseView.extend({
        namespace: 'articles',
        onEnter: function() {


        },
        onEnterCompleted: function() {
            // Periods
            $('.year, .season').each(function() {
                $(this).affix({
                    offset: {
                        top: $(this).offset().top
                    }
                });
            });

            $('.period').each(function() {
                $(this).affix({
                    offset: {
                        top: $(this).offset().top
                    }
                });
            });

        }
    });

    var Favorite = Barba.BaseView.extend({
        namespace: 'favourites',
        onEnter: function() {


        }
    });

    var Links = Barba.BaseView.extend({
        namespace: 'links',
        onEnter: function() {


        }
    });

    var Post = Barba.BaseView.extend({
        namespace: 'post',
        onEnter: function() {


        },
        onEnterCompleted: function() {
            var $headings = $('#content h2, #content h3');

            $headings.each(function() {
                var $el = $(this);
                var id = $el.attr('id');
                if (id) {
                    $el.prepend(
                        $('<a />')
                        .addClass('anchor')
                        .attr('href', '#' + id)
                        .html('#')
                    );
                }
            });

            $('#top').on('click', function(e) {
                e.preventDefault();
                $('body,html').animate({
                    scrollTop: 0
                }, 700);
            });

            // keyboard shortcut previous (left) and next (right) navigation
            document.onkeydown = checkShortcuts;

            function checkShortcuts(event) {
                switch (event.keyCode) {
                    case 37:
                        leftKeyPressed();
                        break;
                    case 39:
                        rightKeyPressed();
                        break;
                    default:
                        break;
                }
            }

            function leftKeyPressed() {
                document.getElementById("pgprev").click();
            }

            function rightKeyPressed() {
                document.getElementById("pgnext").click();
            }
        }
    });

    Barba.Pjax.getTransition = function() {

        // call transition
        return LetsMove;
    };

    // Homepage.init();
    Articel.init();
    // Favorite.init();
    // Links.init();
    Post.init();




});