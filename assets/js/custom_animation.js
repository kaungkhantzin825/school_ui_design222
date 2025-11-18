
/**
 * Custom Animation Library for Campus Life Page
 * Provides scroll-triggered animations and interactive effects
 */

/* ==========================================================================
   SCROLL-TRIGGERED VISIBILITY ANIMATION
   ========================================================================== */

/**
 * jQuery plugin to add a CSS class when elements come into viewport
 * Used for scroll-triggered animations like fade-in effects
 * 
 * @param {string} className - CSS class to add when element is visible
 * @returns {jQuery} - Returns jQuery object for chaining
 * 
 * @example
 * $('.ani-title').customOnView('visible');
 */
(function ($) {
    'use strict';

    $.fn.customOnView = function (className) {
        const $elements = this;

        /**
         * Check if elements are in viewport and add class if visible
         */
        function checkElementsVisibility() {
            const windowTop = $(window).scrollTop();
            const windowBottom = windowTop + $(window).height();

            $elements.each(function () {
                const $element = $(this);
                const elementTop = $element.offset().top;
                const elementBottom = elementTop + $element.outerHeight();

                // Check if element is in viewport
                if (elementBottom >= windowTop && elementTop <= windowBottom) {
                    if (!$element.hasClass(className)) {
                        $element.addClass(className);
                    }
                }
            });
        }

        // Perform initial visibility check
        checkElementsVisibility();

        // Bind scroll and resize events for continuous checking
        $(window).on('scroll.customOnView resize.customOnView', checkElementsVisibility);

        return this; // Enable method chaining
    };
})(jQuery);


/* ==========================================================================
   DOT FADE BOUNCE ANIMATION
   ========================================================================== */

/**
 * jQuery plugin to create animated dot grid with fade and bounce effects
 * Creates a grid of dots that animate in sequence with bounce effect
 * 
 * @param {Object} options - Configuration options for the animation
 * @param {number} options.rows - Number of rows in the grid (default: 3)
 * @param {number} options.cols - Number of columns in the grid (default: 4)
 * @param {number} options.size - Size of each dot in pixels (default: 10)
 * @param {number} options.gap - Gap between dots in pixels (default: 30)
 * @param {string} options.color - Color of the dots (default: '#1B2D73')
 * @param {number} options.bounceHeight - Height of bounce animation (default: 10)
 * @param {number} options.fadeDuration - Duration of fade animation (default: 500)
 * @param {number} options.delayStep - Delay between each dot animation (default: 100)
 * @param {string|null} options.symbol - Custom symbol instead of dots (default: null)
 * @returns {jQuery} - Returns jQuery object for chaining
 * 
 * @example
 * $('.dots-animation').customFadeBounce({
 *     rows: 3,
 *     cols: 4,
 *     size: 20,
 *     gap: 30,
 *     color: '#1B2D73',
 *     fadeDuration: 500,
 *     delayStep: 100,
 *     symbol: '*'
 * });
 */
(function ($) {
    'use strict';

    $.fn.customFadeBounce = function (options) {
        // Merge user options with defaults
        const settings = $.extend({
            rows: 3,
            cols: 4,
            size: 10,
            gap: 30,
            color: '#1B2D73',
            bounceHeight: 10,
            fadeDuration: 500,
            delayStep: 100,
            symbol: null
        }, options);

        return this.each(function () {
            const $container = $(this);

            // Configure container as CSS Grid
            $container.css({
                display: 'grid',
                gridTemplateColumns: `repeat(${settings.cols}, ${settings.size * 2}px)`,
                gridTemplateRows: `repeat(${settings.rows}, ${settings.size * 2}px)`,
                gap: `${settings.gap}px`
            });

            const totalDots = settings.rows * settings.cols;

            // Create and animate each dot
            for (let i = 0; i < totalDots; i++) {
                const $dot = createDotElement(settings);
                $container.append($dot);
                animateDot($dot, i, settings);
            }
        });

        /**
         * Create a single dot element with appropriate styling
         * @param {Object} settings - Animation settings
         * @returns {jQuery} - Styled dot element
         */
        function createDotElement(settings) {
            const $dot = $('<div class="dot"></div>').css({
                width: `${settings.size}px`,
                height: `${settings.size}px`,
                borderRadius: settings.symbol ? '0%' : '50%',
                color: settings.color,
                fontSize: `${settings.size}px`,
                backgroundColor: settings.symbol ? 'transparent' : settings.color,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0,
                position: 'relative'
            });

            if (settings.symbol) {
                $dot.text(settings.symbol);
            }

            return $dot;
        }

        /**
         * Animate a single dot with bounce effect
         * @param {jQuery} $dot - Dot element to animate
         * @param {number} index - Index of the dot for delay calculation
         * @param {Object} settings - Animation settings
         */
        function animateDot($dot, index, settings) {
            $dot.delay(index * settings.delayStep).animate({
                opacity: 1,
                top: -settings.bounceHeight
            }, settings.fadeDuration, 'swing', function () {
                // Bounce down and settle
                $(this).animate({
                    top: 5
                }, settings.fadeDuration / 2, 'swing').animate({
                    top: 0
                }, settings.fadeDuration / 2);
            });
        }
    };
})(jQuery);


