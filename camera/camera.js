(() => {
    const body = document.querySelector('body');
    const cameraButton = document.querySelector('button');

    const video = document.querySelector('.video');

    const canvas = document.querySelector('.canvas');

    const newHeading = 'You are being watched';
    const newDescription = 'In the 21st century, we willingly invite surveillance into our lives. Welcome to our dystopia.';
    const titleElement = document.querySelector('.js-title');
    const descriptionElement = document.querySelector('.js-description');
    const watchButton = document.querySelector('.js-watch-button');
    const info = document.querySelector('.js-info');

    video.addEventListener('canplay', (ev) => {
    if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);

        titleElement.textContent = newHeading;
        descriptionElement.textContent = newDescription;
        info.classList.add('is-active');
        watchButton.remove();

        video.setAttribute("width", width);
        video.setAttribute("height", height);
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        streaming = true;
    }
    });

    cameraButton.addEventListener("click", () => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => {
      console.error(`An error occurred: ${err}`);
    });
});
})();