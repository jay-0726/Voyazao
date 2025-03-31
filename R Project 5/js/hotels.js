document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date for check-in to today
    const today = new Date().toISOString().split('T')[0];
    document.querySelector('input[type="date"]:first-of-type').min = today;

    // Set minimum date for check-out to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    document.querySelector('input[type="date"]:last-of-type').min = tomorrowString;

    // Handle check-in date change
    document.querySelector('input[type="date"]:first-of-type').addEventListener('change', function(e) {
        const checkOut = document.querySelector('input[type="date"]:last-of-type');
        checkOut.min = e.target.value;
        
        // If check-out date is before new check-in date, update it
        if (checkOut.value < e.target.value) {
            const nextDay = new Date(e.target.value);
            nextDay.setDate(nextDay.getDate() + 1);
            checkOut.value = nextDay.toISOString().split('T')[0];
        }
    });

    // Handle search form submission
    document.querySelector('.hotel-search-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const destination = document.querySelector('input[placeholder="Where are you going?"]').value;
        const checkIn = document.querySelector('input[type="date"]:first-of-type').value;
        const checkOut = document.querySelector('input[type="date"]:last-of-type').value;
        const guests = document.querySelector('select.search-input').value;

        // Validate inputs
        if (!destination || !checkIn || !checkOut) {
            alert('Please fill in all required fields');
            return;
        }

        // Calculate number of nights
        const nights = Math.floor((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
        if (nights < 1) {
            alert('Check-out date must be after check-in date');
            return;
        }

        // Simulate search - In a real application, this would make an API call
        simulateSearch(destination, checkIn, checkOut, guests, nights);
    });

    // Handle filter changes
    document.querySelectorAll('.filter-select').forEach(filter => {
        filter.addEventListener('change', function() {
            applyFilters();
        });
    });

    // Handle booking button clicks
    document.querySelectorAll('.book-now-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const hotelCard = e.target.closest('.hotel-card');
            const hotelName = hotelCard.querySelector('.hotel-name').textContent;
            const price = hotelCard.querySelector('.price-amount').textContent;
            
            // Show booking confirmation dialog
            if (confirm(`Would you like to book ${hotelName} for ${price} per night?`)) {
                // In a real application, this would open a booking form or payment process
                alert('Redirecting to booking form...');
            }
        });
    });
});

function simulateSearch(destination, checkIn, checkOut, guests, nights) {
    // Show loading state
    document.querySelector('.hotel-grid').style.opacity = '0.5';
    document.querySelector('.search-button').disabled = true;
    document.querySelector('.search-button').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';

    // Simulate API delay
    setTimeout(() => {
        // Reset loading state
        document.querySelector('.hotel-grid').style.opacity = '1';
        document.querySelector('.search-button').disabled = false;
        document.querySelector('.search-button').innerHTML = '<i class="fas fa-search"></i> Search Hotels';

        // Update hotel cards with search parameters
        document.querySelectorAll('.hotel-card').forEach(card => {
            const priceElement = card.querySelector('.price-amount');
            const currentPrice = parseInt(priceElement.textContent.replace('$', ''));
            
            // Add total price for stay
            const totalPrice = currentPrice * nights;
            const priceInfo = card.querySelector('.price-period');
            priceInfo.innerHTML = `/night<br><small>Total: $${totalPrice} for ${nights} nights</small>`;
        });

        // Show search results summary
        alert(`Showing hotels in ${destination} for ${guests} from ${checkIn} to ${checkOut}`);
    }, 1500);
}

function applyFilters() {
    const priceRange = document.querySelector('select:nth-of-type(1)').value;
    const starRating = document.querySelector('select:nth-of-type(2)').value;
    const propertyType = document.querySelector('select:nth-of-type(3)').value;

    // Simulate filter application
    document.querySelectorAll('.hotel-card').forEach(card => {
        let visible = true;
        const price = parseInt(card.querySelector('.price-amount').textContent.replace('$', ''));
        const stars = card.querySelectorAll('.rating-star').length;

        // Apply price filter
        if (priceRange !== 'All Prices') {
            const range = priceRange.split(' - ');
            const minPrice = parseInt(range[0].replace('$', ''));
            const maxPrice = range[1] ? parseInt(range[1].replace('$', '')) : Infinity;
            if (price < minPrice || price > maxPrice) visible = false;
        }

        // Apply star rating filter
        if (starRating !== 'All Stars') {
            const requiredStars = parseInt(starRating.split(' ')[0]);
            if (stars !== requiredStars) visible = false;
        }

        // Show/hide card based on filters
        card.style.display = visible ? 'block' : 'none';
    });
}

// Initialize date pickers with today's date
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const checkIn = document.querySelector('input[type="date"]:first-of-type');
    const checkOut = document.querySelector('input[type="date"]:last-of-type');

    checkIn.valueAsDate = today;
    checkOut.valueAsDate = tomorrow;
}); 