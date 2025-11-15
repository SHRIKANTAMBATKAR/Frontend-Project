// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        navbar.style.background = 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 10%, transparent)';
    }
});

// Search functionality
const searchButton = document.querySelector('.search-bar button');
const searchInput = document.querySelector('.search-bar input');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        console.log('Searching for:', query);
        // Add your search logic here
        alert(`Searching for: ${query}`);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

// Card click handlers
const cards = document.querySelectorAll('.card');
cards.forEach((card) => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.card-overlay h3')?.textContent || 'Show Details';
        console.log('Playing:', title);
        // Add modal or navigation here
    });
});

// Play button handlers
const playButtons = document.querySelectorAll('.card-btn');
playButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const icon = btn.querySelector('i');
        
        if (icon.classList.contains('fa-play')) {
            alert('Playing video...');
        } else if (icon.classList.contains('fa-plus')) {
            alert('Added to watchlist!');
            btn.style.background = 'var(--accent-color)';
        } else if (icon.classList.contains('fa-thumbs-up')) {
            alert('Marked as liked!');
            btn.style.background = 'var(--accent-color)';
        }
    });
});

// Navigation link scroll behavior
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Navigating to:', link.textContent);
    });
});

// User menu
const userMenu = document.querySelector('.user-menu');
if (userMenu) {
    userMenu.addEventListener('click', () => {
        alert('User profile menu clicked');
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key to clear search
    if (e.key === 'Escape') {
        searchInput.value = '';
        searchInput.blur();
    }
});

// Add ARIA labels for accessibility
const addAriaLabels = () => {
    const playBtns = document.querySelectorAll('.card-btn');
    playBtns.forEach((btn, index) => {
        const icon = btn.querySelector('i');
        let label = 'Button';
        
        if (icon.classList.contains('fa-play')) {
            label = 'Play';
        } else if (icon.classList.contains('fa-plus')) {
            label = 'Add to watchlist';
        } else if (icon.classList.contains('fa-thumbs-up')) {
            label = 'Like';
        }
        
        btn.setAttribute('aria-label', label);
    });

    const searchBtn = document.querySelector('.search-bar button');
    searchBtn.setAttribute('aria-label', 'Search');
};

document.addEventListener('DOMContentLoaded', addAriaLabels);

console.log('Netflix Clone loaded successfully!');
