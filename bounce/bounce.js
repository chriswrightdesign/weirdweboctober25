(() => {

    let hasMicInitialized = false;
    let dataArray = [];
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    let audioContext;
    let source;
    let analyser;

    const getAverageVolume = (array) => {
        let values = 0;
        let average;
        const length = array.length;

        for (let i = 0; i < length; i++) {
            values += array[i];
        }

        average = values / length;
        return average;
    }

    const getVolume = (data) => {
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
        console.log('v2');
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

    const updateBallHeight = (y) => {
        ballY = y;
    }

    const drawBall = (context) => {
        context.beginPath();
        context.arc(ballX, ballY, ball.radius, 0, Math.PI * 2);
        context.fillStyle = ballColor;
        context.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const samples = getSamples(dataArray);

        const sample = samples.length > 0 ? samples[0] : 1;

        // so if someone talks louder the ball bounces higher
        updateBallHeight(canvas.height / 2 + Math.sin(Date.now() / 115 * sample) * 100);
        drawBall(ctx);
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();
})();