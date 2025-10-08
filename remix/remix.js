
(() => {
    const dragster = document.querySelector('.dragster');

    if (dragster) {
     
        dragster.addEventListener('pointermove', (event) => {
            // event.preventDefault();
            console.log('pointermove event on dragster', event);

            const {clientX, clientY} = event;

            // x controls color 2
            // y controls color 1

            const clientWidth = window.innerWidth;
            const clientHeight = window.innerHeight;

            // convert to percentage
            const xPercent = (clientX / clientWidth) * 100;
            const yPercent = (clientY / clientHeight) * 100;

            const hueColor1 = Math.round((xPercent / 100) * 360);
            const hueColor2 = Math.round((yPercent / 100) * 360);

            dragster.style.setProperty('--hue1', hueColor1);
            dragster.style.setProperty('--hue2', hueColor2);

        });

        
    }
})()
