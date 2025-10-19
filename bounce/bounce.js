(() => {

    let hasMicInitialized = false;
    let dataArray = [];
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    let audioContext;
    let source;
    let analyser;

    const getVolume = (data) => {
        if (!hasMicInitialized) {
            return 0;
        }
        analyser.getByteTimeDomainData(data);
        let samples = [...data].map(v => v / 128 - 1);
        let sum = 0;

        for (let i = 0; i < samples.length; i++) {
            sum += samples[i] * samples[i];
        }

        let volume = Math.sqrt(sum / samples.length);

        console.log('Volume:', volume);
        return volume;
    }

    const getSamples = (data) => {
        if (!hasMicInitialized) {
            return [];
        }
        analyser.getByteTimeDomainData(data);
        let samples = [...data].map(v => v / 128 - 1);
        return samples;
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        console.log('Microphone access granted.');
        console.log('v10');
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.fftSize = 64;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        hasMicInitialized = true;

        
    }).catch(err => {
        console.error('Error accessing microphone:', err);
    });

    // Resize canvas to fill window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let ballColor = `hsl(320deg, 100%, 50%)`;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSize = 30;

    const updateBallHeight = (y) => {
        ballY = y;
    }

    const drawBall = (context, volume) => {
        context.beginPath();
        context.arc(ballX, ballY, (ballSize + (volume * 3000)), 0, Math.PI * 2);
        context.fillStyle = ballColor;
        context.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const volume = getVolume(dataArray);

        ballSize = 30;

        // get the samples and move the ball height based on the sample values

        updateBallHeight(canvas.height / 2 + Math.sin(Date.now() / 155) * 100);
        drawBall(ctx, volume);
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();
})();