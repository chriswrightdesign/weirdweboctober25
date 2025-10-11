(() => {

    const body = document.body;
    const buttonOne = document.querySelector('.js-one');
    const buttonTwo = document.querySelector('.js-two');

    const lifeChoice = document.querySelector('.js-button-choice-life');
    const workChoice = document.querySelector('.js-button-choice-work');

    const introPage = document.querySelector('.js-intro-page');

    let listItem1 = null;
    let listItem2 = null;
    let battleCount = 0;

    let listVotes;

    let losers = [];
    let biggestLoser;
    let isFinalBattle = false;

    let loserList = losers;
    let finalLosers = [];



    const list = ['Let one rip on a train', 'Do a poo', 'Notice something new in a song you like', 'Eat a sandwich', 'Head massages','Drop a stinker in public and watch as someone starts sniffing and try not to laugh', 'Touch hands with a crush', 'Watch TV', 'Have a drink of water when you are really thirsty', 'Get to the toilet when you are literally seconds from soiling yourself', 'The feeling when you notice someone react to you positively', 'Remembering what you did last week', 'Remembering why you entered the room', 'Watch a movie', 'Play video games', 'Read a book', 'Go for a walk', 'Cook dinner', 'Clean the toilet', 'Run to your friends house and nearly die', 'Have a nap', 'Take a shower when you were sweaty', 'Go to the gym', 'Meditate', 'Play an instrument', 'Go to a gig', 'Do something ludicrous', 'Paint a picture', 'Dance in your house', 'Organise your wardrobe', 'Listen to music', 'Have a coffee with a friend', 'Go on tangents', 'See a friend you haven\'t seen in a while', 'Have a bath', 'Hang with your bestie in work time', 'Have a picnic', 'Get bitten in the butt by an ant', 'Let one rip in a church', 'Roll around in the grass'];

    const workplaceList = ['Time box', 'Stand up', 'Sprint', 'Retrospective', 'Backlog grooming', 'User story', 'Scrum master', 'Create synergies', 'Low hanging fruit', 'Circle back', 'Ping me', 'Bandwidth', 'Touch base', 'Move the needle', 'Deep dive', 'Take this offline', 'On the same page', 'Game changer', 'Disruptive', 'Ideate', 'Pivot', 'Leverage', 'Granular', 'Scalable', 'Streamline', 'Ecosystem', 'Wheelhouse', 'Pain point', 'Core competency', 'Value add', 'Quick win'];

    let testList = list;

    const setBattleType = (type) => {
        if (type === 'life') {
            testList = list;
            listVotes = createListVotes(testList);
            introPage.classList.add('is-complete');
            return;
        }
        testList = workplaceList;
        listVotes = createListVotes(testList);
        introPage.classList.add('is-complete');
    }

    lifeChoice.addEventListener('click', () => {
        setBattleType('life');
        setup();
    });

    workChoice.addEventListener('click', () => {
        setBattleType('work');
        setup();
    });

    const createListVotes = (listName) => {
        const listVotes = listName.reduce((acc, curr) => ({
            ...acc,
            [curr]: 0
        }), {});
        return listVotes;
    }

    const setWinners = () => {
 
        const sortedVotes = Object.entries(listVotes).filter((item) => {
            return item !== undefined;
        }).sort((a, b) => b[1] - a[1]);

        const resultsContainer = document.querySelector('.js-results');
        const runnersUpList = resultsContainer.querySelector('.js-runners-up');
        sortedVotes.forEach(runner => {
            const li = document.createElement('li');
            li.textContent = `${runner[0]} - ${runner[1]} votes`;
            runnersUpList.appendChild(li);
        });
        // const loserText = resultsContainer.querySelector('.js-loser');
        // loserText.textContent = `Loser: ${biggestLoser}`;
        resultsContainer.classList.add('is-active');
        body.classList.add('is-complete');
    }

    const updateVotes = (choice) => {
        battleCount += 1;
        listVotes[choice] += 1;

        if ((testList.length - losers.length) <= 1) {
            setWinners();
            return;
        }

        setup();
    }



    // randomly select one of the list items
    const randomUniqueChoice = () => {
        const index = Math.floor(Math.random() * testList.length);
        const item = testList[index];
        
        // the problem is there's no items left.
        if (losers.length === (testList.length - 3)) {
            setWinners();
            return;
        }
        if (item === listItem1 || item === listItem2 || losers.includes(item)) {
            return randomUniqueChoice();
        }
        return item;
    }

    const setup = () => {
        listItem1 = randomUniqueChoice();
        listItem2 = randomUniqueChoice();

        buttonOne.textContent = listItem1;
        buttonTwo.textContent = listItem2;

    }

    buttonOne.addEventListener('click', () => {
        losers.push(listItem2);
        updateVotes(listItem1);
    });

    buttonTwo.addEventListener('click', () => {
        losers.push(listItem1);
        updateVotes(listItem2);
    });

    // battle
})();

// 1. on every change, shake the 'vs'
// 2. make the new word come in with an animation