(() => {
    const body = document.body;
    const start = document.querySelector('.js-start');
    const trap = document.querySelector('.js-trap');
    const stage = document.querySelector('.js-stage');
    const circle = document.querySelector('.js-circle');
    const status = document.querySelector('.js-output');

    let isActive = false;
    let isPending = false;

    const inititiate = () => {
        begin();
        clearTimeout();
        body.classList.add('is-started');
        stage.classList.remove('is-active');
        stage.classList.remove('is-trapped');
        status.textContent = 'Wait for it....';
        // add a timer for a random amount between 3 and 9 seconds
        const timer = Math.floor(Math.random() * 6000) + 3000;
        isPending = true;
        setTimeout(() => {
            if (!isPending) {
                return;
            }
            stage.classList.add('is-active');
            isActive = true;
        }, Math.floor(Math.random() * 6000) + 3000);
    }

    const end = () => {
        isActive = false;
        isPending = false;
        body.classList.remove('is-started');
        trap.disabled = true;
    }

    const begin = () => {
        trap.disabled = false;
    }

    circle.addEventListener('animationend', () => {
        end();
    });

    trap.addEventListener('click', () => {
        if (isActive) {
            status.textContent = 'You win!';
            stage.classList.add('is-trapped');
            end();
        } else if (isPending) {
            status.textContent = 'Nope';

            end();
        }
    });
    start.addEventListener('click', () => {
        inititiate();
        
    });
})();
