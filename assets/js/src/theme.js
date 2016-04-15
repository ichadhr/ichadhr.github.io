/**
 *  Zebra_Tooltips
 *
 *  Zebra_Tooltips is a lightweight (around 5KB minified, 1.6KB gzipped) jQuery plugin for creating simple but smart and
 *  visually attractive tooltips, featuring nice transitions, and offering a wide range of configuration options. The
 *  plugin detects the edges of the browser window and makes sure that the tooltips always stay in the visible area of
 *  the browser window by placing them beneath or above the parent element, and shifting them left or right so that the
 *  tooltips are always visible.
 *
 *  Besides the default behavior of tooltips showing when user hovers the element, tooltips may also be shown and hidden
 *  programmatically using the API. When shown programmatically, the tooltips will feature a "close" button, and clicking
 *  it will be the only way of closing tooltips opened this way. This is very useful for drawing users' attention to
 *  specific areas of a website (like error messages after validating a form).
 *
 *  By default, the plugin will use the "title" attribute of the element for the tooltip's content, but the tooltip's
 *  content can also be specified via the "zebra-tooltip" data attribute, or programmatically. Tooltips' appearance can be
 *  easily customized both through JavaScript and/or CSS. Also, tooltips can be aligned left, center or right, relative
 *  to the parent element.
 *
 *  Zebra_Tooltips uses NO IMAGES (everything is handled from CSS), and falls back gracefully for browsers that don't
 *  support all the fancy stuff; also, tooltips can be attached to any element not just anchor tags!
 *
 *  Works in all major browsers (Firefox, Opera, Safari, Chrome, Internet Explorer 6+)
 *
 *  Visit {@link http://stefangabos.ro/jquery/zebra-tooltips/} for more information.
 *
 *  For more resources visit {@link http://stefangabos.ro/}
 *
 *  @author     Stefan Gabos <contact@stefangabos.ro>
 *  @version    1.2.4 (last revision: January 20, 2016)
 *  @copyright  (c) 2012 - 2016 Stefan Gabos
 *  @license    http://www.gnu.org/licenses/lgpl-3.0.txt GNU LESSER GENERAL PUBLIC LICENSE
 *  @package    Zebra_Tooltips
 */
