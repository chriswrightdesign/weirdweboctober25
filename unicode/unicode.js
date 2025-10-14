(() => {


    const questions = [
        {
            id: 'one',
            question: "👁️🚶🏽🫵🚪🌑",
            answers: [
                "I will follow you into the dark",
            ],
        },
        {
            id: 'two',
            question: "👃👍🏽👦🏻👻",
            answers: [
                "Smells like teen spirit",
            ],
        },
        {
            id: 'three',
            question: "🏝️☀️",
            answers: [
                "Island in the sun",
            ],
        },
        {
            id: 'four',
            question: "🟪☔️",
            answers: [
                "Purple rain",
            ],
        },
        {
            id: 'five',
            question: "❤️",
            answers: [
                "All you need is love",
            ],
        },
        {
            id: 'six',
            question: "🌛🌛",
            answers: [
                "Tonight, tonight",
                "tonight tonight",
                "tonight,tonight",
            ],  
        },
        {
            id: 'seven',
            question: "🙍🏼‍♂️🧾🌎",
            answers: [
                "The man who sold the world",
            ],  
        },
        {
            id: 'eight',
            question: "🙍🏼‍♂️🧾🌎",
            answers: [
                "The man who sold the world",
            ],
        },
        {
            id: 'nine',
            question: "🤔🧱",
            answers: [
                "Wonderwall",
                "Wonder wall",
                "Wonder-wall",
            ]
        },
        {
            id: 'ten',
            question: "📆👁️📥❤️",
            answers: [
                "Friday I'm in love",
                "Friday Im in love",
            ]
        },
        {
            id: 'eleven',
            question: "♻️🌎",
            answers: [
                "Around the world",
            ]
        },
        {
            id: 'twelve',
            question: "🤷🏻🧠",
            answers: [
                "Where is my mind",
                "Where is my mind?",
            ]
        },
        {
            id: 'thirteen',
            question: "🌴",
            answers: [
                "Holiday",
            ]
        },
        {
            id: 'fourteen',
            question: "🇬🇷🎭",
            answers: [
                "Greek tragedy",
            ]
        },
        {
            id: 'fifteen',
            question: "🛋️🙏",
            answers: [
                "Living on a prayer",
            ]
        },
        {
            id: 'sixteen',
            question: "💤💭",
            answers: [
                "Dreams",
            ]
        },
        {
            id: 'seventeen',
            question: "🔋🧘🏻‍♀️⬆️",
            answers: [
                "Start me up",
            ]
        },
        {
            id: 'eighteen',
            question: "🍑🧃",
            answers: [
                "Juice",
            ]
        },
        {
            id: 'nineteen',
            question: "🙅🏻👜🧘‍♂️⬇️",
            answers: [
                "Don't bring me down",
            ]
        },
        {
            id: 'twenty',
            question: "🫵🏗️🧘‍♂️😘💃🏻",
            answers: [
                "You make me feel like dancing",
            ]
        },
        {
            id: 'twenty-one',
            question: "👈☀️👈",
            answers: [
                "Here comes the sun",
            ]
        },
        {
            id: 'twenty-two',
            question: "🔛☀️📆",
            answers: [
                "On a sunday"
            ]
        },
        {
            id: 'twenty-three',
            question: "🐙🪴",
            answers: [
                "Octopus's garden",
                "Octopuss garden",
                "Octopus garden",
            ]
        },
        {
            id: 'twenty-four',
            question: "🌊🙃",
            answers: [
                "Seaside",
            ]
        },
        {
            id: 'twenty-five',
            question: "👯👭📏🌏",
            answers: [
                "Everybody wants to rule the world",
            ]
        },
        {
            id: 'twenty-six',
            question: "🇦🇺",
            answers: [
                "Australia",
            ]
        },
        {
            id: 'twenty-seven',
            question: "⬛️🎶",
            answers: [
                "Simple song",
            ]
        },
        {
            id: 'twenty-eight',
            question: "🐦‍⬛",
            answers: [
                "Blackbird",
            ]
        },
    ];

    const body = document.body;
    let score = 0;
    let questionNumber = 0;
    let askedQuestions = [];
    let currentQuestion = undefined;
    const question = document.querySelector('.js-question');
    const answer = document.querySelector('.js-answer');
    const button = document.querySelector('.js-submit');
    const scoreDisplay = document.querySelector('.js-score');
    const restartButton = document.querySelector('.js-restart');

    restartButton.addEventListener('click', () => {
        body.classList.remove('finished');
        score = 0;
        questionNumber = 0;
        askedQuestions = [];
        scoreDisplay.textContent = `0 / 0`;
        nextQuestion();
        answer.value = '';
        answer.focus();
    });

    scoreDisplay.textContent = `0 / 0`;

    const getQuestionObject = () => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        if (askedQuestions.includes(randomIndex) && askedQuestions.length < questions.length) {
            return getQuestionObject();
        }
        askedQuestions.push(randomIndex);
        questionNumber++;
        return questions[randomIndex];
    }

    const endGame = () => {
        body.classList.add('finished');
        // show final score
    }

    const nextQuestion = () => {
        if (questionNumber === 10) {
            endGame();
            return;
        }
        const questionObject = getQuestionObject();
        currentQuestion = questionObject;
        question.textContent = questionObject.question
    }

    nextQuestion();

    button.addEventListener('click', () => {
        const userAnswer = answer.value.trim().toLowerCase();
        if (userAnswer.length === 0) {
            return;
        }

        const currentAnswers = currentQuestion.answers.map(a => a.toLowerCase());
        if (currentAnswers.includes(userAnswer)) {
            score++;
            scoreDisplay.textContent = `${score} / ${questionNumber}`;
        }

        nextQuestion();
        answer.value = '';
        answer.focus();
    });

    answer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            button.click();
        }
    });

        









})();