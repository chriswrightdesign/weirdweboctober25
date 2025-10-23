(() => {
    const water = document.querySelector('.js-water');
    const prompts = document.querySelector('.js-prompts');

    const QUERIES_PER_SECOND = 28935;
    const LITRES_PER_QUERY = 0.5;

    // Run a counter every second to update the values
    setInterval(() => {
        const now = Date.now();

        // Calculate litres of water used (0.5 litres per query)
        const litres = ((now - performance.timing.navigationStart) / 1000) * QUERIES_PER_SECOND * LITRES_PER_QUERY;
        water.textContent = litres.toLocaleString();

        // Calculate number of prompts made (assuming 4 prompts per minute)
        const promptCount = Math.floor((now - performance.timing.navigationStart) / 15000 * QUERIES_PER_SECOND);
        prompts.textContent = promptCount.toLocaleString();
    }, 1000);
})();