/* ==========================================================================
   SCROLL-TRIGGERED DOT FADE BOUNCE ANIMATION
   ========================================================================== */

/**
 * jQuery plugin to create scroll-triggered animated dot grid
 * Combines viewport detection with dot fade bounce animation
 * Animation only starts when the element comes into view
 * 
 * @param {Object} options - Configuration options for the animation
 * @param {number} options.rows - Number of rows in the grid (default: 3)
 * @param {number} options.cols - Number of columns in the grid (default: 4)
 * @param {number} options.size - Size of each dot in pixels (default: 10)
 * @param {number} options.gap - Gap between dots in pixels (default: 30)
 * @param {string} options.color - Color of the dots (default: '#1B2D73')
 * @param {number} options.bounceHeight - Height of bounce animation (default: 10)
 * @param {number} options.fadeDuration - Duration of fade animation (default: 500)
 * @param {number} options.delayStep - Delay between each dot animation (default: 100)
 * @param {string|null} options.symbol - Custom symbol instead of dots (default: null)
 * @returns {jQuery} - Returns jQuery object for chaining
 * 
 * @example
 * $('.points-animation').customFadeBounceOnView({
 *     rows: 3,
 *     cols: 4,
 *     size: 10,
 *     gap: 30,
 *     color: '#1B2D73',
 *     fadeDuration: 300,
 *     delayStep: 50,
 *     symbol: '*'
 * });
 */
