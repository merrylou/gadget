/* Archive System Logic - Fixed */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Archive System Loading...");

    const yearSlider = document.getElementById('year-slider');
    const yearDisplay = document.getElementById('year-display');
    const tags = document.querySelectorAll('.tag-filter');
    const cards = document.querySelectorAll('.archive-card'); // Ensure this selects the book cards
    // If we add other sections (chars etc), we should make sure we only filter books or label them properly.
    // Let's assume .archive-card.book-item to be specific if needed, but for now .archive-card inside #book-grid is safer.
    const bookGrid = document.getElementById('book-grid');
    const bookCards = bookGrid ? bookGrid.querySelectorAll('.archive-card') : [];
    const resetButton = document.getElementById('reset-filters');

    // State
    let currentYearCap = parseInt(yearSlider.value);
    let activeTag = 'ALL';

    // Initialize
    updateDisplay();

    // Event Listeners
    yearSlider.addEventListener('input', (e) => {
        currentYearCap = parseInt(e.target.value);
        yearDisplay.textContent = `TIMELINE: 1975 - ${currentYearCap}`;
        filterCards();
    });

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Toggle active state visualization
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            // Set state
            activeTag = tag.dataset.tag;
            console.log("Tag selected:", activeTag);
            filterCards();
        });
    });

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            currentYearCap = 1990;
            yearSlider.value = 1990;
            yearDisplay.textContent = "TIMELINE: 1975 - 1990";

            activeTag = 'ALL';
            tags.forEach(t => t.classList.remove('active'));
            document.querySelector('[data-tag="ALL"]').classList.add('active');

            filterCards();
        });
    }

    function updateDisplay() {
        yearDisplay.textContent = `TIMELINE: 1975 - ${currentYearCap}`;
    }

    function filterCards() {
        bookCards.forEach(card => {
            const cardYear = parseInt(card.dataset.year);
            const cardTags = card.dataset.tags ? card.dataset.tags.split(',') : [];

            // Year Logic: Show books published ON OR BEFORE the slider year (Time Cap)
            // If slider is at max (1990), show everything up to 1990.
            const yearMatch = (cardYear <= currentYearCap);

            // Tag Logic
            let tagMatch = true;
            if (activeTag !== 'ALL') {
                // Check if any of the card's tags match the active tag
                tagMatch = cardTags.includes(activeTag);
            }

            if (yearMatch && tagMatch) {
                card.classList.remove('hidden');
                // Use opacity for transition
                setTimeout(() => card.style.opacity = '1', 10);
                card.style.display = 'block'; // Ensure it flows
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.classList.add('hidden'), 300);
                setTimeout(() => card.style.display = 'none', 300); // Remove from flow
            }
        });
    }

    console.log("Archive System Ready. Cards found:", bookCards.length);
});