;(function($) {

    'use strict';

    $.Zebra_Tooltips = function(elements, options) {

        var defaults = {

            animation_speed:    250,            //  The speed (in milliseconds) of the animation used to show/hide tooltips.
                                                //
                                                //  Default is 250

            animation_offset:   20,             //  The number of pixels the tooltips should use to "slide" into position.
                                                //
                                                //  Set to 0 for no sliding.
                                                //
                                                //  Default is 20

            background_color:   '#000',         //  Tooltip's background color.
                                                //
                                                //  May be a hexadecimal color (like #BADA55) or a supported named color
                                                //  (like "limegreen")
                                                //
                                                //  Default is #000

            close_on_click:     true,           //  By default, if the users clicks when over a tooltip, the tooltip will
                                                //  close (if the tooltip was not open using the API, that is)
                                                //
                                                //  Set this property to FALSE to prevent this behaviour.
                                                //
                                                //  Default is TRUE

            color:              '#FFF',         //  Tooltip's text color.
                                                //
                                                //  May be a hexadecimal color (like #FFF) or a supported named color
                                                //  (like "white")
                                                //
                                                //  Default is #FFF

            content:            false,          //  The content of the tooltip.
                                                //
                                                //  Usually, the content of the tooltip is given in the "title" attribute
                                                //  or as the "zebra-tooltip" data attribute of the element the tooltip
                                                //  is attached to.
                                                //
                                                //  Setting this property to FALSE will use the property's value as the
                                                //  content of all the tooltips rather than using the values of the "title"
                                                //  or the data attribute.
                                                //
                                                //  Default is FALSE

            default_position:   'above',        //  By default, tooltips are shown above the elements they are attached to
                                                //  and are shown below only if there isn't enough space above.
                                                //
                                                //  Set the value of this property to "below" if you want to reverse the
                                                //  default behavior so that tooltips will be shown below the elements
                                                //  they are attached to and will be shown above only there isn't enough
                                                //  space below.
                                                //
                                                //  Possible values are "above" and "below".
                                                //
                                                //  Default is "above"

            hide_delay:         100,            //  The delay (in milliseconds) after which to hide the tooltip once the
                                                //  mouse moves away from the trigger element or the tooltip.
                                                //
                                                //  Default is 100

            keep_visible:       true,           //  Should tooltips remain visible also when the mouse cursor is over
                                                //  the tooltips or should the tooltips be visible strictly when the mouse
                                                //  cursor is over the parent elements.
                                                //
                                                //  Default is TRUE

            max_width:          250,            //  Maximum width of the tooltip's content;
                                                //
                                                //  Default is 250

            opacity:            '.95',          //  The tooltip's opacity.
                                                //
                                                //  Must be a value between 0 (completely transparent) and 1 (completely
                                                //  opaque)
                                                //
                                                //  Default is .85

            position:           'center',       //  The tooltip's position, relative to the trigger element.
                                                //
                                                //  Can be 'center', 'left' or 'right'.
                                                //
                                                //  Default is 'center'

            prerender:          false,          //  If set to TRUE, tooltips will be created on document load, rather than
                                                //  only when needed.
                                                //
                                                //  Default is FALSE

            show_delay:         100,            //  The delay (in milliseconds) after which to show the tooltip once the
                                                //  mouse is over the trigger element.
                                                //
                                                //  Default is 100

            vertical_offset:    0,              //  How close (in pixels) should the tip of the tooltip be relative to
                                                //  the parent element.
                                                //
                                                //  Default is 0

            onBeforeHide:       null,           //  Event fired before a tooltip is hidden.
                                                //
                                                //  The callback function (if any) receives as arguments the
                                                //  element the tooltip is attached to, and the tooltip element.

            onHide:             null,           //  Event fired after a tooltip is hidden.
                                                //
                                                //  The callback function (if any) receives as arguments the
                                                //  element the tooltip is attached to, and the tooltip element.

            onBeforeShow:       null,           //  Event fired before a tooltip is shown.
                                                //
                                                //  The callback function (if any) receives as arguments the
                                                //  element the tooltip is attached to, and the tooltip element.

            onShow:             null            //  Event fired after a tooltip is shown.
                                                //
                                                //  The callback function (if any) receives as arguments the
                                                //  element the tooltip is attached to, and the tooltip element.

        },

        // to avoid confusions, we use "plugin" to reference the current instance of the object
        plugin = this,

        // private variables used throughout the script
        window_width, window_height, horizontal_scroll, vertical_scroll;

        plugin.settings = {};

        /**
         *  Hides the tooltips attached to the element(s) given as argument.
         *
         *  @param  jQuery  elements    A jQuery selector of element(s) for which to hide the attached tooltips.
         *
         *  @param  boolean destroy     If set to TRUE, once hidden, the tooltip will be "muted" and will *not* be
         *                              shown again when the user hovers the parent element with the mouse.
         *
         *                              In this case, the tooltip can be shown again only by calling the {@link show()}
         *                              method.
         *
         *                              Default is FALSE
         *
         *  @return void
         */
        plugin.hide = function(elements, destroy) {

            // iterate through the elements given as argument
            elements.each(function() {

                var

                    // the current element
                    $element = $(this),

                    // get a reference to the attached tooltip and its components
                    tooltip_info = $element.data('Zebra_Tooltip');

                // if there is a tooltip attached
                if (tooltip_info) {

                    // set this flag to FALSE so we can hide the tooltip
                    tooltip_info.sticky = false;

                    // set a flag if tooltip needs to be "muted" after hiding it
                    if (destroy) tooltip_info.destroy = true;

                    // cache updated tooltip data
                    $element.data('Zebra_Tooltip', tooltip_info);

                    // show the tooltip
                    _hide($element);

                }

            });

        };

        /**
         *  Shows the tooltips attached to the element(s) given as argument.
         *
         *  When showing a tooltip using this method, the tooltip can only be closed by the user clicking on the "close"
         *  icon on the tooltip (which is automatically added when using this method) or by calling the {@link hide()}
         *  method.
         *
         *  @param  jQuery  elements    A jQuery selector of element(s) for which to show the attached tooltips.
         *
         *  @param  boolean destroy     If set to TRUE, once the user clicks the "close" button, the tooltip will be
         *                              "muted" and will *not* be shown when the user hovers the parent element with
         *                              the mouse.
         *
         *                              In this case, the tooltip can be shown again only by calling this method.
         *
         *                              If set to FALSE, the tooltip will be shown whenever the user hovers the parent
         *                              element with the mouse, only it will not have the "close" button anymore.
         *
         *                              Default is FALSE.
         *
         *  @return void
         */
        plugin.show = function(elements, destroy) {

            // iterate through the elements given as argument
            elements.each(function() {

                var

                    // the current element
                    $element = $(this),

                    // get a reference to the attached tooltip and its components
                    tooltip_info = $element.data('Zebra_Tooltip');

                // if there is a tooltip attached
                if (tooltip_info) {

                    // when shown using the API, the tooltip can be hidden only by clicking on the "close" button
                    tooltip_info.sticky = true;

                    // set this to FALSE so we can show the tooltip
                    tooltip_info.muted = false;

                    // set a flag if tooltip needs to "muted" after hiding
                    if (destroy) tooltip_info.destroy = true;

                    // cache updated tooltip data
                    $element.data('Zebra_Tooltip', tooltip_info);

                    // show the tooltip
                    _show($element);

                }

            });

        };

        /**
         *  Constructor method
         *
         *  @return void
         *
         *  @access private
         */
        var _init = function() {

            // the plugin's final properties are the merged default and user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);

            // iterate through the elements we need to attach the plugin to
            elements.each(function() {

                var

                    // reference to the jQuery version of the element
                    $element = $(this),

                    // the element's title attribute (if any)
                    title = $element.attr('title'),

                    // the element's data attribute
                    data_attribute = $element.data('zebra-tooltip');

                // if
                if (

                    // element has a "title" attribute and is not empty OR
                    (title && title !== '') ||

                    // element has the proper data attribute set, and is not empty OR
                    (data_attribute && data_attribute !== '') ||

                    // content is given via the "content" property
                    undefined !== plugin.settings.content

                ) {

                    // handlers for some of the element's events
                    $element.bind({

                        // when mouse cursor enters the parent element
                        'mouseenter': function() {

                            // clear the "title" attribute (if present) to prevent browser's default behavior
                            if (title) $(this).attr('title', '');

                            // show the attached tooltip
                            _show($element);

                        },

                        // when mouse cursor leaves the parent element
                        'mouseleave': function() {

                            // hide the attached tooltip
                            _hide($element);

                            // if "title" attribute was present, set it back to its original state
                            if (title) $(this).attr('title', title);

                        }

                    });

                    // initialize and cache tooltip data
                    $element.data('Zebra_Tooltip', {
                        'tooltip':              null,
                        'content':              data_attribute || title || '',
                        'window_resized':       true,
                        'window_scrolled':      true,
                        'show_timeout':         null,
                        'hide_timeout':         null,
                        'animation_offset':     plugin.settings.animation_offset,
                        'sticky':               false,
                        'destroy':              false,
                        'muted':                false
                    });

                    // if tooltips are to be pre-generated, generate them now
                    if (plugin.settings.prerender) _create_tooltip($element);

                }

            });

            // if the browser's window is resized or scrolled, we need to recompute the tooltips' positions
            $(window).bind('scroll resize', function(event) {

                // iterate through the elements that have tooltips attached
                elements.each(function() {

                    // get a reference to the attached tooltip and its components
                    var tooltip_info = $(this).data('Zebra_Tooltip');

                    // if element has a tooltip attached
                    // (it may not have if it had no "title" attribute or the attribute was empty)
                    if (tooltip_info) {

                        // if window was scrolled, set a flag
                        if (event.type == 'scroll') tooltip_info.window_scrolled = true;

                        // if window was resized, set a flag
                        else tooltip_info.window_resized = true;

                        // cache updated tooltip data
                        $(this).data('Zebra_Tooltip', tooltip_info);

                    }

                });

            });

        };

        /**
         *  Generates a tooltip's HTML code and inserts it into the DOM.
         *  It returns an object containing references to the tooltip's components.
         *
         *  If the tooltip already exists, the method will simply return the object with references to the tooltip's
         *  components.
         *
         *  @param  jQuery  $element    The jQuery version of a DOM element to which to attach the tooltip to.
         *
         *  @return object              Returns an object containing references to the tooltip's components.
         *
         *  @access private
         */
    var _create_tooltip = function($element) {

            // get a reference to the tooltip and its components, if available
            var tooltip_info = $element.data('Zebra_Tooltip');

            // if tooltip's HTML was not yet created
            if (!tooltip_info.tooltip) {

                var

                    // create the tooltip's main container
                    tooltip = jQuery('<div>', {

                        'class': 'Zebra_Tooltip',

                        css: {
                            'opacity':   0,
                            'display':  'block'
                        }

                    }),

                    // create the tooltip's message container
                    message = jQuery('<div>', {

                        'class': 'Zebra_Tooltip_Message',

                        css: {
                            'max-width':        plugin.settings.max_width,
                            'background-color': plugin.settings.background_color,
                            'color':            plugin.settings.color
                        }

                    // add the content of the tooltip
                    // using either the message given as argument when instantiating the object,
                    // or the message contained in the "title" attribute of the parent element
                    }).html(plugin.settings.content ? plugin.settings.content : tooltip_info.content)

                    // append the element to the main container
                    .appendTo(tooltip),

                    // create the tooltip's arrow container
                    arrow_container = jQuery('<div>', {

                        'class': 'Zebra_Tooltip_Arrow'

                    // append the element to the main container
                    }).appendTo(tooltip),

                    // create the actual arrow
                    // and append it to the arrow container
                    arrow = jQuery('<div>').appendTo(arrow_container);

                // if tooltip is to be kept visible when mouse cursor is over the tooltip
                if (plugin.settings.keep_visible) {

                    // when mouse leaves the tooltip's surface or the tooltip is clicked
                    tooltip.bind('mouseleave' + (plugin.settings.close_on_click ? ' click' : ''), function() {

                        // hide the tooltip
                        _hide($element);

                    });

                    // when mouse enters the tooltip's surface
                    tooltip.bind('mouseenter', function() {

                        // keep the tooltip visible
                        _show($element);

                    });

                }

                // inject the tooltip into the DOM
                // (so that we can get its dimensions)
                tooltip.appendTo('body');

                var

                    // get tooltip's width and height
                    tooltip_width = tooltip.outerWidth(),
                    tooltip_height = tooltip.outerHeight(),

                    // get arrow's width and height
                    arrow_width = arrow.outerWidth(),
                    arrow_height = arrow.outerHeight(),

                    // in IE9, after hardcoding the width (see below), the box's actual width changes with a few pixels,
                    // but enough to sometimes trigger the wrapping of the text; this results in the "message" element having
                    // a greater actual height than the one we're just about to hard-coded and this, in turn, results in the
                    // arrow not being visible; therefore, save the values now
                    tmp_width = message.outerWidth(),
                    tmp_height = message.outerHeight();

                // group all data together
                tooltip_info = {
                    'tooltip':          tooltip,
                    'tooltip_width':    tooltip_width,
                    'tooltip_height':   tooltip_height + (arrow_height / 2),
                    'message':          message,
                    'arrow_container':  arrow_container,
                    'arrow_width':      arrow_width,
                    'arrow_height':     arrow_height,
                    'arrow':            arrow
                };


                // hardcode the tooltip's width and height so it doesn't gets broken due to word wrapping when the
                // tooltip is too close to the edges of the browser's window
                tooltip.css({
                    'width':    tooltip_info.tooltip_width,
                    'height':   tooltip_info.tooltip_height
                });

                // adjust, if needed, the values representing the toolip's width/height
                tooltip_info.tooltip_width = tooltip_info.tooltip_width + (message.outerWidth() - tmp_width);
                tooltip_info.tooltip_height = tooltip_info.tooltip_height + (message.outerHeight() - tmp_height);

                // adjust, if needed, the toolip's width/height, and hide it for now
                tooltip.css({
                    'width':    tooltip_info.tooltip_width,
                    'height':   tooltip_info.tooltip_height,
                    'display':  'none'
                });

                // merge new tooltip data with tooltip data created when instantiating the library
                tooltip_info = $.extend($element.data('Zebra_Tooltip'), tooltip_info);

                // cache updated tooltip data
                $element.data('Zebra_Tooltip', tooltip_info);

            }

            // if tooltip was triggered through the API and the "close" button was not yet added
            if (tooltip_info.sticky && !tooltip_info.close) {

                // create the "close" button
                jQuery('<a>', {

                        'class':    'Zebra_Tooltip_Close',
                        'href':     'javascript:void(0)'

                // when the button is clicked
                }).html('x').bind('click', function(e) {

                    e.preventDefault();

                    // get a reference to the attached tooltip and its components
                    var tooltip_info = $element.data('Zebra_Tooltip');

                    // set this flag to FALSE so we can hide the tooltip
                    tooltip_info.sticky = false;

                    // cache updated tooltip data
                    $element.data('Zebra_Tooltip', tooltip_info);

                    // hide the tooltip
                    _hide($element);

                // add the "close" button to the tooltip
                }).appendTo(tooltip_info.message);

                // make sure we only create the "close" button once
                tooltip_info.close = true;

                // update tooltip data
                tooltip_info = $.extend($element.data('Zebra_Tooltip'), tooltip_info);

                // cache updated tooltip data
                $element.data('Zebra_Tooltip', tooltip_info);

            }

            // if browser window was resized or scrolled
            if (tooltip_info.window_resized || tooltip_info.window_scrolled) {

                // reference to the browser window
                var browser_window = $(window);

                // if the browser window was resized
                if (tooltip_info.window_resized) {

                    // get the browser window's width
                    window_width = browser_window.width();

                    // get the browser window's height
                    window_height = browser_window.height();

                    // get the element's position, relative to the document
                    var element_position = $element.offset();

                    // cache element's position and size
                    $.extend(tooltip_info, {

                        'element_left':     element_position.left,
                        'element_top':      element_position.top,
                        'element_width':    $element.outerWidth(),
                        'element_height':   $element.outerHeight()

                    });

                }

                // get the browser window's horizontal and vertical scroll offsets
                vertical_scroll = browser_window.scrollTop();
                horizontal_scroll = browser_window.scrollLeft();

                // compute tooltip's and the arrow's positions
                var tooltip_left =  plugin.settings.position == 'left' ? tooltip_info.element_left - tooltip_info.tooltip_width + tooltip_info.arrow_width :
                                    (plugin.settings.position == 'right' ? tooltip_info.element_left + tooltip_info.element_width - tooltip_info.arrow_width :
                                    (tooltip_info.element_left + (tooltip_info.element_width - tooltip_info.tooltip_width) / 2)),

                    tooltip_top =   tooltip_info.element_top - tooltip_info.tooltip_height,

                    arrow_left =    plugin.settings.position == 'left' ? tooltip_info.tooltip_width - tooltip_info.arrow_width - (tooltip_info.arrow_width / 2) :
                                    (plugin.settings.position == 'right' ? (tooltip_info.arrow_width / 2) :
                                    ((tooltip_info.tooltip_width - tooltip_info.arrow_width) / 2));

                // if tooltip's right side is outside te visible part of the browser's window
                if (tooltip_left + tooltip_info.tooltip_width > window_width + horizontal_scroll) {

                    // adjust the arrow's position
                    arrow_left -= (window_width + horizontal_scroll) - (tooltip_left + tooltip_info.tooltip_width) - 6;

                    // adjust the tooltip's position
                    tooltip_left = (window_width + horizontal_scroll) - tooltip_info.tooltip_width - 6;

                    // if after the adjustment, the arrow still needs to be adjusted
                    if (arrow_left + tooltip_info.arrow_width > tooltip_info.tooltip_width - 6)

                        // adjust the arrow's position
                        arrow_left = tooltip_info.tooltip_width - 6 - tooltip_info.arrow_width;

                    // if there is no space to show the arrow, hide it
                    if (tooltip_left + arrow_left + (tooltip_info.arrow_width / 2) < tooltip_info.element_left) arrow_left = -10000;

                }

                // if tooltip's left side is outside te visible part of the browser's window
                if (tooltip_left < horizontal_scroll) {

                    // adjust the arrow's position
                    arrow_left -= horizontal_scroll - tooltip_left;

                    // adjust the tooltip's position
                    tooltip_left = horizontal_scroll + 2;

                    // if after the adjustment, the arrow still needs to be adjusted
                    if (arrow_left < 0)

                        // adjust the arrow's position
                        arrow_left = (tooltip_info.arrow_width / 2);

                    // if there is no space to show the arrow, hide it
                    if (tooltip_left + arrow_left + (tooltip_info.arrow_width / 2) > tooltip_info.element_left + tooltip_info.element_width) arrow_left = -10000;

                }

                // by default, we assume the tooltip is centered above the element and therefore the arrow is at bottom of the tooltip
                // (we remove everything that might have been set on a previous iteration)
                tooltip_info.arrow_container.removeClass('Zebra_Tooltip_Arrow_Top');
                tooltip_info.arrow_container.addClass('Zebra_Tooltip_Arrow_Bottom');
                tooltip_info.message.css('margin-top', '');

                // set the arrow's color (we set it for different sides depending if it points upwards or downwards)
                tooltip_info.arrow.css('borderColor', plugin.settings.background_color + ' transparent transparent');

                // if
                if (

                    // top of the tooltip is outside the visible part of the browser's window OR
                    tooltip_top < vertical_scroll ||

                    // tooltips are to be shown from below the element, and there is enough space below the element to show the tooltip
                    (plugin.settings.default_position == 'below' && tooltip_info.element_top + tooltip_info.element_height + plugin.settings.vertical_offset + tooltip_info.tooltip_height + tooltip_info.animation_offset < window_height + vertical_scroll)

                ) {

                    // place the tooltip beneath the element, rather than above, also account for the offset
                    tooltip_top = tooltip_info.element_top + tooltip_info.element_height - plugin.settings.vertical_offset;

                    // the tooltip will slide upwards, rather than downwards
                    tooltip_info.animation_offset = Math.abs(tooltip_info.animation_offset);

                    // the body of the tooltip needs to be vertically aligned at the bottom
                    tooltip_info.message.css('margin-top', (tooltip_info.arrow_height / 2));

                    // in this case, the arrow need to point upwards rather than downwards
                    // and be placed above the body of the tooltip and not beneath
                    tooltip_info.arrow_container.removeClass('Zebra_Tooltip_Arrow_Bottom');
                    tooltip_info.arrow_container.addClass('Zebra_Tooltip_Arrow_Top');

                    // set the arrow's color (we set it for different sides depending if it points upwards or downwards)
                    tooltip_info.arrow.css('borderColor', 'transparent transparent ' + plugin.settings.background_color);

                // if top of the tooltip is inside the visible part of the browser's window
                } else {

                    // the tooltip will slide downwards
                    tooltip_info.animation_offset = -Math.abs(tooltip_info.animation_offset);

                    // account for the offset
                    tooltip_top += plugin.settings.vertical_offset;

                }

                // set the arrow's horizontal position within the tooltip
                tooltip_info.arrow_container.css('left', arrow_left);

                // set the tooltip's final position
                tooltip_info.tooltip.css({
                    'left': tooltip_left,
                    'top':  tooltip_top
                });

                // update tooltip data
                $.extend(tooltip_info, {

                    'tooltip_left': tooltip_left,
                    'tooltip_top':  tooltip_top,
                    'arrow_left':   arrow_left

                });

                // we set these two properties to FALSE so that no further computation takes place, unless the browser
                // window is resized or scrolled
                tooltip_info.window_resized = false;
                tooltip_info.window_scrolled = false;

                // update tooltip data
                tooltip_info = $.extend($element.data('Zebra_Tooltip'), tooltip_info);

                // cache updated tooltip data
                $element.data('Zebra_Tooltip', tooltip_info);

            }

            // return an object with tooltip data
            return tooltip_info;

    };

        /**
         *  Hides the tooltip attached to the element given as argument.
         *
         *  @param  jQuery  $element    The jQuery version of a DOM element for which to hide the attached plugin
         *
         *  @return void
         *
         *  @access private
         */
        var _hide = function($element) {

            // get information about the tooltip attached to the element given as argument
            var tooltip_info = $element.data('Zebra_Tooltip');

            // if there is already a timeout for hiding the tooltip, cancel it
            clearTimeout(tooltip_info.hide_timeout);

            // if tooltip is not sticky (when it can only be closed by the user)
            if (!tooltip_info.sticky) {

                // clear the timeout for showing the tooltip (if any)
                clearTimeout(tooltip_info.show_timeout);

                // hide the tooltip, using the specified delay (if any)
                tooltip_info.hide_timeout = setTimeout(function() {

                    // if there is a tooltip attached to the element
                    // (as one can call the hide() method method prior of the tooltip being ever shown)
                    if (tooltip_info.tooltip) {

                        // if a callback function exists to be run before hiding a tooltip
                        if (plugin.settings.onBeforeHide && typeof plugin.settings.onBeforeHide == 'function')

                            // execute the callback function
                            plugin.settings.onBeforeHide($element, tooltip_info.tooltip);

                        // set this flag to FALSE so that the script knows that it has to add the "close" button again
                        // if the tooltip is shown using the API
                        tooltip_info.close = false;

                        // if tooltip needs to be destroyed once it fades out
                        if (tooltip_info.destroy)

                            // set this flag now so that the tooltip is not shown again if the user quickly hovers
                            // the element while if fades out
                            tooltip_info.muted = true;

                        // cache updated tooltip data
                        $element.data('Zebra_Tooltip', tooltip_info);

                        // remove the "close" button
                        $('a.Zebra_Tooltip_Close', tooltip_info.tooltip).remove();

                        // if the tooltip was in the midst of an animation, stop that
                        tooltip_info.tooltip.stop();

                        // animate the tooltip
                        tooltip_info.tooltip.animate({

                            'opacity':  0,
                            'top':      tooltip_info.tooltip_top + tooltip_info.animation_offset

                        // using the specified speed
                        }, plugin.settings.animation_speed, function() {

                            // set the tooltip's "display" property to "none"
                            $(this).css('display', 'none');

                            // if a callback function exists to be run after hiding a tooltip
                            if (plugin.settings.onHide && typeof plugin.settings.onHide == 'function')

                                // execute the callback function
                                plugin.settings.onHide($element, tooltip_info.tooltip);

                        });

                    }

                // the delay after which to hide the plugin
                }, plugin.settings.hide_delay);

            }

        };

        /**
         *  Shows the tooltip attached to the element given as argument.
         *
         *  @param  jQuery  $element    The jQuery version of a DOM element for which to show the attached plugin
         *
         *  @return void
         *
         *  @access private
         */
        var _show = function($element) {

            // get a reference to the attached tooltip and its components
            var tooltip_info = $element.data('Zebra_Tooltip');

            // if there is already a timeout for showing the tooltip, cancel it
            clearTimeout(tooltip_info.show_timeout);

            // if tooltip is not "muted" (case in which can only be shown using the API)
            if (!tooltip_info.muted) {

                // clear the timeout for hiding the tooltip (if any)
                clearTimeout(tooltip_info.hide_timeout);

                // show the tooltip, using the specified delay (if any)
                tooltip_info.show_timeout = setTimeout(function() {

                    // if not already created, create the tooltip
                    tooltip_info = _create_tooltip($element);

                    // if a callback function exists to be run before showing a tooltip
                    if (plugin.settings.onBeforeShow && typeof plugin.settings.onBeforeShow == 'function')

                        // execute the callback function
                        plugin.settings.onBeforeShow($element, tooltip_info.tooltip);

                    // if tooltip is not already being animated
                    if (tooltip_info.tooltip.css('display') != 'block')

                        // set the tooltip's top so we can "slide" it in
                        tooltip_info.tooltip.css({
                            'top':  tooltip_info.tooltip_top + tooltip_info.animation_offset
                        });

                    // set the tooltip's "display" property to "block"
                    tooltip_info.tooltip.css('display', 'block');

                    // if the tooltip was in the midst of an animation, stop that
                    tooltip_info.tooltip.stop();

                    // animate the tooltip
                    tooltip_info.tooltip.animate({

                        'top':      tooltip_info.tooltip_top,
                        'opacity':  plugin.settings.opacity

                    // using the specified speed
                    }, plugin.settings.animation_speed, function() {

                        // if a callback function exists to be run after showing a tooltip
                        if (plugin.settings.onShow && typeof plugin.settings.onShow == 'function')

                            // execute the callback function
                            plugin.settings.onShow($element, tooltip_info.tooltip);

                    });

                // the delay after which to show the plugin
                }, plugin.settings.show_delay);

            }

        };

        // fire it up!
        _init();

    };

})(jQuery);

