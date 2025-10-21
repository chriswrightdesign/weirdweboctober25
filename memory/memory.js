(() => {
    const cards = document.querySelectorAll('.js-card');
    let cardFlipCount = 0;
    let score = 0;

    const resetFlips = () => {
        cards.forEach(card => card.classList.remove('is-flipped'));
        cardFlipCount = 0;
        const unreliableShuffle = getUnreliable(initialShuffle);
        setTimeout(() => {
            setupGame(unreliableShuffle);
        }, 100);
    }

    const cardColors = {
        '🍑': '#FFC1CC',
        '🧘🏻‍♀️': '#FFCCF1',
        '🪴': '#CCFFCC',
        '🐙': '#CCCCFF',
        '🤯': '#FFFFCC',
        '💺': '#FFCCCC',
    }

    const baseCardArray = ['🍑', '🧘🏻‍♀️', '🪴', '🐙', '🤯', '💺'];
    const cardArray = [...baseCardArray, ...baseCardArray];

    const shuffleCards = (array) => {
        return array.sort(() => Math.random() - 0.5);
    }

    const initialShuffle = shuffleCards(cardArray);

    const getUnreliable = (array) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        const randomItem = array[randomIndex];

        const newArray = array.filter((item, index) => index !== randomIndex);

        return newArray.concat(randomItem);

    }

    const setupGame = (array) => {
        cards.forEach((card, index) => {
            const cardFaceFront = card.querySelector('.card__face--front');
            cardFaceFront.textContent = array[index];
            cardFaceFront.style.backgroundColor = cardColors[array[index]];
        });
    }

    setupGame(initialShuffle);

    const scoreFlippedCards = () => {
        const flippedCards = Array.from(cards).filter(card => card.classList.contains('is-flipped'));
        if (flippedCards.length === 2) {
            const firstCardFace = flippedCards[0].querySelector('.card__face--front').textContent;
            const secondCardFace = flippedCards[1].querySelector('.card__face--front').textContent;

            if (firstCardFace === secondCardFace) {
                score++;
                document.querySelector('.js-score').textContent = score;
            }
        }
    }

    cards.forEach((card, index) => {
        card.addEventListener('click', () => {

            if (cardFlipCount > 1) {
                scoreFlippedCards();
                resetFlips();
                return;
            }
            cardFlipCount++;
            card.classList.toggle('is-flipped');
        });
    });
})();