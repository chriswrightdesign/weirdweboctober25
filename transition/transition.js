(() => {

    const rooms = {
        start: {
            description: "The sun woke you up, it's 5:30 AM, you're a little tired because you didn't sleep all that well but you need to go into work today. Ideally, you're out of the house by 8:30AM to catch the bus.",
            actions: [
                { text: "Get out of bed", next: "bedroomAfterRecoup", effects: { addHealthPoints: -50 } },
                { text: "Scroll on your phone", next: "bedroomPhone", effects: { addHealthPoints: 5 } },
                { text: "Attempt to go back to sleep", next: "bedroomSleep", effects: { addHealthPoints: 2 } }
            ]
        },
        bedroomPhone: {
            description: "You scroll through your phone for a while, it gives you time to reorient yourself.",
            actions: [
                { text: "Get out of bed", next: "bedroomAfterRecoup", effects: { addHealthPoints: 0 } }
            ]
        },
        bedroomAfterRecoup: {
            description: "You get out of bed, you need to shower and get dressed before you can leave.",
            actions: [
                { text: "Do a quick morning workout routine", next: "bedroomAfterWorkout", effects: { addHealthPoints: 20 } },
                { text: "Get dressed", next: "dressedWithoutShowerAndWorkout", effects: { addHealthPoints: -40 } },
                { text: "Take a shower", next: "showeredWithoutWorkout", effects: { addHealthPoints: 20 } }
            ],
        },
        bedroomAfterWorkout: {
            description: "You feel great after your workout, you can now shower and get dressed.",
            actions: [
                { text: "Take a shower", next: "showeredAndDressed", effects: { addHealthPoints: 20 } },
                { text: "Get dressed", next: "dressedWithoutShowerAndWorkout", effects: { addHealthPoints: -40 } }
            ]
        },
        dressedWithoutShowerAndWorkout: {
            description: "You feel a little gross and stinky, but at least you're dressed. You should probably take a shower before you leave.",
            actions: [
                { text: "Head to the kitchen", next: "kitchen", effects: { addHealthPoints: -30 } },
                { text: "Take a shower", next: "showeredAndDressed", effects: { addHealthPoints: 20 } }
            ]
        },
        showeredWithoutWorkout: {
            description: "You feel clean, but a little sluggish. You should probably do a quick workout before you leave.",
            actions: [
                { text: "Do a quick morning workout routine", next: "showeredAndDressed", effects: { addHealthPoints: 20 } }
            ]
        },
        showeredAndDressed: {
            description: "You feel great, you're clean and dressed. You can now head to the kitchen to make some coffee before you leave.",
            actions: [
                { text: "Head to the kitchen", next: "kitchen", effects: { addHealthPoints: 0 } }
            ]
        },
        bedroomSleep: {
            description: "You go back to sleep for another thirty minutes, wake up in a little bit of a panic about being late.",
            actions: [
                { text: "Get out of bed", next: "bedroomAfterRecoup", effects: { addHealthPoints: 0 } }
            ]
        },
        gameOver: {
            description: "Game Over! You ran out of health points.",
            actions: [
                { text: "Restart", next: "start", effects: { addHealthPoints: 100 } }
            ]
        }
    }

    let gameState = {
        currentRoom: 'start',
        previousRooms: [],
        healthPoints: 100,
    }

    const checkGameOver = () => {
        if (gameState.healthPoints <= 0) {
            gameState = {
                currentRoom: 'gameOver',
                previousRooms: [],
                healthPoints: 0,
            };
            renderRoom();
        }
    }

    const addToHealthPoints = (amount) => {
        gameState.healthPoints += amount;
        if (gameState.healthPoints > 100) {
            gameState.healthPoints = 100;
        }
        updateHealthPointsDisplay();
        checkGameOver();
    }

    const updateHealthPointsDisplay = () => {
        document.getElementById('healthpoints').textContent = gameState.healthPoints;
    }

    const renderRoom = () => {
        const room = rooms[gameState.currentRoom];
        document.querySelector('.description').textContent = room.description;

        const actionsDiv = document.querySelector('.actions');
        actionsDiv.innerHTML = '';
        room.actions.forEach(action => {
            const button = document.createElement('button');
            button.textContent = action.text;
            button.addEventListener('click', () => {
                addToHealthPoints(action.effects.addHealthPoints);
                gameState.previousRooms.push(gameState.currentRoom);
                gameState.currentRoom = action.next;
                renderRoom();
            });
            actionsDiv.appendChild(button);
        });
    }

    updateHealthPointsDisplay();
    renderRoom();
})();