/*global jQuery */
/*jshint multistr:true browser:true */
/*!
* FitVids 1.0.3
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    if(!document.getElementById('fit-vids-style')) {

      var div = document.createElement('div'),
          ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0],
          cssStyles = '&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>';

      div.className = 'fit-vids-style';
      div.id = 'fit-vids-style';
      div.style.display = 'none';
      div.innerHTML = cssStyles;

      ref.parentNode.insertBefore(div,ref);

    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='google.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%").css('margin-bottom', '4em');
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };

// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

;(function ($, window, document, undefined) {

  var pluginName = "readingTime";

  var defaults = {
    bubble: '#scrollbubble'
  };

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this.scroll_timer = null;
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      $(window).scroll($.proxy(this.updateTime, this));
      $('<div id="scrollbubble"></div>').appendTo("body");
      $('<style>#scrollbubble{display:none;position:fixed;bottom:20px;right:20px;z-index:500;background-color:#F0F0F0;color:#808080;border-radius:3px;font-family:Consolas, Courier, monospace;font-size:12px;letter-spacing:1px;padding:10px 20px}#scrollbubble:after{content:" ";position:absolute;top:50%;right:-8px;height:0;width:0;margin-top:-4px;border:4px solid transparent;border-left-color:#F0F0F0}</style>').appendTo('body');
    },
    updateTime: function () {
      var total_reading_time = 0,
        bubble = $(this.options.bubble),
        post_content = $(this.element);
      var viewportHeight = $(window).height(),
       scrollbarHeight = viewportHeight / $(document).height() * viewportHeight,
       progress = $(window).scrollTop() / ($(document).height() - viewportHeight),
       distance = progress * (viewportHeight - scrollbarHeight) + scrollbarHeight / 2 - bubble.height() / 2;
      var total_reading_time = this.calculate_total_time_words(post_content, this.element) / 60;
      var total_reading_time_remaining = Math.ceil(total_reading_time - (total_reading_time * progress));
      var text = '';

      if(total_reading_time_remaining > 1) {
        text = total_reading_time_remaining + ' minutes left';
      } else if(progress >= 1) {
        text = "You\'re good";
      } else if (total_reading_time_remaining <= 1) {
        text = "almost done..";
      }

      bubble
        .text(text)
        .fadeIn(500);

      // Fade out the annotation after 1 second of no scrolling.
      if (this.scroll_timer !== null) {
        clearTimeout(this.scroll_timer);
      }

      this.scroll_timer = setTimeout(function() {
        bubble.fadeOut();
      }, 1500);
    },
    calculate_total_time_words: function(post_content, element){
      var total = 0;
      post_content.each(function() {
        total += Math.round(60*$(element).text().split(' ').length/200); // 200 = number of words per minute
      });

      return total;
    }
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);


// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/


(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice;

  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      return define('waypoints', ['jquery'], function($) {
        return factory($, root);
      });
    } else {
      return factory(root.jQuery, root);
    }
  })(this, function($, window) {
    var $w, Context, Waypoint, allWaypoints, contextCounter, contextKey, contexts, isTouch, jQMethods, methods, resizeEvent, scrollEvent, waypointCounter, waypointKey, wp, wps;

    $w = $(window);
    isTouch = __indexOf.call(window, 'ontouchstart') >= 0;
    allWaypoints = {
      horizontal: {},
      vertical: {}
    };
    contextCounter = 1;
    contexts = {};
    contextKey = 'waypoints-context-id';
    resizeEvent = 'resize.waypoints';
    scrollEvent = 'scroll.waypoints';
    waypointCounter = 1;
    waypointKey = 'waypoints-waypoint-ids';
    wp = 'waypoint';
    wps = 'waypoints';
    Context = (function() {
      function Context($element) {
        var _this = this;

        this.$element = $element;
        this.element = $element[0];
        this.didResize = false;
        this.didScroll = false;
        this.id = 'context' + contextCounter++;
        this.oldScroll = {
          x: $element.scrollLeft(),
          y: $element.scrollTop()
        };
        this.waypoints = {
          horizontal: {},
          vertical: {}
        };
        $element.data(contextKey, this.id);
        contexts[this.id] = this;
        $element.bind(scrollEvent, function() {
          var scrollHandler;

          if (!(_this.didScroll || isTouch)) {
            _this.didScroll = true;
            scrollHandler = function() {
              _this.doScroll();
              return _this.didScroll = false;
            };
            return window.setTimeout(scrollHandler, $[wps].settings.scrollThrottle);
          }
        });
        $element.bind(resizeEvent, function() {
          var resizeHandler;

          if (!_this.didResize) {
            _this.didResize = true;
            resizeHandler = function() {
              $[wps]('refresh');
              return _this.didResize = false;
            };
            return window.setTimeout(resizeHandler, $[wps].settings.resizeThrottle);
          }
        });
      }

      Context.prototype.doScroll = function() {
        var axes,
          _this = this;

        axes = {
          horizontal: {
            newScroll: this.$element.scrollLeft(),
            oldScroll: this.oldScroll.x,
            forward: 'right',
            backward: 'left'
          },
          vertical: {
            newScroll: this.$element.scrollTop(),
            oldScroll: this.oldScroll.y,
            forward: 'down',
            backward: 'up'
          }
        };
        if (isTouch && (!axes.vertical.oldScroll || !axes.vertical.newScroll)) {
          $[wps]('refresh');
        }
        $.each(axes, function(aKey, axis) {
          var direction, isForward, triggered;

          triggered = [];
          isForward = axis.newScroll > axis.oldScroll;
          direction = isForward ? axis.forward : axis.backward;
          $.each(_this.waypoints[aKey], function(wKey, waypoint) {
            var _ref, _ref1;

            if ((axis.oldScroll < (_ref = waypoint.offset) && _ref <= axis.newScroll)) {
              return triggered.push(waypoint);
            } else if ((axis.newScroll < (_ref1 = waypoint.offset) && _ref1 <= axis.oldScroll)) {
              return triggered.push(waypoint);
            }
          });
          triggered.sort(function(a, b) {
            return a.offset - b.offset;
          });
          if (!isForward) {
            triggered.reverse();
          }
          return $.each(triggered, function(i, waypoint) {
            if (waypoint.options.continuous || i === triggered.length - 1) {
              return waypoint.trigger([direction]);
            }
          });
        });
        return this.oldScroll = {
          x: axes.horizontal.newScroll,
          y: axes.vertical.newScroll
        };
      };

      Context.prototype.refresh = function() {
        var axes, cOffset, isWin,
          _this = this;

        isWin = $.isWindow(this.element);
        cOffset = this.$element.offset();
        this.doScroll();
        axes = {
          horizontal: {
            contextOffset: isWin ? 0 : cOffset.left,
            contextScroll: isWin ? 0 : this.oldScroll.x,
            contextDimension: this.$element.width(),
            oldScroll: this.oldScroll.x,
            forward: 'right',
            backward: 'left',
            offsetProp: 'left'
          },
          vertical: {
            contextOffset: isWin ? 0 : cOffset.top,
            contextScroll: isWin ? 0 : this.oldScroll.y,
            contextDimension: isWin ? $[wps]('viewportHeight') : this.$element.height(),
            oldScroll: this.oldScroll.y,
            forward: 'down',
            backward: 'up',
            offsetProp: 'top'
          }
        };
        return $.each(axes, function(aKey, axis) {
          return $.each(_this.waypoints[aKey], function(i, waypoint) {
            var adjustment, elementOffset, oldOffset, _ref, _ref1;

            adjustment = waypoint.options.offset;
            oldOffset = waypoint.offset;
            elementOffset = $.isWindow(waypoint.element) ? 0 : waypoint.$element.offset()[axis.offsetProp];
            if ($.isFunction(adjustment)) {
              adjustment = adjustment.apply(waypoint.element);
            } else if (typeof adjustment === 'string') {
              adjustment = parseFloat(adjustment);
              if (waypoint.options.offset.indexOf('%') > -1) {
                adjustment = Math.ceil(axis.contextDimension * adjustment / 100);
              }
            }
            waypoint.offset = elementOffset - axis.contextOffset + axis.contextScroll - adjustment;
            if ((waypoint.options.onlyOnScroll && (oldOffset != null)) || !waypoint.enabled) {
              return;
            }
            if (oldOffset !== null && (oldOffset < (_ref = axis.oldScroll) && _ref <= waypoint.offset)) {
              return waypoint.trigger([axis.backward]);
            } else if (oldOffset !== null && (oldOffset > (_ref1 = axis.oldScroll) && _ref1 >= waypoint.offset)) {
              return waypoint.trigger([axis.forward]);
            } else if (oldOffset === null && axis.oldScroll >= waypoint.offset) {
              return waypoint.trigger([axis.forward]);
            }
          });
        });
      };

      Context.prototype.checkEmpty = function() {
        if ($.isEmptyObject(this.waypoints.horizontal) && $.isEmptyObject(this.waypoints.vertical)) {
          this.$element.unbind([resizeEvent, scrollEvent].join(' '));
          return delete contexts[this.id];
        }
      };

      return Context;

    })();
    Waypoint = (function() {
      function Waypoint($element, context, options) {
        var idList, _ref;

        options = $.extend({}, $.fn[wp].defaults, options);
        if (options.offset === 'bottom-in-view') {
          options.offset = function() {
            var contextHeight;

            contextHeight = $[wps]('viewportHeight');
            if (!$.isWindow(context.element)) {
              contextHeight = context.$element.height();
            }
            return contextHeight - $(this).outerHeight();
          };
        }
        this.$element = $element;
        this.element = $element[0];
        this.axis = options.horizontal ? 'horizontal' : 'vertical';
        this.callback = options.handler;
        this.context = context;
        this.enabled = options.enabled;
        this.id = 'waypoints' + waypointCounter++;
        this.offset = null;
        this.options = options;
        context.waypoints[this.axis][this.id] = this;
        allWaypoints[this.axis][this.id] = this;
        idList = (_ref = $element.data(waypointKey)) != null ? _ref : [];
        idList.push(this.id);
        $element.data(waypointKey, idList);
      }

      Waypoint.prototype.trigger = function(args) {
        if (!this.enabled) {
          return;
        }
        if (this.callback != null) {
          this.callback.apply(this.element, args);
        }
        if (this.options.triggerOnce) {
          return this.destroy();
        }
      };

      Waypoint.prototype.disable = function() {
        return this.enabled = false;
      };

      Waypoint.prototype.enable = function() {
        this.context.refresh();
        return this.enabled = true;
      };

      Waypoint.prototype.destroy = function() {
        delete allWaypoints[this.axis][this.id];
        delete this.context.waypoints[this.axis][this.id];
        return this.context.checkEmpty();
      };

      Waypoint.getWaypointsByElement = function(element) {
        var all, ids;

        ids = $(element).data(waypointKey);
        if (!ids) {
          return [];
        }
        all = $.extend({}, allWaypoints.horizontal, allWaypoints.vertical);
        return $.map(ids, function(id) {
          return all[id];
        });
      };

      return Waypoint;

    })();
    methods = {
      init: function(f, options) {
        var _ref;

        if (options == null) {
          options = {};
        }
        if ((_ref = options.handler) == null) {
          options.handler = f;
        }
        this.each(function() {
          var $this, context, contextElement, _ref1;

          $this = $(this);
          contextElement = (_ref1 = options.context) != null ? _ref1 : $.fn[wp].defaults.context;
          if (!$.isWindow(contextElement)) {
            contextElement = $this.closest(contextElement);
          }
          contextElement = $(contextElement);
          context = contexts[contextElement.data(contextKey)];
          if (!context) {
            context = new Context(contextElement);
          }
          return new Waypoint($this, context, options);
        });
        $[wps]('refresh');
        return this;
      },
      disable: function() {
        return methods._invoke(this, 'disable');
      },
      enable: function() {
        return methods._invoke(this, 'enable');
      },
      destroy: function() {
        return methods._invoke(this, 'destroy');
      },
      prev: function(axis, selector) {
        return methods._traverse.call(this, axis, selector, function(stack, index, waypoints) {
          if (index > 0) {
            return stack.push(waypoints[index - 1]);
          }
        });
      },
      next: function(axis, selector) {
        return methods._traverse.call(this, axis, selector, function(stack, index, waypoints) {
          if (index < waypoints.length - 1) {
            return stack.push(waypoints[index + 1]);
          }
        });
      },
      _traverse: function(axis, selector, push) {
        var stack, waypoints;

        if (axis == null) {
          axis = 'vertical';
        }
        if (selector == null) {
          selector = window;
        }
        waypoints = jQMethods.aggregate(selector);
        stack = [];
        this.each(function() {
          var index;

          index = $.inArray(this, waypoints[axis]);
          return push(stack, index, waypoints[axis]);
        });
        return this.pushStack(stack);
      },
      _invoke: function($elements, method) {
        $elements.each(function() {
          var waypoints;

          waypoints = Waypoint.getWaypointsByElement(this);
          return $.each(waypoints, function(i, waypoint) {
            waypoint[method]();
            return true;
          });
        });
        return this;
      }
    };
    $.fn[wp] = function() {
      var args, method;

      method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (methods[method]) {
        return methods[method].apply(this, args);
      } else if ($.isFunction(method)) {
        return methods.init.apply(this, arguments);
      } else if ($.isPlainObject(method)) {
        return methods.init.apply(this, [null, method]);
      } else if (!method) {
        return $.error("jQuery Waypoints needs a callback function or handler option.");
      } else {
        return $.error("The " + method + " method does not exist in jQuery Waypoints.");
      }
    };
    $.fn[wp].defaults = {
      context: window,
      continuous: true,
      enabled: true,
      horizontal: false,
      offset: 0,
      triggerOnce: false
    };
    jQMethods = {
      refresh: function() {
        return $.each(contexts, function(i, context) {
          return context.refresh();
        });
      },
      viewportHeight: function() {
        var _ref;

        return (_ref = window.innerHeight) != null ? _ref : $w.height();
      },
      aggregate: function(contextSelector) {
        var collection, waypoints, _ref;

        collection = allWaypoints;
        if (contextSelector) {
          collection = (_ref = contexts[$(contextSelector).data(contextKey)]) != null ? _ref.waypoints : void 0;
        }
        if (!collection) {
          return [];
        }
        waypoints = {
          horizontal: [],
          vertical: []
        };
        $.each(waypoints, function(axis, arr) {
          $.each(collection[axis], function(key, waypoint) {
            return arr.push(waypoint);
          });
          arr.sort(function(a, b) {
            return a.offset - b.offset;
          });
          waypoints[axis] = $.map(arr, function(waypoint) {
            return waypoint.element;
          });
          return waypoints[axis] = $.unique(waypoints[axis]);
        });
        return waypoints;
      },
      above: function(contextSelector) {
        if (contextSelector == null) {
          contextSelector = window;
        }
        return jQMethods._filter(contextSelector, 'vertical', function(context, waypoint) {
          return waypoint.offset <= context.oldScroll.y;
        });
      },
      below: function(contextSelector) {
        if (contextSelector == null) {
          contextSelector = window;
        }
        return jQMethods._filter(contextSelector, 'vertical', function(context, waypoint) {
          return waypoint.offset > context.oldScroll.y;
        });
      },
      left: function(contextSelector) {
        if (contextSelector == null) {
          contextSelector = window;
        }
        return jQMethods._filter(contextSelector, 'horizontal', function(context, waypoint) {
          return waypoint.offset <= context.oldScroll.x;
        });
      },
      right: function(contextSelector) {
        if (contextSelector == null) {
          contextSelector = window;
        }
        return jQMethods._filter(contextSelector, 'horizontal', function(context, waypoint) {
          return waypoint.offset > context.oldScroll.x;
        });
      },
      enable: function() {
        return jQMethods._invoke('enable');
      },
      disable: function() {
        return jQMethods._invoke('disable');
      },
      destroy: function() {
        return jQMethods._invoke('destroy');
      },
      extendFn: function(methodName, f) {
        return methods[methodName] = f;
      },
      _invoke: function(method) {
        var waypoints;

        waypoints = $.extend({}, allWaypoints.vertical, allWaypoints.horizontal);
        return $.each(waypoints, function(key, waypoint) {
          waypoint[method]();
          return true;
        });
      },
      _filter: function(selector, axis, test) {
        var context, waypoints;

        context = contexts[$(selector).data(contextKey)];
        if (!context) {
          return [];
        }
        waypoints = [];
        $.each(context.waypoints[axis], function(i, waypoint) {
          if (test(context, waypoint)) {
            return waypoints.push(waypoint);
          }
        });
        waypoints.sort(function(a, b) {
          return a.offset - b.offset;
        });
        return $.map(waypoints, function(waypoint) {
          return waypoint.element;
        });
      }
    };
    $[wps] = function() {
      var args, method;

      method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (jQMethods[method]) {
        return jQMethods[method].apply(null, args);
      } else {
        return jQMethods.aggregate.call(null, method);
      }
    };
    $[wps].settings = {
      resizeThrottle: 100,
      scrollThrottle: 30
    };
    return $w.load(function() {
      return $[wps]('refresh');
    });
  });

}).call(this);


// Generated by CoffeeScript 1.6.2
/*
Sticky Elements Shortcut for jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){(function(t,n){if(typeof define==="function"&&define.amd){return define(["jquery","waypoints"],n)}else{return n(t.jQuery)}})(this,function(t){var n,s;n={wrapper:'<div class="sticky-wrapper" />',stuckClass:"stuck"};s=function(t,n){t.wrap(n.wrapper);return t.parent()};t.waypoints("extendFn","sticky",function(e){var i,r,a;r=t.extend({},t.fn.waypoint.defaults,n,e);i=s(this,r);a=r.handler;r.handler=function(n){var s,e;s=t(this).children(":first");e=n==="down"||n==="right";s.toggleClass(r.stuckClass,e);i.height(e?s.outerHeight():"");if(a!=null){return a.call(this,n)}};i.waypoint(r);return this.data("stuckClass",r.stuckClass)});return t.waypoints("extendFn","unsticky",function(){this.parent().waypoint("destroy");this.unwrap();return this.removeClass(this.data("stuckClass"))})})}).call(this);


jQuery(document).ready(function(){


    // PROFILE WAYPOINTS
    if($('#cover').hasClass("featured")){
        $('.posts').waypoint(function(direction) {
            if(direction === "down"){ $('.profile').addClass("stuck").removeClass("featured"); $('.index').fadeIn(400); $('.backtotop').fadeIn();}
            if(direction === "up"){ $('.profile').removeClass("stuck").addClass("featured"); $('.index').fadeOut(400); $('.backtotop').fadeOut();}
        });
    }else{
        $('#posttitle, .first').waypoint(function(direction) {
            if(direction === "down"){ $('.profile').addClass("stuck"); $('.index').fadeIn(400); $('.backtotop').fadeIn(); }
            if(direction === "up"){ $('.profile').removeClass("stuck"); $('.index').fadeOut(400); $('.backtotop').fadeOut(); }
        });
    }

    // INDEX WAYPOINTS
    if($('#posttitle').length){
        var list = [];
        $('.postbody h2').waypoint(function(direction) {
            var e = $(this);
            if(direction === "down"){
                $('.index h2').fadeOut(function() {
                    list.push($('.index h2').text());
                    $(this).text($(e).text()).fadeIn();
                });
            };
            if(direction === "up"){
                $('.index h2').fadeOut(function() {
                    $(this).text(list.pop()).fadeIn();
                });
            };
        });
    }


    // FITVIDS
    jQuery(".postbody").fitVids();
    jQuery(".excerpt").fitVids();


    // COMMENTS
    if(config.disqus_shortname != '' && config.disqus_shortname != null && config.disqus_shortname != undefined || config.google_comments == true){
        $('.comments').show();
        if(config.autoload_comments == true){
            loadComments();
            $('.readmore').fadeOut(400);
        }
    }

    function loadComments(){

        if(config.disqus_shortname != ''){
            var disqus_shortname = config.disqus_shortname;
            (function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            })();
        }else if(config.google_comments == true){

            $.getScript("https://apis.google.com/js/plusone.js")
            .done(function(script, textStatus ) {
                gapi.comments.render('g-comments', {
                    href: window.location,
                    width: '760',
                    first_party_property: 'BLOGGER',
                    view_type: 'FILTERED_POSTMOD'
                });
            });

        }

    }

    $('.readmore').click(function(){
        loadComments();
        $(this).fadeOut(400);
    });


    // ANALYTICS
    // if(config.analytics_id != '' || config.analytics_id != null || config.analytics_id != undefined){
    //  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    //  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    //  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    //  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    //  ga('create', config.analytics_id, config.analytics_domain);
    //  ga('send', 'pageview');
    // }


    // READING TIME
  jQuery(".postbody").readingTime();

  jQuery(".inlinemenu ul").hide();
  jQuery(".inlinemenu .graybar").click(function(){
    jQuery(".inlinemenu ul").slideToggle();
  });


  // FEATURE SCROLL
  $(".movedown").click(function(){
    $("html, body").animate({scrollTop: $('.cover').height()}, 1000);
  });

  // BACK TO TOP
  jQuery('.backtotop').click(function(){
    jQuery('html, body').animate({
      scrollTop: jQuery("body").offset().top
    }, 1000);
  });

  // Tooltips
  new $.Zebra_Tooltips($('.tooltips'), {
        'background_color': '#545454'
  });

  // Remove align=absmiddle
  $('.emoji').each(function(){
    $(this).load().removeAttr('align');
  });

  // AJAX LOAD MORE POSTS
  $('.loadmore').click(function() {
    $(this).hide();

    MorePosts((function () {
        $(this).fadeIn("slow");
        //$(this).parent(".moreposts").children(".loading").remove();
    }).bind(this));

    // sendGAEvent('Articles', 'Load more..');

    return false;
  });

  var $postIndex = $("#postIndex");

  function MorePosts(callback) {
    var currentPage = parseInt($postIndex.attr("data-page"));
    var totalPages = parseInt($postIndex.attr("data-page-total"));
    var nextPage = currentPage + 1;

    if(nextPage > totalPages) {
        return;
    }

    if(nextPage === totalPages) {
        noMorePosts();
    }

    $.ajax({
        type: "GET",
        url: '/pages/' + nextPage + '/',
        cache: false,
        dataType: "html",
        beforeSend: function(xhr, options) {
            $(".moreposts").append("<div class='loading'></div>");
            setTimeout(function() {
                $.ajax($.extend(options, {beforeSend: $.noop}));
            }, 1500);
            return false;
        },
        success: function(response) {
            var posts = $(response).filter("#postIndex").children().fadeIn(700);
            // Append posts
            $postIndex.append(posts);

            // Update
            $postIndex.attr("data-page", nextPage);

            callback();
        },
        complete: function() {
            $(".moreposts").children(".loading").remove();
        },
        error: function( xhr, stat, er ) {
            $('.loading').remove();
            if(xhr.status === 0) {
                $(".moreposts").append("<div class='loading-error'><i class='i-cancel-circled'></i> Please check network connections [0]</div>");
            } else if (xhr.status === 404) {
                $(".moreposts").append("<div class='loading-error'><i class='i-cancel-circled'></i> Requested URL not found [404]</div>");
            } else if (xhr.status === 500) {
                $(".moreposts").append("<div class='loading-error'><i class='i-cancel-circled'></i> Internal Server Error [500]</div>");
            } else {
                var unk = 'Unknown Error.\n' + xhr.stat;
                $(".moreposts").append('<div class="loading"><i class="i-cancel-circled"></i> '+ unk +'</div>');
            }
        }
    });
  }

  function noMorePosts() {
    setTimeout(function(){
        $('.loadmore').remove();
        $('.loading').remove();
        $('.moreposts').css('margin-top', '-100px');
    }, 2000);
  }

  function sendGAEvent(primary, secondary) {
    if (window.ga !== undefined) {
        if (secondary !== undefined) {
            ga('send', 'event', primary, secondary);
        } else {
            ga('send', 'event', primary);
        }
    }
  }

}); // ready


/**
 * parallax
 */
