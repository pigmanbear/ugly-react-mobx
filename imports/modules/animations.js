/**=========================================================
 * Provides a simple way to run animation with a trigger
 * Targeted elements must have
 *   [data-animate"]
 *   [data-target="Target element affected by the animation"]
 *   [data-play="Animation name (http://daneden.github.io/animate.css/)"]
 *
 * Requires animo.js
 =========================================================*/

import Utils from './utils.js';
import animate from 'animo-animate';



export function animations() {

    var Selector = '[data-animate]';

    var $scroller = $(window).add('body, .wrapper');

    // Parse animations params and attach trigger to scroll
    $(Selector).each(function() {
        var $this = $(this),
            offset = $this.data('offset'),
            anit = $this.data('animate'),
            delay = $this.data('delay') || 100, // milliseconds
            animation = $this.data('play') || 'bounce';

        if (typeof offset !== 'undefined') {

            // test if the element starts visible
            testAnimation($this);
            // test on scroll
            $scroller.scroll(function() {
                testAnimation($this);
            });

        }

        // Test an element visibilty and trigger the given animation
        function testAnimation(element) {
            if (!element.hasClass('anim-running') &&
                $.Utils.isInView(element, {
                    topoffset: offset
                })) {
                element
                    .addClass('anim-running');

                var isAnimating;
                if (!isAnimating) {
                    isAnimating = true;

                }
                setTimeout(function() {
                    animate(document.querySelector('#' + element[0].id), {
                            classNames: ['animated', animation]
                        })
                        .then(function() {
                            isAnimating = false;
                        });
                    element
                        .addClass('anim-done');
                }, delay);

            }
        }

    });

    // Run click triggered animations
    $(document).on('click', Selector, function(e) {
        e.preventDefault();
        var $this = $(this),

            targetSel = $this.data('target'),
            // animat = $this.data('animate'),
            animation = $this.data('play') || 'bounce',
            target = $(targetSel);
        var isAnimating;
        if (!isAnimating) {
            isAnimating = true;
            animate(document.querySelector(targetSel), {
                    classNames: ['animated', animation]
                })
                .then(function() {
                    isAnimating = false;
                });
        }
    });

}
