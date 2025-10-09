(() => {
    const d = document;
    const $ = function(selector){ return d.querySelector(selector) };
    const cards = $('.js-cards');
    let currentCard = 0;
    let isFlipped = false;

    let cardList = [].slice.call(document.querySelectorAll('.js-card'));

    function flipCard(){
        cards.classList.toggle('is-flipped');
    }

    function getRandomNumberFromList(list, currentNumber = 0){

        const randoNumber = Math.floor(Math.random() * list.length) + 1;

        if (randoNumber === currentNumber){
            return getRandomNumberFromList(list, currentNumber);
        }
        return randoNumber;
    }

    function createTranslateString(num){
        var translater = (num - 1) * 100;
        var amount = translater * -1;
        amount = amount.toString();
        return 'translateX(' + amount + '%' + ')';
    }

    function translateToPosition(position){
        cards.style.transform = position;
    }

    //will be used later in an API, but for now not used
    function createImageList(items){
        var list = [];
        return list;
    }

    function handleClick(e){
        e.preventDefault();
        if(!isFlipped){
            currentCard = getRandomNumberFromList(cardList, currentCard);
            let translateString = createTranslateString(currentCard);
            translateToPosition(translateString);
        }
        flipCard();
        isFlipped = !isFlipped;
    }
    cards.addEventListener('click', handleClick, false);
})();