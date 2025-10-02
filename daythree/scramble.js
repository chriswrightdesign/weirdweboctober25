
const wordList = [
    'abysmal', 'acerbic', 'adjourn', 'alchemy', 'anagram', 'antique', 'arcanum',
    'astound', 'azimuth', 'banquet', 'baroque', 'beguile', 'bizarre', 'blatant',
    'brazen', 'cabbala', 'caliber', 'cascade', 'chagrin', 'chimera', 'cognate',
    'colloquy', 'conquer', 'cryptic', 'cuisine', 'cynical', 'dainty', 'debacle',
    'default', 'defraud', 'deluge', 'deplore', 'derelict', 'develop', 'diffuse',
    'dilemma', 'disrupt', 'diverge', 'dossier', 'draught', 'durable', 'earnest',
    'eclipse', 'ecstasy', 'elegant', 'embrace', 'endemic', 'enigma', 'epitome',
    'esquire', 'ethical', 'euphony', 'exclude', 'exhibit', 'exploit', 'extreme',
    'fabricate', 'fallacy', 'fantasy', 'fatigue', 'feature', 'ferment', 'fiction',
    'flabbergast', 'forfeit', 'fragile', 'fraternal', 'freight', 'frivolous', 'gadget',
    'gallant', 'garland', 'genuine', 'glimpse', 'glisten', 'gradual', 'grammar',
    'grapple', 'gravity', 'grimace', 'habitat', 'hamster', 'harvest', 'hasten',
    'hazard', 'heather', 'heirloom', 'hexagon', 'hostile', 'humble', 'hybrid',
    'iceberg', 'idiotic', 'ignite', 'immense', 'implore', 'inhabit', 'inquire',
    'instinct', 'intrigue', 'invalid', 'jealous', 'jeopardy', 'journal', 'juggle',
    'justice', 'keynote', 'kitchen', 'knapsack', 'lacquer', 'languish', 'leisure',
    'library', 'license', 'linger', 'machine', 'magnify', 'mandate', 'martial',
    'measure', 'mechanic', 'melange', 'migrate', 'miracle', 'mischief', 'monarch',
    'mustard', 'mystery', 'narrate', 'natural', 'neglect', 'neither', 'network',
    'neutral', 'nomadic', 'nostril', 'nurture', 'obscure', 'obvious', 'octagon',
    'offense', 'operate', 'opulent', 'orderly', 'outcome', 'outlook', 'ovation',
    'package', 'pageant', 'painter', 'panther', 'parched', 'parlour', 'partner',
    'pastime', 'pattern', 'peasant', 'penalty', 'perfume', 'picture', 'plaster',
    'plateau', 'pliable', 'portion', 'pottery', 'poultry', 'praline', 'precede',
    'prepare', 'presume', 'pretend', 'primary', 'printer', 'privacy', 'product',
    'program', 'project', 'prolong', 'prosper', 'protest', 'provoke', 'publish',
    'pursuit', 'quarrel', 'quarter', 'quintet', 'raccoon', 'radical', 'railway',
    'rainbow', 'rampage', 'rapidly', 'readily', 'realign', 'reclaim', 'recruit',
    'reflect', 'refugee', 'regular', 'relapse', 'relieve', 'removal', 'replace',
    'request', 'require', 'rescind', 'respect', 'restore', 'retreat', 'revenge',
    'revolve', 'ricochet', 'romance', 'routine', 'sabotage', 'sanctify', 'scandal',
    'scatter', 'scenery', 'scholar', 'science', 'scratch', 'screech', 'secrete',
    'segment', 'serpent', 'service', 'settler', 'seventh', 'several', 'shelter',
    'shimmer', 'shortly', 'similar', 'sincere', 'sixteen', 'skeletal', 'slender',
    'slumber', 'soldier', 'sorcery', 'soprano', 'sparkle', 'special', 'spinach',
    'sponsor', 'squirrel', 'stadium', 'startle', 'station', 'stellar', 'stomach',
    'storage', 'strange', 'stretch', 'student', 'stumble', 'subject', 'sublime',
    'succeed', 'suggest', 'summary', 'sunrise', 'supreme', 'surgeon', 'surplus',
    'survive', 'sustain', 'swagger', 'sweater', 'symptom', 'synapse', 'tableau',
    'tambour', 'tangle', 'tartan', 'tattler', 'tedious', 'tempest', 'texture',
    'theater', 'therapy', 'thirsty', 'thunder', 'tonight', 'tourism', 'tragedy',
    'trained', 'traipse', 'trampet', 'transom', 'treacle', 'triumph', 'trouble',
    'truffle', 'tumbler', 'turmoil', 'twelfth', 'typical', 'unclear', 'undergo',
    'unhappy', 'uniform', 'unleash', 'unravel', 'unusual', 'upgrade', 'upright',
    'vacancy', 'vagrant', 'vanilla', 'vehicle', 'venture', 'version', 'veteran',
    'vibrant', 'village', 'vintage', 'violate', 'visible', 'volcanic', 'voltage',
    'vulture', 'warfare', 'warrant', 'weather', 'welfare', 'western', 'whisper',
    'wildcat', 'witness', 'wrapper', 'wrestle', 'written', 'younger', 'zealous'
]
export const wordGame = () => {

    let score = 0;
    let failedAttempts = 0;
    let timeLeft = 30;
    let timer;
    let currentWord = '';
    let gameActive = false;

    const game = document.querySelector('.js-game');
    const input = document.getElementById('scramble');
    const output = document.querySelector('.output');
    const timeDisplay = document.querySelector('.js-timer');
    const guesser = document.querySelector('.js-guess');

    // failed
    const fails = document.querySelector('.js-words-failed');
    const wins = document.querySelector('.js-score');

    guesser.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const guess = e.target.value;
            submitGuess(guess);
        }
    });

    // function to get a random word from the wordList array
    const getRandomWord = () => {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        return wordList[randomIndex];
    }

    const scrambleWord = (word) => {
        const scrambled = word.split('').sort(() => 0.5 - Math.random()).join('');
        return scrambled;
    }

     const updateWord = (word) => {
        const transition = document.startViewTransition(() => {
            game.textContent = scrambleWord(word);
        });
    }

    const startGame = () => {
        startButton.disabled = true;
        const word = getRandomWord();
        currentWord = word;
        // output.textContent = word;
        updateWord(word);
        input.disabled = false;
        input.value = '';
        score = 0;
        timeLeft = 30;
        // start the timer
        timer = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                gameActive = false;
                startButton.disabled = false;
                input.disabled = true;
                game.textContent = 'Your score: ' + score;
                output.textContent = '';
            }
        }, 1000);
        // generate a new word
    }

   

    const nextWord = () => {
        const word = getRandomWord();
        currentWord = word;
        // output.textContent = word;
        updateWord(word);
        input.value = '';
    }

    const submitGuess = (guess) => {

        if (guess.toLowerCase() === currentWord.toLowerCase()) {
            score++;
            wins.textContent = score;
            nextWord();
        } else {
            failedAttempts++;
            fails.textContent = failedAttempts;
        }
    }

    // add event listener to start button

    const startButton = document.querySelector('.js-start-button');
    startButton.addEventListener('click', startGame);
}

wordGame();