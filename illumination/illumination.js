(() => {
    const stage = document.querySelector('.stage');
    const light = document.querySelector('.light');

    window.addEventListener('mousemove', (e) => {

        const clientX = e.clientX;
        const clientY = e.clientY;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;

        const root = document.documentElement;


        const shadowOffsetX = deltaX * -0.2;
        const shadowOffsetY = deltaY * -0.2;

        root.style.setProperty('--shadow-offset-x', `${shadowOffsetX}px`);
        root.style.setProperty('--shadow-offset-y', `${shadowOffsetY}px`);
        root.style.setProperty('--mouse-x', `${clientX}px`);
        root.style.setProperty('--mouse-y', `${clientY}px`);
        /*
        --shadow-offset-x: 20px;
        --shadow-offset-y: 20px;
        --shadow-blur: 30px;
        --shadow-spread: 0px;
        */



    });

    window.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];

        const clientX = touch.clientX;
        const clientY = touch.clientY;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

         const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;

        const root = document.documentElement;

        const shadowOffsetX = deltaX * -0.2;
        const shadowOffsetY = deltaY * -0.2;

        root.style.setProperty('--shadow-offset-x', `${shadowOffsetX}px`);
        root.style.setProperty('--shadow-offset-y', `${shadowOffsetY}px`);
        root.style.setProperty('--mouse-x', `${clientX}px`);
        root.style.setProperty('--mouse-y', `${clientY}px`);
    });
})();