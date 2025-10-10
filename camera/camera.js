(() => {
    const cameraButton = document.querySelector('button');

    const video = document.querySelector('.video');

    const canvas = document.querySelector('.canvas');

    video.addEventListener('canplay', (ev) => {
    if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);

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