(function ($) {
    'use strict';

    $.fn.customFadeBounceOnView = function (options) {
        // Merge user options with defaults
        const settings = $.extend({
            rows: 3,
            cols: 4,
            size: 10,
            gap: 30,
            color: '#1B2D73',
            bounceHeight: 10,
            fadeDuration: 500,
            delayStep: 100,
            symbol: null
        }, options);

        return this.each(function () {
            const $container = $(this);
            let animationStarted = false;

            /**
             * Create dots and start animation sequence
             * Only runs once when element first comes into view
             */
            function initializeDotsAndAnimate() {
                if (animationStarted) return;
                animationStarted = true;

                // Configure container as CSS Grid
                $container.css({
                    display: 'grid',
                    gridTemplateColumns: `repeat(${settings.cols}, ${settings.size * 2}px)`,
                    gridTemplateRows: `repeat(${settings.rows}, ${settings.size * 2}px)`,
                    gap: `${settings.gap}px`
                });

                const totalDots = settings.rows * settings.cols;

                // Create and animate each dot
                for (let i = 0; i < totalDots; i++) {
                    const $dot = createDotElement(settings);
                    $container.append($dot);
                    animateDotWithDelay($dot, i, settings);
                }
            }

            /**
             * Check if container element is visible in viewport
             * Triggers animation when element comes into view
             */
            function checkViewportVisibility() {
                const windowTop = $(window).scrollTop();
                const windowBottom = windowTop + $(window).height();
                const elementTop = $container.offset().top;
                const elementBottom = elementTop + $container.outerHeight();

                // Check if element is in viewport
                if (elementBottom >= windowTop && elementTop <= windowBottom) {
                    initializeDotsAndAnimate();
                    // Remove event listeners after animation starts to improve performance
                    $(window).off('scroll.customFadeBounceOnView resize.customFadeBounceOnView');
                }
            }

            // Perform initial visibility check and bind events
            checkViewportVisibility();
            $(window).on('scroll.customFadeBounceOnView resize.customFadeBounceOnView', checkViewportVisibility);
        });

        /**
         * Create a single dot element with appropriate styling
         * @param {Object} settings - Animation settings
         * @returns {jQuery} - Styled dot element
         */
        function createDotElement(settings) {
            const $dot = $('<div class="dot"></div>').css({
                width: `${settings.size}px`,
                height: `${settings.size}px`,
                borderRadius: settings.symbol ? '0%' : '50%',
                color: settings.color,
                fontSize: `${settings.size}px`,
                backgroundColor: settings.symbol ? 'transparent' : settings.color,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0,
                position: 'relative'
            });

            if (settings.symbol) {
                $dot.text(settings.symbol);
            }

            return $dot;
        }

        /**
         * Animate a single dot with sequential delay and bounce effect
         * @param {jQuery} $dot - Dot element to animate
         * @param {number} index - Index of the dot for delay calculation
         * @param {Object} settings - Animation settings
         */
        function animateDotWithDelay($dot, index, settings) {
            $dot.delay(index * settings.delayStep).animate({
                opacity: 1,
                top: -settings.bounceHeight
            }, settings.fadeDuration, 'swing', function () {
                // Create bounce effect by animating down and settling
                $(this).animate({
                    top: 5
                }, settings.fadeDuration / 2, 'swing').animate({
                    top: 0
                }, settings.fadeDuration / 2);
            });
        }
    };
})(jQuery);



(function($){
    $.fn.bounceOnView = function(options) {
        var settings = $.extend({
            duration: "0.6s",
            delay: 0.05,
            easing: "ease",
            animationName: "bounceOnViewAnim",
            threshold: 0.2
        }, options);

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    var el = $(entry.target);

                    // Only wrap characters once
                    if (!el.hasClass("bounce-on-view")) {
                        var originalText = el.text();
                        var wrappedText = "";

                        $.each(originalText.split(""), function(i, char) {
                            if (char === " ") {
                                wrappedText += " "; // keep spaces
                            } else {
                                wrappedText += `<span style="animation:${settings.animationName} ${settings.duration} ${settings.easing};animation-delay:${i * settings.delay}s">${char}</span>`;
                            }
                        });

                        el.html(wrappedText).addClass("bounce-on-view");
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: settings.threshold });

        return this.each(function() {
            observer.observe(this);
        });
    };
})(jQuery);



(function ($) {
    $.fn.customObserve = function (options) {
        let settings = $.extend({
            root: null,
            threshold: 0.6,
            activeClass: "active"
        }, options);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $(entry.target).addClass(settings.activeClass);
                } else {
                    $(entry.target).removeClass(settings.activeClass);
                }
            });
        }, {
            root: settings.root,
            threshold: settings.threshold
        });

        return this.each(function () {
            observer.observe(this);
        });
    };
})(jQuery);


/* ==========================================================================
   TOGGLE PANEL 
   ========================================================================== */

/**
 * jQuery plugin to create a toggle panel.
 * Each trigger element toggles the visibility of its target panel
 * specified in its `data-target` attribute. Other panels remain unaffected.
 *
 * @param {Object} options - Configuration options
 * @param {number} [options.speed=300] - Animation speed in milliseconds
 *
 * @returns {jQuery} - Returns jQuery object for chaining
 *
 * @example
 * $(".schedule-campus-btn").customTogglePanel({
 *     speed: 400
 * });
 */
(function ($) {
  $.fn.customTogglePanel = function (options) {
    var settings = $.extend(
      {
        speed: 300
      },
      options
    );

    return this.each(function () {
      var $btn = $(this);
      var target = $("#" + $btn.data("target"));

      // Hide target initially
      target.hide();

      $btn.on("click", function (e) {
        e.preventDefault();

        // Toggle target visibility
        target.slideToggle(settings.speed);
      });
    });
  };
})(jQuery);