/**
 * Campus Life Page JavaScript
 * Handles slider initialization and animations for the campus life page
 */

$(document).ready(function () {

    // Initialize scroll-triggered animations for titles
    initializeScrollAnimations();

    // Initialize all sliders
    initializeHeroSlider();
    initializePracticalSection();
    initializeCareerSupportSlider();
    // initializeCampusInroSlider();

    addVideoStyles();
    initializeVideoSection();

    initializeFaqDropdown();

    // Improved: Re-initialize sliders and animations on window resize (debounced)
    let resizeTimeout;
    let lastWindowWidth = window.innerWidth;
    $(window).on('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Only re-init if width actually changed (avoid mobile keyboard triggers)
            if (window.innerWidth !== lastWindowWidth) {
                lastWindowWidth = window.innerWidth;
                reinitializeAllOnResize();
            }
            // Special handling for 1025px resolution
            if (window.innerWidth === 1025 || screen.width === 1025) {
                setTimeout(function() {
                    reinitializeAllOnResize();
                }, 50);
            }
        }, 150);
    });

    // Initial check for 1025px resolution
    if (window.innerWidth === 1025 || screen.width === 1025) {
        setTimeout(function() {
            reinitializeAllOnResize();
        }, 100);
    }
    
    // Additional fix for hero slider at exactly 1025px
    if (window.innerWidth === 1025) {
        setTimeout(function() {
            if ($('.hero .slider').hasClass('slick-initialized')) {
                $('.hero .slider').slick('unslick');
            }
            $('.hero .slider').slick({
                dots: true,
                arrows: false,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear'
            });
        }, 300);
    }
    
    // Additional fix for practical cards slider at 1025px
    if (window.innerWidth === 1025) {
        setTimeout(function() {
            if ($('.pratical-cards').hasClass('slick-initialized')) {
                $('.pratical-cards').slick('unslick');
            }
            $('.pratical-cards').slick({
                centerMode: true,
                centerPadding: '30px',
                dots: true,
                arrows: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 2000,
                slidesToShow: 2,
                responsive: [
                    {
                        breakpoint: 1025,
                        settings: {
                            centerMode: true,
                            centerPadding: '20px',
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }, 300);
    }
});
/**
 * Fully re-initialize all sliders and scroll-based animations on resize
 * Ensures all components are responsive and visually correct
 */
function reinitializeAllOnResize() {
    // Destroy and re-init hero slider
    if ($('.hero .slider').hasClass('slick-initialized')) {
        $('.hero .slider').slick('unslick');
    }
    initializeHeroSlider();

    // Destroy and re-init practical cards slider
    if ($('.pratical-cards').hasClass('slick-initialized')) {
        $('.pratical-cards').slick('unslick');
    }
    // Re-run points animation (remove and re-add elements for clean state)
    $('.points-animation').each(function() {
        $(this).empty();
    });
    initializePracticalSection();

    // Destroy and re-init career support slider
    if ($('.career-support-body .slider').hasClass('slick-initialized')) {
        $('.career-support-body .slider').slick('unslick');
    }
    initializeCareerSupportSlider();

    // Destroy and re-init campus intro slider if used
    if ($('.campus-intro-body .slider').length && $('.campus-intro-body .slider').hasClass('slick-initialized')) {
        $('.campus-intro-body .slider').slick('unslick');
    }
    // initializeCampusInroSlider();

    // Re-run scroll-triggered animations
    $('.ani-title').removeClass('visible');
    initializeScrollAnimations();

    // Re-run video section star animations (remove and re-add for clean state)
    $('.video .star-animation').each(function() {
        $(this).empty();
    });
    initializeVideoSection();

    // Re-apply FAQ dropdown handlers (in case DOM changed)
    initializeFaqDropdown();

    // Re-apply custom slider positioning/indicator if needed
    if (typeof updateSliderPositioning === 'function') {
        setTimeout(updateSliderPositioning, 100);
    }
    if (typeof updateSliderIndicator === 'function') {
        setTimeout(updateSliderIndicator, 100);
    }

    // Force reflow to prevent white space issues
    document.body.style.overflow = 'hidden';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.overflow = '';

    // Special handling for 1025px resolution
    if (window.innerWidth === 1025) {
        setTimeout(function() {
            // Re-init practical cards slider with specific settings for 1025px
            if ($('.pratical-cards').hasClass('slick-initialized')) {
                $('.pratical-cards').slick('unslick');
            }
            $('.pratical-cards').slick({
                centerMode: true,
                centerPadding: '30px',
                dots: true,
                arrows: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 2000,
                slidesToShow: 2,
                responsive: [
                    {
                        breakpoint: 1025,
                        settings: {
                            centerMode: true,
                            centerPadding: '20px',
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }, 200);
    }
}

/**
 * Initialize scroll-triggered animations for animated titles
 */
function initializeScrollAnimations() {
    $('.ani-title').customOnView('visible');
    $(window).trigger('scroll');
}

/**
 * Initialize hero section slider
 * Responsive slider that only activates on mobile devices
 */
function initializeHeroSlider() {
    $('.hero .slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1026,
                settings: "unslick" // Disable slider on desktop (screen width > 1025px)
            },
            {
                breakpoint: 1025,
                settings: {
                    dots: true,
                    arrows: false,
                    infinite: true,
                    speed: 500,
                    fade: true,
                    cssEase: 'linear'
                } // Enable slider on tablet and mobile (screen width <= 1025px)
            }
        ]
    });
}

/**
 * Initialize practical section components
 * Includes points animation and cards slider
 */
function initializePracticalSection() {
    // Initialize animated points grid
    $(".points-animation").customFadeBounceOnView({
        rows: 3,
        cols: 4,
        size: 10,
        gap: 30,
        color: '#1B2D73',
        fadeDuration: 300,
        delayStep: 50
    });

    // Initialize practical cards slider
    $('.pratical-cards').slick({
        centerMode: true,
        centerPadding: '60px',
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,

        responsive: [
            {
                breakpoint: 5000,
                settings: "unslick" 
            },
            {
                breakpoint: 1025,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });
}

/**
 * Initialize career support section slider
 * Simple fade slider for career support content
 */
function initializeCareerSupportSlider() {
    $('.career-support-body .slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 2000
    });
}

/**
 * Force correct positioning of slides based on design
 */
function updateSliderPositioning() {
    if (window.innerWidth > 768) {
        // Desktop positioning
        const slides = $('.campus-intro-body .slider .slick-slide');

        slides.each(function (index) {
            const $slide = $(this);

            if ($slide.hasClass('slick-center')) {
                // Center slide
                $slide.css({
                    'position': 'absolute',
                    'left': '50%',
                    'transform': 'translateX(-50%)',
                    'width': '60vw',
                    'z-index': '3'
                });
            } else if (index === 0 || $slide.is(':first-child')) {
                // Left slide
                $slide.css({
                    'position': 'absolute',
                    'left': '10vw',
                    'transform': 'none',
                    'width': '20vw',
                    'z-index': '1'
                });
            } else {
                // Right slide
                $slide.css({
                    'position': 'absolute',
                    'right': '10vw',
                    'left': 'auto',
                    'transform': 'none',
                    'width': '20vw',
                    'z-index': '1'
                });
            }
        });
    }
}

/**
 * Update custom slider indicator position
 */
function updateSliderIndicator(currentSlide = 0, totalSlides = 3) {
    const indicatorWidth = 200; // Total width of indicator
    const pointWidth = 60; // Width of the moving point
    const maxPosition = indicatorWidth - pointWidth;
    const position = (currentSlide / (totalSlides - 1)) * maxPosition;

    $('.campus-intro-body .slider-indicator .point').css('left', position + 'px');
}


function initializeCampusInroSlider(){
    $(".campus-intro .slider-card").customObserve({
      root: $(".campus-intro .slider")[0],   // scroll container (fixed selector)
      threshold: 0.6,
      activeClass: "active"
    });

    // Ensure the second card (Nakano) is the default visible/active on first load
    const $slider = $(".campus-intro .slider");
    const $cards = $slider.find(".slider-card");
    if ($slider.length && $cards.length >= 2) {
        const $target = $cards.eq(1); // second card
        const paddingLeft = parseInt($slider.css("padding-left")) || 0;
        const targetLeft = $target[0].offsetLeft - paddingLeft;
        const centerOffset = ($slider.width() - $target.outerWidth(true)) / 2;
        $slider.scrollLeft(targetLeft - centerOffset);
        
        // Add slick slider for better tablet/mobile experience
        if (window.innerWidth <= 1025 || screen.width === 1025) {
            $slider.slick({
                centerMode: true,
                centerPadding: '40px',
                dots: true,
                arrows: false,
                infinite: true,
                responsive: [
                    {
                        breakpoint: 1025,
                        settings: {
                            centerMode: true,
                            centerPadding: '35px',
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }
    }
}

/**
 * Initialize video section components
 * Includes star animations and video placeholder interactions
 */
function initializeVideoSection() {
    // Initialize star animations with error handling
    try {
        $('.video .star-animation.top-left').customFadeBounceOnView({
            rows: 3,
            cols: 4,
            size: 20,
            gap: 0,
            color: '#1B2D73',
            fadeDuration: 300,
            delayStep: 50,
            symbol: "*"
        });

        $('.video .star-animation.bottom-right').customFadeBounceOnView({
            rows: 3,
            cols: 4,
            size: 20,
            gap: 0,
            color: '#1B2D73',
            fadeDuration: 300,
            delayStep: 50,
            symbol: "*"
        });
    } catch (error) {
        console.warn('Star animation initialization failed:', error);
    }

    // Video placeholder interaction
    initializeVideoPlaceholder();
}

/**
 * Initialize video placeholder interactions
 */
function initializeVideoPlaceholder() {
    const $videoPlaceholder = $('.video-placeholder');
    
    if ($videoPlaceholder.length === 0) {
        return;
    }

    // Click handler for video placeholder
    $videoPlaceholder.on('click', function(e) {
        e.preventDefault();
        handleVideoPlaceholderClick($(this));
    });

    // Keyboard accessibility
    $videoPlaceholder.on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleVideoPlaceholderClick($(this));
        }
    });

    // Add accessibility attributes
    $videoPlaceholder.attr({
        'role': 'button',
        'tabindex': '0',
        'aria-label': '動画を再生'
    });
}

/**
 * Handle video placeholder click/interaction
 * @param {jQuery} $element - The clicked video placeholder element
 */
function handleVideoPlaceholderClick($element) {
    // Add visual feedback
    $element.addClass('video-clicked');
    
    // Remove feedback after animation
    setTimeout(() => {
        $element.removeClass('video-clicked');
    }, 200);

    // Log for debugging (replace with actual video loading logic)
    console.log('Video placeholder clicked - ready for video integration');
    
    // Future: Add actual video loading logic here
    // loadVideo($element.find('p').text());
}

/**
 * Add dynamic styles for video interactions
 */
function addVideoStyles() {
    if ($('#video-interaction-styles').length > 0) {
        return;
    }

    const styles = `
        <style id="video-interaction-styles">
            .video-placeholder.video-clicked {
                transform: translateY(-2px) scale(0.98);
                transition: transform 0.1s ease;
            }
            
            .video-placeholder:focus {
                outline: 2px solid var(--turquoise);
                outline-offset: 2px;
            }
        </style>
    `;
    
    $('head').append(styles);
}

// Initialize faq section 
function initializeFaqDropdown(){
    $('.faq-question').on('click', function() {
        const $item = $(this).closest('.faq-item');
        $item.toggleClass('active');
        
        const $toggle = $item.find('.faq-toggle');
        $toggle.text($item.hasClass('active') ? '−' : '+');
    });    
}

