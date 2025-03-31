// Top Attractions specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const searchInput = document.getElementById('attraction-search');
    const continentFilter = document.getElementById('continent-filter');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const attractionCards = document.querySelectorAll('.attraction-card');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    // Initial state
    let visibleCards = 12;
    let filteredCards = [...attractionCards];
    
    // Hide cards beyond initial visible count
    updateVisibleCards();
    
    // Event listeners
    if (searchInput) searchInput.addEventListener('input', filterAttractions);
    if (continentFilter) continentFilter.addEventListener('change', filterAttractions);
    if (categoryFilter) categoryFilter.addEventListener('change', filterAttractions);
    if (sortFilter) sortFilter.addEventListener('change', sortAndFilterAttractions);
    if (loadMoreBtn) loadMoreBtn.addEventListener('click', loadMoreAttractions);
    
    // Function to filter attractions
    function filterAttractions() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const continent = continentFilter ? continentFilter.value : 'all';
        const category = categoryFilter ? categoryFilter.value : 'all';
        
        filteredCards = [...attractionCards].filter(card => {
            // Text search
            const cardText = card.textContent.toLowerCase();
            const matchesSearch = searchTerm === '' || cardText.includes(searchTerm);
            
            // Continent filter
            const cardContinent = card.dataset.continent;
            const matchesContinent = continent === 'all' || cardContinent === continent;
            
            // Category filter
            const cardCategory = card.dataset.category;
            const matchesCategory = category === 'all' || cardCategory === category;
            
            return matchesSearch && matchesContinent && matchesCategory;
        });
        
        // Apply current sort
        sortAttractions();
        
        // Reset visible count and update display
        visibleCards = 12;
        updateVisibleCards();
        updateLoadMoreButton();
    }
    
    // Function to sort attractions
    function sortAttractions() {
        const sortBy = sortFilter ? sortFilter.value : 'popularity';
        
        filteredCards.sort((a, b) => {
            switch(sortBy) {
                case 'name-asc':
                    return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
                case 'name-desc':
                    return b.querySelector('h3').textContent.localeCompare(a.querySelector('h3').textContent);
                case 'rating':
                    const ratingA = parseFloat(a.querySelector('.attraction-rating span').textContent);
                    const ratingB = parseFloat(b.querySelector('.attraction-rating span').textContent);
                    return ratingB - ratingA;
                default:
                    // Default sort (popularity) - use DOM order
                    return [...attractionCards].indexOf(a) - [...attractionCards].indexOf(b);
            }
        });
    }
    
    // Function to sort and filter attractions (combined)
    function sortAndFilterAttractions() {
        filterAttractions();
    }
    
    // Function to update visible cards
    function updateVisibleCards() {
        // Hide all cards first
        attractionCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Show filtered cards up to the visible count
        filteredCards.slice(0, visibleCards).forEach(card => {
            card.style.display = 'block';
        });
    }
    
    // Function to load more attractions
    function loadMoreAttractions() {
        visibleCards += 8;
        updateVisibleCards();
        updateLoadMoreButton();
    }
    
    // Function to update load more button visibility
    function updateLoadMoreButton() {
        if (filteredCards.length <= visibleCards) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
    
    // Carousel functionality for featured cities
    const cityCarousel = document.querySelector('.city-carousel');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let scrollAmount = 0;
    const scrollStep = 320; // Width of card + gap
    
    nextBtn.addEventListener('click', () => {
        scrollAmount += scrollStep;
        if (scrollAmount > cityCarousel.scrollWidth - cityCarousel.clientWidth) {
            scrollAmount = cityCarousel.scrollWidth - cityCarousel.clientWidth;
        }
        cityCarousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    prevBtn.addEventListener('click', () => {
        scrollAmount -= scrollStep;
        if (scrollAmount < 0) {
            scrollAmount = 0;
        }
        cityCarousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // View Details button click event
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.attraction-card');
            const attractionName = card.querySelector('h3').textContent;
            const attractionLocation = card.querySelector('.location').textContent.replace(/^\s*i\s*/, '').trim();
            
            alert(`Viewing details for ${attractionName} in ${attractionLocation}. This would open a detailed page in a real application.`);
        });
    });
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form-special');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email && validateEmail(email)) {
            alert('Thank you for subscribing to our destination updates!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address');
        }
    });
    
    // Helper function to validate email
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Download guide button
    const downloadGuideBtn = document.querySelector('.download-guide-btn');
    
    downloadGuideBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('The travel guide PDF would download here in a real application.');
    });
    
    // City explore buttons
    const exploreBtns = document.querySelectorAll('.explore-btn');
    
    exploreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const cityCard = this.closest('.city-card');
            const cityName = cityCard.querySelector('h3').textContent;
            
            alert(`Exploring ${cityName}. This would open a city guide page in a real application.`);
        });
    });
}); 