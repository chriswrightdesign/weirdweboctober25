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
        console.log('v5');
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.fftSize = 256;
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

    // Ball properties
    let ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 30,
        color: 'red',
        vx: 5,
        vy: 3
    };

    let ballColor = 'hsl(120deg, 100%, 50%)';
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSize = 30;

    const updateBallHeight = (y) => {
        ballY = y;
    }

    const drawBall = (context) => {
        context.beginPath();
        context.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
        context.fillStyle = ballColor;
        context.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const samples = getSamples(dataArray);

        // console.log(samples);

        const sample = samples.length > 0 ? samples.find(s => s !== 0) : -155;

        const volume = getVolume(dataArray);

        // Change ball color based on volume
        const hue = Math.min(120, volume * 300);
        ballColor = `hsl(${hue}deg, 100%, 50%)`;
        ballSize = 30 + volume * 100;

        // so if someone talks louder the ball bounces higher
        updateBallHeight(canvas.height / 2 + Math.sin(Date.now() / 1 * (sample * -1) * 100));
        drawBall(ctx);
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();
})();