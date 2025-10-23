(() => {
    const quote = document.querySelector('.js-quote');
    const nextButton = document.querySelector('.js-next');
    const sincereButton = document.querySelector('.js-sincere');

    let attempts = 0;

    const quotes = [
        "I'm sorry but...",
        "It was just a joke, lighten up...",
        "You are being too sensitive",
        "I don't know anyone else who would get upset by this",
        "You made me act like this",
        "I wouldn't have done it if you hadn't have done...",
        "Don't take it personally",
        "I'm sorry but you're being a child about this",
        "I'm sorry you were offended",
    ];

    function getSincereApology() {
        quote.textContent = "What I did was wrong, there's really no excuse. I'm really sorry for the pain I caused you, I really don't ever want to hurt you like this again.";
    }

    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }

    function updateQuote() {
        attempts++;
        console.log(attempts);
        if (attempts >= 3) {
            sincereButton.classList.remove('hidden');
        }
        quote.textContent = getRandomQuote();
    }

    sincereButton.addEventListener('click', getSincereApology);

    nextButton.addEventListener('click', updateQuote);

    // Initialize with a random quote
    updateQuote();
    

})();