(() => {
    const first = document.querySelector('.js-first');
    const output = document.querySelector('.js-output');
    const container = document.querySelector('.js-container');
    let isAnimationComplete = false;

    first.addEventListener('click', () => {
        if (isAnimationComplete) {
            document.body.classList.add('is-shown');
            output.textContent = 'You got it!';
        } else {
            output.textContent = 'Wait for the animation to finish before clicking.';
        }
        
    });
    container.addEventListener('animationstart', () => {
        isAnimationComplete = false;
    });
    container.addEventListener('animationend', () => {
        isAnimationComplete = true;
    });
})();