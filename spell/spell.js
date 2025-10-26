(() => {
    const consonants = 'bbccddddffggghhjkllllmmnnnnnnppqrrrrrrssssttttttvvwwxyyz';
    const vowels = 'aaaaaaaaaeeeeeeeeeeeeeiiiiiiiiiiooooooooouuuu';

    // TODO: consider wildcards or blank tiles (checking the API is complicated there)
    const letterScores = {
        a: 1,
        b: 3,
        c: 3,
        d: 2,
        e: 1,
        f: 4,
        g: 2,
        h: 4,
        i: 1,
        j: 8,
        k: 5,
        l: 1,
        m: 3,
        n: 3,
        o: 1,
        p: 3,
        q: 10,
        r: 1,
        s: 1,
        t: 1,
        u: 1,
        v: 4,
        w: 4,
        x: 8,
        y: 4,
        z: 10,
    }

    let roundNumber = 1;
    let LETTER_LIMIT = 9;
    let letterChoices = [];
    let roundScore = 0;
    let totalScore = 0;
   
    let savedWords = [];
    let classLetter = '';
    let savedLetters = [];

    const classLetters = {
        sorcerer: ['t', 's', 'm', 'b'],
        wizard: ['e', 'a', 'i', 'o'],
        warlock: ['x', 'q', 'z', 'j'],
    }

    const gameClasses = ['sorcerer', 'wizard', 'warlock'];

    const getRandomConsonant = () => consonants.charAt(Math.floor(Math.random() * consonants.length));
    const getRandomVowel = () => vowels.charAt(Math.floor(Math.random() * vowels.length));

    const getRandomClassLetter = (gameClass) => {
        const letters = classLetters[gameClass];
        return letters[Math.floor(Math.random() * letters.length)];
    }

    const checkIfWordExists = async (word) => {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        submitWordButton.classList.remove('is-loading');
        if (response.ok) {
            const data = await response.json();
            return Array.isArray(data) && data.length > 0;
        }
        return false;
    }

    const gameRanks = [
        { minScore: 0, rank: 'Scribbler' },
        { minScore: 5, rank: 'Penpusher' },
        { minScore: 10, rank: 'Accountant with style' },
        { minScore: 15, rank: 'Captivating storyteller' },
        { minScore: 20, rank: 'Linguist' },
        { minScore: 25, rank: 'Overworked lawyer' },
        { minScore: 30, rank: 'Published author' },
        { minScore: 35, rank: 'English teacher on a mission' },
        { minScore: 40, rank: 'Lexophile' },
    ];

    const getGameRank = (score) => {
        let currentRank = gameRanks[0].rank;
        for (const rankInfo of gameRanks) {
            if (score >= rankInfo.minScore) {
                currentRank = rankInfo.rank;
            } else {
                break;
            }
        }
        return currentRank;
    }

    const createClasses = () => {
        gameClasses.forEach(gameClass => {

            const letter = getRandomClassLetter(gameClass);

            const li = document.createElement('li');
            const button = document.createElement('button');
            // add class title span
            const titleSpan = document.createElement('span');
            titleSpan.textContent = gameClass.charAt(0).toUpperCase() + gameClass.slice(1);
            titleSpan.classList.add('letter-button__title');
            li.appendChild(titleSpan);

            // add letter span
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter;
            letterSpan.classList.add('letter-button__letter');
            button.appendChild(letterSpan);

            const valueSpan = document.createElement('span');
            valueSpan.textContent = `${letterScores[letter] || 0}`;
            valueSpan.classList.add('letter-button__value');
            button.appendChild(valueSpan);

            button.type = 'button';
            button.classList.add('letter-button', 'letter-button--class', 'js-class-button', `letter-button--class-${gameClass}`);
            button.id = gameClass;
            li.appendChild(button);
            classOptions.appendChild(li);
        });
    }

    const createLetterButton = (letter, targetContainer, optionalClass) => {
        const button = document.createElement('button');
        const span = document.createElement('span');
        span.textContent = letter;
        span.classList.add('letter-button__letter');
        const valueSpan = document.createElement('span');
        valueSpan.textContent = `${letterScores[letter] || 0}`;
        valueSpan.classList.add('letter-button__value');
        button.appendChild(valueSpan);
        button.type = 'button';
        button.classList.add('letter-button', optionalClass || '');
        button.appendChild(span);
        targetContainer.appendChild(button);
    }

    const renderLetterChoices = (container, showClass = true) => {
        container.innerHTML = '';
        if (showClass) {
            createLetterButton(classLetter, container, 'letter-button--class-chosen');
        }

        savedLetters.forEach(letter => {
            createLetterButton(letter, container, 'letter-button--saved');
        });

        letterChoices.forEach(letter => {
            createLetterButton(letter, container, 'letter-button--chosen');
        });
    }

    const updateLetterLimit = () => {
        LETTER_LIMIT = 9 - savedLetters.length - 1;
        letterCountDisplay.textContent = `${letterChoices.length}/${LETTER_LIMIT}`;
    }

    const displayGameLetters = () => {
        renderLetterChoices(lettersDisplay);
        updateLetterLimit();

        if (letterChoices.length >= LETTER_LIMIT) {
            chooseLetterDialog.close();
            renderLetterChoices(lettersContainer);
            gameDialog.showModal();
        }
            
    }

    const startNextRound = () => {
        roundNumber += 1;
        roundNumberDisplay.textContent = `${roundNumber}`;
        letterChoices = [];
        roundScore = 0;
        word.textContent = '';
        displayGameLetters();
        chooseLetterDialog.showModal();
    }

    const clearRound = () => {
        // letterChoices = [];
        // roundScore = 0;
        // word.textContent = '';
     }

     const endGame = () => {
        console.log('Game over! Total score:', totalScore);

        console.log('your current rank: ', getGameRank(totalScore));

        // show end game container
        endGameContainer.classList.remove('is-inactive');
        finalScoreDisplay.textContent = `${totalScore}`;
        rank.textContent = getGameRank(totalScore);
        gameDialog.close();
     }

    const rank = document.querySelector('.js-final-rank');

    const startButton = document.querySelector('.js-start-button');
    const instructions = document.querySelector('.js-instructions');
    const startDialog = document.querySelector('.js-start-dialog');
    const classOptions = document.querySelector('.js-class-options');
    const chooseLetterDialog = document.querySelector('.js-choose-letter-dialog');
    const lettersDisplay = document.querySelector('.js-letter-display');

    const keepLetterOptions = document.querySelector('.js-keep-letter-options');

    const endRoundDialog = document.querySelector('.js-end-round-dialog');

    const gameDialog = document.querySelector('.js-game-dialog');

    const lettersContainer = document.querySelector('.js-game-letters');
    const vowelButton = document.querySelector('.js-vowel-button');
    const consonantButton = document.querySelector('.js-consonant-button');
    const totalScoreDisplay = document.querySelector('.js-total-score');
    const word = document.querySelector('.js-word');
    const submitWordButton = document.querySelector('.js-submit-word-button');
    const resetWordButton = document.querySelector('.js-reset-word-button');
    const roundNumberDisplay = document.querySelector('.js-round-number');
    const letterCountDisplay = document.querySelector('.js-letter-count');

    const restartButton = document.querySelector('.js-restart-button');
    const endGameContainer = document.querySelector('.js-end-game');
    const finalScoreDisplay = document.querySelector('.js-final-score');

    startButton.addEventListener('click', () => {
        instructions.classList.add('is-inactive');
        startDialog.showModal();
        createClasses();
    });

    submitWordButton.addEventListener('click', async () => {
        const currentWord = word.textContent.trim().toLowerCase();
        if (currentWord.length === 0) {
            return;
        }
        submitWordButton.classList.add('is-loading');

        const exists = await checkIfWordExists(currentWord);

        if (exists) {
            for (const letter of currentWord) {
                roundScore += letterScores[letter] || 0;
            }
            totalScore += roundScore;
            savedWords.push({ word: currentWord, score: roundScore });
            totalScoreDisplay.textContent = `${totalScore}`;
            gameDialog.close();
            renderLetterChoices(keepLetterOptions, false);

            if (roundNumber < 3) {
                endRoundDialog.showModal();
            } else {
                endGame();
            }
            // end round dialog - pick a letter to save
            

        }
    });

    lettersContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('letter-button')) {
            const letter = event.target.querySelector('.letter-button__letter').textContent;
            word.textContent += letter;
        }
    });

    keepLetterOptions.addEventListener('click', (event) => {
        if (event.target.classList.contains('letter-button')) {
            const letter = event.target.querySelector('.letter-button__letter').textContent;
            savedLetters.push(letter);
            endRoundDialog.close();
            startNextRound();
        }
    });

    resetWordButton.addEventListener('click', () => {
        word.textContent = '';
    });

    vowelButton.addEventListener('click', () => {
        if (letterChoices.length < LETTER_LIMIT) {
            const newVowel = getRandomVowel();
            letterChoices.push(newVowel);
            displayGameLetters();
        }
    });

    consonantButton.addEventListener('click', () => {
        if (letterChoices.length < LETTER_LIMIT) {
            const newConsonant = getRandomConsonant();
            letterChoices.push(newConsonant);
            displayGameLetters();
        }
    });

    restartButton.addEventListener('click', () => {
        // reset all game state
        window.location.reload();
    });

    classOptions.addEventListener('click', (event) => {
        if (event.target.classList.contains('js-class-button')) {
            const selectedClass = event.target.id;
            // get the textContent of the letter span inside the button
            const letterSpan = event.target.querySelector('.letter-button__letter');
            classLetter = letterSpan.textContent;
            classOptions.querySelectorAll('button').forEach(button => {
                button.disabled = true;
            });

            startDialog.close();

            displayGameLetters();

            // open the next dialog
            chooseLetterDialog.showModal();
        }
    });

})();