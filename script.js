document.addEventListener('DOMContentLoaded', () => {
    // Search functionality
    const searchInput = document.querySelector('input[type="search"]');
    const cards = document.querySelectorAll('.card');

    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase();
        cards.forEach(card => {
            const cardText = card.querySelector('h5').textContent.toLowerCase();
            if (cardText.includes(searchText)) {
                card.parentElement.style.display = 'block';
            } else {
                card.parentElement.style.display = 'none';
            }
        });
    });

    // Order functionality
    const orderButtons = document.querySelectorAll('.btn-warning');
    orderButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const itemName = button.previousElementSibling.textContent;
            const itemPrice = button.nextElementSibling.textContent;
            alert(`You have ordered: ${itemName} for ${itemPrice}`);
        });
    });
});