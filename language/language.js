(() => {
    const wordSpace = document.querySelector('.js-word');

    const answer = document.querySelector('.js-answer');

    const pairs = [
        { encoded: 'sdvvzrug', decoded: 'password' },
    ];

    let selectedPair = pairs[0];

    wordSpace.textContent = selectedPair.encoded;

    answer.addEventListener('input', (event) => {
        const userAnswer = event.target.value.trim().toLowerCase();

        if (userAnswer === selectedPair.decoded) {
            alert('Correct! Well done.');
        }
    });
})();