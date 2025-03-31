document.addEventListener('DOMContentLoaded', function() {
    // Get attraction ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const attractionId = urlParams.get('id');
    
    if (!attractionId) {
        showError('No attraction specified. Please go back and select an attraction.');
        return;
    }
    
    // Load attraction details based on the ID
    loadAttractionDetails(attractionId);
});

// Function to load attraction details
function loadAttractionDetails(attractionId) {
    // In a real application, this would be an API call
    // For this example, we'll use a static object with attraction data
    const attractions = {
        'mount-fuji': {
            name: 'Mount Fuji',
            location: 'Japan',
            rating: 4.8,
            category: ['Natural', 'Mountain'],
            image: '../images/attractions/fuji-mountain.jpg',
            description: 'Mount Fuji is Japan\'s highest mountain and an iconic symbol of the country.',
            longDescription: 'Mount Fuji is Japan\'s highest mountain and an iconic symbol of the country. Standing at 3,776 meters (12,380 feet), this active stratovolcano is known for its perfectly symmetrical cone that is snow-capped for several months of the year.',
            history: 'Mount Fuji has been revered as a sacred mountain and an object of pilgrimage since ancient times. It was first climbed by a monk in 663 CE. The volcano has been dormant since its last eruption in 1707-08, but is still classified as active.',
            features: [
                'Japan\'s highest mountain at 3,776 meters',
                'Perfect symmetrical cone shape',
                'UNESCO World Heritage Site',
                'Popular hiking destination with 4 main trails'
            ],
            openingHours: 'Official climbing season: Early July to mid-September',
            bestTimeToVisit: 'Late July to early September for climbing',
            entranceFee: '1,000 yen (climbing fee)',
            tourPrice: '$149'
        },
        'colosseum': {
            name: 'Colosseum',
            location: 'Rome, Italy',
            rating: 4.7,
            category: ['Historical', 'Architecture'],
            image: '../images/attractions/architecture-Roman-Colosseum.jpg',
            description: 'An ancient amphitheater in the center of Rome.',
            longDescription: 'The Colosseum is an ancient Roman amphitheater located in the center of Rome. It is the largest amphitheater ever built and remains the largest standing amphitheater in the world today, despite its age.',
            history: 'The Colosseum was built on the site of Nero\'s Golden House as part of an effort to restore Rome to its citizens. It was inaugurated in 80 CE with 100 days of games.',
            features: [
                'Largest ancient amphitheater ever built',
                'Could hold between 50,000-80,000 spectators',
                'UNESCO World Heritage Site',
                'One of the New Seven Wonders of the World'
            ],
            openingHours: 'Daily 8:30 AM - 7:00 PM (hours vary by season)',
            bestTimeToVisit: 'Early morning or late afternoon to avoid crowds',
            entranceFee: '€16 (standard ticket)',
            tourPrice: '$59'
        },
        'grand-canyon': {
            name: 'Grand Canyon',
            location: 'Arizona, USA',
            rating: 4.9,
            category: ['Natural', 'Canyon'],
            image: '../images/attractions/grand-canyon.jpg',
            description: 'A steep-sided canyon carved by the Colorado River.',
            longDescription: 'The Grand Canyon is a steep-sided canyon carved by the Colorado River in Arizona, United States. The Grand Canyon is 277 miles (446 km) long, up to 18 miles (29 km) wide and attains a depth of over a mile.',
            history: 'The Grand Canyon has been inhabited by Native Americans for thousands of years. European explorers first came to the canyon in the 1540s. Grand Canyon National Park was established in 1919.',
            features: [
                'One of the Seven Natural Wonders of the World',
                '277 miles (446 km) long and up to 18 miles wide',
                'UNESCO World Heritage Site',
                'Home to over 1,500 plant species and 500 animal species'
            ],
            openingHours: 'South Rim: Open 24 hours daily',
            bestTimeToVisit: 'March to May and September to November',
            entranceFee: '$35 per vehicle',
            tourPrice: '$129'
        },
        'taj-mahal': {
            name: 'Taj Mahal',
            location: 'Agra, India',
            rating: 4.8,
            category: ['Historical', 'Architecture'],
            image: '../images/attractions/taj-mahal.jpg',
            description: 'An ivory-white marble mausoleum in Agra, India.',
            longDescription: 'The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.',
            history: 'Shah Jahan commissioned the Taj Mahal in 1632 after the death of his beloved wife Mumtaz Mahal. The construction employed some 20,000 artisans under the guidance of a board of architects.',
            features: [
                'Built with white marble from Rajasthan',
                'Perfect symmetry and careful detailing',
                'Intricate carvings and semi-precious stone inlays',
                'UNESCO World Heritage Site'
            ],
            openingHours: 'Daily from sunrise to sunset, closed on Fridays',
            bestTimeToVisit: 'October to March for pleasant weather',
            entranceFee: '1,100 rupees for foreign tourists',
            tourPrice: '$79'
        },
        'machu-picchu': {
            name: 'Machu Picchu',
            location: 'Peru',
            rating: 4.9,
            category: ['Historical', 'Cultural'],
            image: '../images/attractions/Machu Pichu.jpg',
            description: 'An ancient Incan citadel set high in the Andes Mountains.',
            longDescription: 'Machu Picchu is an ancient Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley. Built in the 15th century and later abandoned, it is renowned for its sophisticated dry-stone walls.',
            history: 'Machu Picchu was built around 1450, at the height of the Inca Empire. It was abandoned just over 100 years later, in 1572, as a belated result of the Spanish Conquest.',
            features: [
                'Sophisticated urban planning and engineering',
                'Over 200 structures at high elevation',
                'UNESCO World Heritage Site',
                'One of the New Seven Wonders of the World'
            ],
            openingHours: 'Daily 6:00 AM - 5:30 PM',
            bestTimeToVisit: 'May to September (dry season)',
            entranceFee: '152 Peruvian soles (approx. $42 USD)',
            tourPrice: '$199'
        },
        'eiffel-tower': {
            name: 'Eiffel Tower',
            location: 'Paris, France',
            rating: 4.6,
            category: ['Cultural', 'Architecture'],
            image: '../images/attractions/Paris-Eiffel-Tower-Wallpaper-HD-Widescreen.jpg',
            description: 'A wrought-iron lattice tower on the Champ de Mars.',
            longDescription: 'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.',
            history: 'The Eiffel Tower was built for the 1889 Exposition Universelle (World\'s Fair) to celebrate the 100th anniversary of the French Revolution.',
            features: [
                '324 meters (1,063 ft) tall',
                'Three levels open to the public with restaurants',
                'Made of 18,038 pieces of wrought iron',
                'Illuminated by 20,000 light bulbs every night'
            ],
            openingHours: 'Daily 9:00 AM - 12:45 AM (summer), 9:30 AM - 11:45 PM (winter)',
            bestTimeToVisit: 'Early morning or late evening to avoid crowds',
            entranceFee: '€26.80 for adults to the top (by elevator)',
            tourPrice: '$89'
        },
        'sydney-opera-house': {
            name: 'Sydney Opera House',
            location: 'Sydney, Australia',
            rating: 4.7,
            category: ['Modern', 'Architecture'],
            image: '../images/attractions/sydney opera house.jpeg',
            description: 'A multi-venue performing arts center.',
            longDescription: 'The Sydney Opera House is a multi-venue performing arts center in Sydney, Australia. Located on the banks of Sydney Harbour, it is widely regarded as one of the world\'s most distinctive buildings.',
            history: 'The Sydney Opera House was conceived and largely built between 1957 and 1973. Designed by Danish architect Jørn Utzon, it was formally opened in 1973.',
            features: [
                'Distinctive sail-shaped shells',
                'Five main performance venues',
                'UNESCO World Heritage Site',
                'One of the most photographed buildings in the world'
            ],
            openingHours: 'Tours daily 9:00 AM - 5:00 PM',
            bestTimeToVisit: 'Early morning for fewer crowds',
            entranceFee: 'AU$43 for guided tours',
            tourPrice: '$59'
        },
        'victoria-falls': {
            name: 'Victoria Falls',
            location: 'Zambia/Zimbabwe',
            rating: 4.8,
            category: ['Natural', 'Waterfall'],
            image: '../images/attractions/Victoria Falls.jpeg',
            description: 'A spectacular waterfall on the Zambezi River.',
            longDescription: 'Victoria Falls is a waterfall on the Zambezi River in southern Africa. It is located on the border between Zambia and Zimbabwe and is one of the world\'s largest waterfalls.',
            history: 'The falls were first seen by a European when Scottish explorer David Livingstone visited in 1855 and named them after Queen Victoria.',
            features: [
                'One of the Seven Natural Wonders of the World',
                'Largest curtain of falling water in the world',
                'UNESCO World Heritage Site',
                'Known as "The Smoke That Thunders"'
            ],
            openingHours: 'Park open daily 6:00 AM - 6:00 PM',
            bestTimeToVisit: 'February to May (peak flow)',
            entranceFee: '$30 USD (Zimbabwe side), $20 USD (Zambia side)',
            tourPrice: '$89'
        },
        'statue-of-liberty': {
            name: 'Statue of Liberty',
            location: 'New York, USA',
            rating: 4.6,
            category: ['Modern', 'Monument'],
            image: '../images/attractions/statue-of-liberty.jpg',
            description: 'A colossal neoclassical sculpture on Liberty Island.',
            longDescription: 'The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor. The copper statue was a gift from the people of France to the people of the United States.',
            history: 'The statue was dedicated on October 28, 1886. It was a gift commemorating the alliance of France and the United States during the American Revolution.',
            features: [
                '93 meters (305 feet) tall including the pedestal',
                'Made of copper sheets (now green due to oxidation)',
                'Seven spikes on the crown representing the seven seas and continents',
                'UNESCO World Heritage Site'
            ],
            openingHours: 'Daily 8:30 AM - 4:00 PM',
            bestTimeToVisit: 'Weekdays, early morning',
            entranceFee: '$24 for ferry and pedestal access',
            tourPrice: '$59'
        },
        'great-wall': {
            name: 'Great Wall of China',
            location: 'China',
            rating: 4.8,
            category: ['Historical', 'Architecture'],
            image: '../images/attractions/Great wall of China.jpg',
            description: 'A series of fortifications along the historical northern borders of China.',
            longDescription: 'The Great Wall of China is a series of fortifications built along the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups.',
            history: 'The Great Wall began as independent walls for different states. After the unification of China in 221 B.C., the first emperor of Qin Dynasty linked the walls of the states in the north.',
            features: [
                'Total length of all sections is approximately 21,196 kilometers',
                'Features watchtowers and garrison stations',
                'UNESCO World Heritage Site',
                'One of the New Seven Wonders of the World'
            ],
            openingHours: 'Varies by section, most open 7:30 AM - 5:30 PM',
            bestTimeToVisit: 'April-May or September-October',
            entranceFee: '30-60 yuan for popular sections',
            tourPrice: '$99'
        },
        'santorini': {
            name: 'Santorini',
            location: 'Greece',
            rating: 4.9,
            category: ['Cultural', 'Island'],
            image: '../images/attractions/Santorini.jpg',
            description: 'A stunning Greek island with white-washed buildings and blue domes.',
            longDescription: 'Santorini is an island in the southern Aegean Sea, about 200 km southeast from Greece\'s mainland. It is the remnant of a volcanic caldera, known for its stunning views and sunsets.',
            history: 'Santorini\'s history is marked by one of the largest volcanic eruptions in recorded history (around 1613 BC), which left a large caldera surrounded by volcanic ash deposits.',
            features: [
                'Iconic white buildings with blue domes',
                'Dramatic cliffs with stunning views',
                'Unique volcanic beaches',
                'Famous for breathtaking sunsets'
            ],
            openingHours: 'Island accessible year-round',
            bestTimeToVisit: 'April-June or September-October',
            entranceFee: 'No fee to visit the island',
            tourPrice: '$119'
        },
        'serengeti': {
            name: 'Serengeti National Park',
            location: 'Tanzania',
            rating: 4.9,
            category: ['Adventure', 'Wildlife'],
            image: '../images/attractions/serengeti-national-park-elephant.jpg',
            description: 'A vast ecosystem in Tanzania, famous for its annual migration of wildebeest.',
            longDescription: 'Serengeti National Park is a vast ecosystem in north-central Tanzania that spans approximately 30,000 square kilometers. The park is famous for its annual migration of over 1.5 million wildebeest.',
            history: 'The Serengeti ecosystem is one of the oldest on Earth. In 1951, it was established as Tanzania\'s first national park and became a UNESCO World Heritage Site in 1981.',
            features: [
                'Annual Great Migration of over 1.5 million wildebeest',
                'Home to the "Big Five" animals',
                'UNESCO World Heritage Site',
                'Over 500 bird species identified in the park'
            ],
            openingHours: 'Park open 24 hours, gate hours 6:00 AM - 6:00 PM',
            bestTimeToVisit: 'June-September for migration river crossings',
            entranceFee: '$60 USD per adult per day',
            tourPrice: '$249'
        }
    };
    
    // Get the attraction data
    const attraction = attractions[attractionId];
    
    // If attraction not found, show error
    if (!attraction) {
        showError('Attraction not found. Please go back and select a valid attraction.');
        return;
    }
    
    // Render the attraction details
    renderAttractionDetails(attraction);
}

