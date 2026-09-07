import wixAnimations from 'wix-animations';

let impactAnimated = false;

// impact numbers section "count-up" animation
function countUp(element, target, duration = 1500) {
    const startTime = Date.now();

    const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress = 1 - Math.pow(1 - progress, 3);

        const current = Math.floor(target * easedProgress);

        element.text = `${current}+`;

        if (progress >= 1) {
            clearInterval(interval);
            element.text = `${target}+`;

            // finishing pop
            wixAnimations.timeline()
                .add(element, {
                    duration: 150,
                    scale: 1.08,
                    easing: "easeOut"
                })
                .add(element, {
                    duration: 150,
                    scale: 1,
                    easing: "easeInOut"
                })
                .play();
        }
    }, 16);
}

$w.onReady(() => {

    // initial values
    $w("#number1").text = "0+";
    $w("#number2").text = "0+";
    $w("#number3").text = "0+";

    // impact section entering the viewport
    $w("#impactSection").onViewportEnter(() => {

        // prevent the animation from running again
        if (impactAnimated) {
            return;
        }

        impactAnimated = true;

        countUp($w("#number1"), 4);
        countUp($w("#number2"), 2);
        countUp($w("#number3"), 30);
    });
});