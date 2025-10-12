

// list of 40 contronyms and their meanings
// https://www.dailywritingtips.com/75-contronyms-words-with-contradictory-meanings/

(() => {

    let currentIndex = 0;

    const contronyms = [
        {
            word: 'transparent',
            meaning: "Invisible OR obvious"
        },
        {
            word: 'rock',
            meaning: "An immobile mass of stone OR a shaking movement"
        },
        {
            word: "dust",
            meaning: "To remove dust from the surface of something OR to sprinkle a fine powder over something"
        },
        {
            word: "fast",
            meaning: "Moving at high speed OR fixed firmly in place"
        },
        {
            word: "left",
            meaning: "Departed from a place OR remaining after others are gone"
        },
        {
            word: "sanction",
            meaning: "To give permission OR to impose a penalty"
        },
        {
            word: 'finished',
            meaning: "Completed OR destroyed"
        },
        {
            word: "trim",
            meaning: "To make something neat OR cutting away something unwanted"

        },
        {
            word: "weather",
            meaning: "To withstand OR to wear away"
        },
        {
            word: "bolt",
            meaning: "To secure in place OR to move suddenly and quickly"
        },
        {
            word: "screen",
            meaning: "To show OR to hide or protect from view"
        },
        {
            word: "seed",
            meaning: "To plant seeds in the ground OR to remove seeds from a fruit or vegetable"
        },
        {
            word: "trim",
            meaning: "To decorate OR to remove excess"
        },
        {
            word: "weather",
            meaning: "To endure OR to erode"
        },
        {
            word: "clip",
            meaning: "To attach OR to cut off"
        },
        {
            word: "sanction",
            meaning: "To approve OR to penalize"
        },
        {
            word: "overlook",
            meaning: "To ignore OR to supervise"
        },
        {
            word: "rent",
            meaning: "To lease OR to tear"
        },
        {
            word: "trim",
            meaning: "To decorate OR to remove excess"
        },
        {
            word: "weather",
            meaning: "To endure OR to erode"
        },
        {
            word: "clip",
            meaning: "To attach OR to cut off"
        },
    ];

    const createRandomIndex = (max) => {
        const newIndex = Math.floor(Math.random() * max);
        if (newIndex === currentIndex) {
            return createRandomIndex(max);
        }
        currentIndex = newIndex;
        return newIndex;
    };

    const createEntry = (item) => {
        const entry = document.createElement('div');
        entry.classList.add('entry');

        const title = document.createElement('h1');
        title.classList.add('title');
        title.textContent = item.word;
        entry.appendChild(title);

        const definition = document.createElement('p');
        definition.classList.add('description');
        definition.textContent = item.meaning;
        entry.appendChild(definition);

        return entry;
    }

    const refreshContent = () => {
        const index = createRandomIndex(contronyms.length);
        const output = document.getElementById('output');
        output.innerHTML = '';
        output.appendChild(createEntry(contronyms[index]));
    };

    document.addEventListener('DOMContentLoaded', () => {
        refreshContent();

        refresh.addEventListener('click', () => {
            refreshContent();
        });
    });

})();