// Function to render attraction details
function renderAttractionDetails(attraction) {
    const detailsContent = document.getElementById('attraction-details-content');
    
    // Create HTML content for attraction details
    const html = `
        <div class="attraction-header">
            <img src="${attraction.image}" alt="${attraction.name}" class="attraction-banner">
        </div>
        
        <div class="attraction-info-header">
            <div class="attraction-title">
                <h1>${attraction.name}</h1>
                <p class="attraction-location"><i class="fas fa-map-marker-alt"></i> ${attraction.location}</p>
                <div class="attraction-tags">
                    ${attraction.category.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="attraction-rating">
                <i class="fas fa-star"></i>
                <span>${attraction.rating}</span>
            </div>
        </div>
        
        <div class="attraction-content">
            <div class="attraction-description">
                <h2>Overview</h2>
                <p>${attraction.longDescription}</p>
                
                <div class="history-section">
                    <h3>History</h3>
                    <p>${attraction.history}</p>
                </div>
                
                <div class="features-section">
                    <h3>Key Features</h3>
                    <ul class="features-list">
                        ${attraction.features.map(feature => `<li><i class="fas fa-check-circle"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="attraction-sidebar">
                <div class="info-box">
                    <h3>Visitor Information</h3>
                    <div class="info-item">
                        <span class="info-item-label">Opening Hours</span>
                        <span class="info-item-value">${attraction.openingHours}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-item-label">Best Time to Visit</span>
                        <span class="info-item-value">${attraction.bestTimeToVisit}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-item-label">Entrance Fee</span>
                        <span class="info-item-value">${attraction.entranceFee}</span>
                    </div>
                </div>
                
                <div class="book-tour-box">
                    <h3>Book a Guided Tour</h3>
                    <p>Experience the best of ${attraction.name} with our expert guides</p>
                    <div class="price">${attraction.tourPrice}</div>
                    <a href="#" class="book-btn">Book Now</a>
                </div>
            </div>
        </div>
    `;
    
    // Update the content
    detailsContent.innerHTML = html;
}

// Function to show error message
function showError(message) {
    const detailsContent = document.getElementById('attraction-details-content');
    detailsContent.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
            <a href="attractions.html" class="back-link">Go Back to Attractions</a>
        </div>
    `;
} 