(function() {
  var lastScrollY = 0,
      ticking = false,
      bgElm = document.getElementById('prlx'),
      speedDivider = 2;

  // Update background position
  var updatePosition = function() {
    var translateValue = lastScrollY / speedDivider;

    // We don't want parallax to happen if scrollpos is below 0
    if (translateValue < 0)
      translateValue = 0;
    if (typeof(bgElm) != 'undefined' && bgElm != null) {
        translateY(bgElm, translateValue);
    }

    // Stop ticking
    ticking = false;
  };

  // Translates an element on the Y axis using translate3d to ensure
  // that the rendering is done by the GPU

  var translateY = function(elm, value) {
    var translate = 'translate3d(0px,' + value + 'px, 0px)';
    elm.style['-webkit-transform'] = translate;
    elm.style['-moz-transform'] = translate;
    elm.style['-ms-transform'] = translate;
    elm.style['-o-transform'] = translate;
    elm.style.transform = translate;
  };

  // This will limit the calculation of the background position to
  // 60fps as well as blocking it from running multiple times at once
  var requestTick = function() {
    if (!ticking) {
      window.requestAnimationFrame(updatePosition);
      ticking = true;
    }
  };

  // Update scroll value and request tick
  var doScroll = function() {
    lastScrollY = window.pageYOffset;
    requestTick();
  };

  // Initialize on domready
  (function() {
    var loaded = 0;
    var bootstrap = function() {
      if (loaded) return;
      loaded = 1;

      rafPolyfill();
      window.onscroll = doScroll;
    };

    if ( document.readyState === 'complete' ) {
      setTimeout( bootstrap );
    } else {
      document.addEventListener( 'DOMContentLoaded', bootstrap, false );
      window.addEventListener( 'load', bootstrap, false );
    }
  })();

  // RequestAnimationFrame polyfill for older browsers
  var rafPolyfill = function() {
    var lastTime, vendors, x;
    lastTime = 0;
    vendors = ["webkit", "moz"];
    x = 0;
    while (x < vendors.length && !window.requestAnimationFrame) {
      window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
      window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
      ++x;
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
        var currTime, id, timeToCall;
        currTime = new Date().getTime();
        timeToCall = Math.max(0, 16 - (currTime - lastTime));
        id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
  };

}).call(this);
