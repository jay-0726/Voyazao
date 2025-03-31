document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date for the start date to today
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.getElementById('start-date').min = formattedDate;
    document.getElementById('start-date').value = formattedDate;
    
    // Initialize form
    const form = document.getElementById('ai-planner-form');
    const loadingElement = document.getElementById('loading');
    const destinationsSection = document.getElementById('destinations-section');
    const destinationsList = document.getElementById('destinations-list');
    const itinerarySection = document.getElementById('itinerary-section');
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get selected interests
        const interestCheckboxes = document.querySelectorAll('input[name="interests"]:checked');
        const interests = Array.from(interestCheckboxes).map(checkbox => checkbox.value);
        
        if (interests.length === 0) {
            alert('Please select at least one interest');
            return;
        }
        
        // Get other form values
        const budget = document.getElementById('budget').value;
        const duration = document.getElementById('duration').value;
        const budgetFlexibility = document.getElementById('budget-flexibility').value;
        const accommodationPreference = document.getElementById('accommodation-preference').value;
        const travelStyle = document.getElementById('travel-style').value;
        const adults = document.getElementById('adults').value;
        const children = document.getElementById('children').value;
        
        // Get specific requirements
        const requirementCheckboxes = document.querySelectorAll('input[name="requirements"]:checked');
        const requirements = Array.from(requirementCheckboxes).map(checkbox => checkbox.value);
        
        // Show loading indicator and hide other sections
        loadingElement.style.display = 'block';
        destinationsSection.style.display = 'none';
        itinerarySection.style.display = 'none';
        
        // Call API to get destination suggestions
        fetch('/api/suggest-destinations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                interests: interests,
                budget: budget,
                duration: duration,
                budget_flexibility: budgetFlexibility,
                accommodation_preference: accommodationPreference,
                travel_style: travelStyle,
                adults: adults,
                children: children,
                requirements: requirements
            })
        })
        .then(response => response.json())
        .then(data => {
            // Process the received destinations
            displayDestinations(data.destinations);
            
            // Hide loading indicator and show destinations section
            loadingElement.style.display = 'none';
            destinationsSection.style.display = 'block';
            
            // Scroll to destinations section
            destinationsSection.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error:', error);
            // For development/demo, show mock data instead
            loadingElement.style.display = 'none';
            displayMockDestinations();
        });
    });
    
    // Function to display destinations
    function displayDestinations(destinations) {
        destinationsList.innerHTML = '';
        
        if (!destinations || destinations.length === 0) {
            destinationsList.innerHTML = '<p>No destinations found matching your criteria. Please try different preferences.</p>';
            return;
        }
        
        destinations.forEach(destination => {
            const card = document.createElement('div');
            card.className = 'destination-card';
            
            // Format match score as percentage
            const matchScore = Math.round(destination.similarity_score * 100);
            
            // Create a map of destination IDs to icon classes for better representation
            const destinationIcons = {
                'paris': 'fa-monument',
                'tokyo': 'fa-torii-gate',
                'new-york': 'fa-city',
                'rome': 'fa-archway',
                'bali': 'fa-umbrella-beach',
                'dubai': 'fa-building',
                'london': 'fa-landmark',
                'sydney': 'fa-water',
                'bangkok': 'fa-temple-buddhist',
                'delhi': 'fa-gopuram',
                'mumbai': 'fa-archway',
                'goa': 'fa-umbrella-beach'
            };
            
            const iconClass = destinationIcons[destination.id] || 'fa-map-marked-alt';
            
            // Generate tags from destination data
            const tags = generateDestinationTags(destination);
            
            card.innerHTML = `
                <div class="destination-image">
                    <i class="fas ${iconClass} destination-icon"></i>
                    <img src="../images/${destination.id}.jpg" alt="${destination.name}" 
                         onerror="this.style.display='none'; this.previousElementSibling.style.display='flex';">
                </div>
                <div class="card-content">
                    <h3>${destination.name}, ${destination.country}</h3>
                    <div class="match-score">${matchScore}% Match</div>
                    <div class="destination-tags">${tags}</div>
                    <div class="daily-cost">Est. Daily Cost: ₹${Math.round(destination.estimated_daily_cost)}</div>
                    <button class="select-btn" data-id="${destination.id}">Create Itinerary</button>
                </div>
            `;
            
            destinationsList.appendChild(card);
            
            // Add event listener to the button
            card.querySelector('.select-btn').addEventListener('click', function() {
                createItinerary(this.dataset.id);
            });
        });
    }
    
    // Function to generate tags for destination
    function generateDestinationTags(destination) {
        // Create dummy tags based on destination and similarity score
        const possibleTags = [
            'Popular', 'Budget-friendly', 'Luxury', 'Family-friendly', 
            'Romantic', 'Adventure', 'Cultural', 'Beach', 'Mountain',
            'Historical', 'Urban', 'Food', 'Nightlife', 'Shopping',
            'Nature', 'Relaxation', 'Spiritual'
        ];
        
        // Select 2-4 random tags based on destination ID to make it seem personalized
        const numTags = 2 + Math.floor(Math.random() * 3);
        const tagIndices = [];
        
        // Use the destination ID as a seed for the random selection
        const seed = destination.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        
        for (let i = 0; i < numTags; i++) {
            const randomIndex = (seed + i * 17) % possibleTags.length;
            if (!tagIndices.includes(randomIndex)) {
                tagIndices.push(randomIndex);
            }
        }
        
        // Build the tags HTML
        return tagIndices.map(index => 
            `<span class="destination-tag">${possibleTags[index]}</span>`
        ).join('');
    }
    
    // Function to create itinerary
    function createItinerary(destinationId) {
        // Show loading indicator and hide other sections
        loadingElement.style.display = 'block';
        itinerarySection.style.display = 'none';
        
        // Get form values
        const interestCheckboxes = document.querySelectorAll('input[name="interests"]:checked');
        const interests = Array.from(interestCheckboxes).map(checkbox => checkbox.value);
        const budget = document.getElementById('budget').value;
        const duration = document.getElementById('duration').value;
        const startDate = document.getElementById('start-date').value;
        const budgetFlexibility = document.getElementById('budget-flexibility').value;
        const accommodationPreference = document.getElementById('accommodation-preference').value;
        const travelStyle = document.getElementById('travel-style').value;
        const adults = document.getElementById('adults').value;
        const children = document.getElementById('children').value;
        
        // Get specific requirements
        const requirementCheckboxes = document.querySelectorAll('input[name="requirements"]:checked');
        const requirements = Array.from(requirementCheckboxes).map(checkbox => checkbox.value);
        
        // Call API to create itinerary
        fetch('/api/create-itinerary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                destination_id: destinationId,
                interests: interests,
                budget: budget,
                duration: duration,
                start_date: startDate,
                budget_flexibility: budgetFlexibility,
                accommodation_preference: accommodationPreference,
                travel_style: travelStyle,
                adults: adults,
                children: children,
                requirements: requirements
            })
        })
        .then(response => response.json())
        .then(data => {
            // Process the received itinerary
            displayItinerary(data);
            
            // Hide loading indicator and show itinerary section
            loadingElement.style.display = 'none';
            itinerarySection.style.display = 'block';
            
            // Scroll to itinerary section
            itinerarySection.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error:', error);
            // For development/demo, show mock itinerary instead
            loadingElement.style.display = 'none';
            displayMockItinerary(destinationId);
        });
    }
    
    // Function to display itinerary
    function displayItinerary(itinerary) {
        // Set itinerary header information
        document.getElementById('itinerary-destination').textContent = `${itinerary.destination.name}, ${itinerary.destination.country}`;
        document.getElementById('itinerary-duration').textContent = `${itinerary.duration} days`;
        document.getElementById('itinerary-dates').textContent = `${formatDateForDisplay(itinerary.start_date)} to ${formatDateForDisplay(itinerary.end_date)}`;
        document.getElementById('itinerary-budget').textContent = `₹${itinerary.total_budget.toLocaleString()}`;
        document.getElementById('itinerary-daily-budget').textContent = `₹${itinerary.daily_budget.toLocaleString()}`;
        
        // Set budget breakdown
        const budgetGrid = document.getElementById('budget-grid');
        budgetGrid.innerHTML = '';
        
        for (const [category, amount] of Object.entries(itinerary.budget_breakdown)) {
            const budgetItem = document.createElement('div');
            budgetItem.className = 'budget-item';
            
            const categoryIcon = getCategoryIcon(category);
            
            budgetItem.innerHTML = `
                <div class="budget-icon"><i class="${categoryIcon}"></i></div>
                <div class="budget-category">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
                <div class="budget-amount">₹${amount.toLocaleString()}</div>
            `;
            
            budgetGrid.appendChild(budgetItem);
        }
        
        // Create accommodation recommendations based on preferences
        let accommodationRecommendation = createAccommodationRecommendation(itinerary);
        
        // Set daily itinerary
        const itineraryList = document.getElementById('itinerary-list');
        itineraryList.innerHTML = '';
        
        // Add accommodation recommendation
        const accommodationSection = document.createElement('div');
        accommodationSection.className = 'accommodation-section';
        accommodationSection.innerHTML = `
            <h3><i class="fas fa-bed"></i> Recommended Accommodation</h3>
            <div class="accommodation-details">${accommodationRecommendation}</div>
        `;
        itineraryList.appendChild(accommodationSection);
        
        // Add daily itinerary items
        itinerary.daily_itinerary.forEach(day => {
            const dayItem = document.createElement('div');
            dayItem.className = 'day-item';
            
            let activitiesList = '';
            
            day.activities.forEach(activity => {
                const icon = getActivityIcon(activity.category);
                const costInfo = activity.cost ? `<span class="activity-cost">₹${activity.cost}</span>` : '';
                const timeInfo = activity.time_required ? `<span class="activity-time">${activity.time_required} hrs</span>` : '';
                
                activitiesList += `
                    <div class="activity-item">
                        <div class="activity-icon"><i class="${icon}"></i></div>
                        <div class="activity-details">
                            <div class="activity-name">${activity.name}</div>
                            <div class="activity-meta">${activity.category} ${timeInfo} ${costInfo}</div>
                        </div>
                    </div>
                `;
            });
            
            dayItem.innerHTML = `
                <div class="day-header">
                    <h3>Day ${day.day} - ${formatDateForDisplay(day.date)}</h3>
                </div>
                <div class="activities-list">
                    ${activitiesList}
                </div>
            `;
            
            itineraryList.appendChild(dayItem);
        });
        
        // Add transportation suggestions
        const transportationSection = document.createElement('div');
        transportationSection.className = 'transportation-section';
        transportationSection.innerHTML = `
            <h3><i class="fas fa-car"></i> Transportation Tips</h3>
            <div class="transportation-details">
                <p>${createTransportationRecommendation(itinerary)}</p>
            </div>
        `;
        itineraryList.appendChild(transportationSection);
        
        // Set up event handlers for action buttons
        setupActionButtons(itinerary);
    }
    
    // Function to set up event handlers for action buttons
    function setupActionButtons(itinerary) {
        const downloadBtn = document.getElementById('download-btn');
        const shareBtn = document.getElementById('share-btn');
        const modifyBtn = document.getElementById('modify-btn');
        
        // Download button - generate PDF or JSON download
        downloadBtn.addEventListener('click', function() {
            // For now, we'll just create a JSON download
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(itinerary, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", `itinerary-${itinerary.destination.name.toLowerCase()}.json`);
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        });
        
        // Share button - copy link or use Web Share API if available
        shareBtn.addEventListener('click', function() {
            // Use Web Share API if available
            if (navigator.share) {
                navigator.share({
                    title: `${itinerary.duration} days in ${itinerary.destination.name}`,
                    text: `Check out my ${itinerary.duration}-day itinerary for ${itinerary.destination.name}!`,
                    url: window.location.href,
                })
                .catch(error => {
                    console.log('Error sharing:', error);
                    alert('Your itinerary link has been copied to clipboard!');
                });
            } else {
                // Fallback - copy current URL to clipboard
                navigator.clipboard.writeText(window.location.href)
                    .then(() => {
                        alert('Your itinerary link has been copied to clipboard!');
                    })
                    .catch(err => {
                        console.error('Failed to copy: ', err);
                    });
            }
        });
        
        // Modify button - scroll back to form to make changes
        modifyBtn.addEventListener('click', function() {
            // Show the form section and scroll to it
            document.getElementById('planner-form-section').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Function to get category icon for budget breakdown
    function getCategoryIcon(category) {
        const icons = {
            'accommodation': 'fas fa-bed',
            'transportation': 'fas fa-car',
            'food': 'fas fa-utensils',
            'attractions': 'fas fa-ticket-alt',
            'shopping': 'fas fa-shopping-bag'
        };
        
        return icons[category] || 'fas fa-money-bill';
    }
    
    // Function to create accommodation recommendation based on preferences
    function createAccommodationRecommendation(itinerary) {
        const accommodation = itinerary.query_info?.accommodation || 'mid-range';
        const travelers = itinerary.query_info?.travelers || { adults: 1, children: 0 };
        const destination = itinerary.destination.name;
        
        let recommendation = '';
        let accommodationType = '';
        let priceRange = '';
        let specialNote = '';
        
        switch (accommodation) {
            case 'budget':
                accommodationType = 'Hostels or Budget Hotels';
                priceRange = `₹${Math.round(itinerary.budget_breakdown.accommodation * 0.7 / itinerary.duration)} per night`;
                specialNote = 'Focus on clean, basic accommodation in central locations';
                break;
            case 'mid-range':
                accommodationType = '3-Star Hotels';
                priceRange = `₹${Math.round(itinerary.budget_breakdown.accommodation * 0.9 / itinerary.duration)} per night`;
                specialNote = 'Good balance of comfort and value in well-located areas';
                break;
            case 'luxury':
                accommodationType = '4-5 Star Hotels';
                priceRange = `₹${Math.round(itinerary.budget_breakdown.accommodation * 1.0 / itinerary.duration)} per night`;
                specialNote = 'High-end accommodations with excellent amenities';
                break;
            case 'ultra_luxury':
                accommodationType = 'Luxury Resorts or Boutique Hotels';
                priceRange = `₹${Math.round(itinerary.budget_breakdown.accommodation * 1.2 / itinerary.duration)} per night`;
                specialNote = 'Premium experiences with personalized service';
                break;
            default:
                accommodationType = '3-Star Hotels';
                priceRange = `₹${Math.round(itinerary.budget_breakdown.accommodation * 0.9 / itinerary.duration)} per night`;
                specialNote = 'Good balance of comfort and value';
        }
        
        // Adjust for family needs
        let roomRecommendation = '';
        if (travelers.adults > 1 || travelers.children > 0) {
            if (travelers.adults + travelers.children > 3) {
                roomRecommendation = 'Consider booking multiple rooms or a family suite';
            } else {
                roomRecommendation = 'A standard family room should be sufficient';
            }
        } else {
            roomRecommendation = 'A standard double room will be comfortable';
        }
        
        recommendation = `
            <div class="accommodation-item">
                <p><strong>Recommended:</strong> ${accommodationType} in ${destination}</p>
                <p><strong>Estimated Price Range:</strong> ${priceRange}</p>
                <p><strong>Room Type:</strong> ${roomRecommendation}</p>
                <p><strong>Tip:</strong> ${specialNote}</p>
            </div>
        `;
        
        return recommendation;
    }
    
    // Function to create transportation recommendation
    function createTransportationRecommendation(itinerary) {
        const destination = itinerary.destination.name;
        const destinationId = itinerary.destination.id;
        const budget = itinerary.total_budget;
        
        // Maps destinations to transportation recommendations
        const transportRecommendations = {
            'paris': 'The Paris Metro is excellent for getting around the city. Consider purchasing a Paris Visite pass for unlimited travel.',
            'tokyo': 'Tokyo\'s train and subway system is efficient but complex. Consider getting a Suica or Pasmo card for easy access.',
            'new-york': 'New York\'s subway system is the most efficient way to get around. Consider getting a 7-day MetroCard.',
            'rome': 'Rome has good public transportation, but many attractions are within walking distance of each other.',
            'bali': 'Consider hiring a private driver for day trips, or rent a scooter if you\'re comfortable riding one.',
            'dubai': 'Dubai has limited public transportation. Taxis or ride-sharing services are recommended.',
            'london': 'London\'s Underground (Tube) is comprehensive. Consider getting an Oyster card for convenient travel.',
            'sydney': 'Sydney has good buses and trains. Consider getting an Opal card for public transportation.',
            'bangkok': 'Use a mix of BTS Skytrain, MRT subway, and occasional taxis or tuk-tuks for hard-to-reach spots.',
            'delhi': 'Delhi Metro is reliable and reaches most tourist spots. For shorter trips, auto-rickshaws are affordable.',
            'mumbai': 'Local trains are Mumbai\'s lifeline but can be very crowded. Consider using ride-sharing services.',
            'goa': 'Rent a scooter or motorbike to explore Goa at your own pace. Taxis are also widely available.'
        };
        
        return transportRecommendations[destinationId] || 
               `${destination} has various transportation options including public transport and taxis. Research local options before your trip.`;
    }
    
    // Helper function to get icon class based on activity category
    function getActivityIcon(category) {
        const iconMap = {
            'sightseeing': 'fas fa-camera',
            'museums': 'fas fa-landmark',
            'historical': 'fas fa-monument',
            'food': 'fas fa-utensils',
            'shopping': 'fas fa-shopping-bag',
            'nature': 'fas fa-leaf',
            'adventure': 'fas fa-hiking',
            'relaxation': 'fas fa-spa',
            'cultural': 'fas fa-theater-masks',
            'nightlife': 'fas fa-cocktail',
            'beach': 'fas fa-umbrella-beach',
            'photography': 'fas fa-camera-retro',
            'wildlife': 'fas fa-paw',
            'architecture': 'fas fa-archway',
            'yoga': 'fas fa-om',
            'water-sports': 'fas fa-water'
        };
        
        return iconMap[category] || 'fas fa-map-marker-alt';
    }
    
    // Helper function to format date
    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    
    // Helper function to format date display
    function formatDateForDisplay(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }
    
    // Mock data for development/demo purposes
    function displayMockDestinations() {
        // Get form values
        const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value);
        const budget = parseInt(document.getElementById('budget').value);
        const accommodation = document.getElementById('accommodation-preference').value;
        
        // Adjust mock data based on user inputs
        let costFactor = 1.0;
        if (accommodation === 'budget') costFactor = 0.7;
        if (accommodation === 'luxury') costFactor = 1.5;
        if (accommodation === 'ultra-luxury') costFactor = 2.5;
        
        const mockDestinations = [
            {
                id: "paris",
                name: "Paris",
                country: "France",
                similarity_score: 0.92,
                cost_factor: 0.9 * costFactor,
                estimated_daily_cost: 6428 * costFactor
            },
            {
                id: "rome",
                name: "Rome",
                country: "Italy",
                similarity_score: 0.85,
                cost_factor: 0.8 * costFactor,
                estimated_daily_cost: 5714 * costFactor
            },
            {
                id: "tokyo",
                name: "Tokyo",
                country: "Japan",
                similarity_score: 0.78,
                cost_factor: 0.85 * costFactor,
                estimated_daily_cost: 6071 * costFactor
            },
            {
                id: "delhi",
                name: "Delhi",
                country: "India",
                similarity_score: 0.76,
                cost_factor: 0.3 * costFactor,
                estimated_daily_cost: 2142 * costFactor
            },
            {
                id: "new-york",
                name: "New York",
                country: "USA",
                similarity_score: 0.75,
                cost_factor: 1.0 * costFactor,
                estimated_daily_cost: 7142 * costFactor
            }
        ];
        
        // If historical is selected, boost Rome's score
        if (interests.includes('historical')) {
            const rome = mockDestinations.find(d => d.id === 'rome');
            if (rome) rome.similarity_score = Math.min(0.98, rome.similarity_score + 0.15);
        }
        
        // If shopping is selected, boost Dubai's score and add it if not present
        if (interests.includes('shopping')) {
            const dubai = mockDestinations.find(d => d.id === 'dubai');
            if (dubai) {
                dubai.similarity_score = Math.min(0.95, dubai.similarity_score + 0.2);
            } else {
                mockDestinations.push({
                    id: "dubai",
                    name: "Dubai",
                    country: "UAE",
                    similarity_score: 0.88,
                    cost_factor: 0.95 * costFactor,
                    estimated_daily_cost: 6785 * costFactor
                });
            }
        }
        
        // If relaxation is selected, boost Bali's score and add it
        if (interests.includes('relaxation')) {
            const bali = mockDestinations.find(d => d.id === 'bali');
            if (bali) {
                bali.similarity_score = Math.min(0.97, bali.similarity_score + 0.2);
            } else {
                mockDestinations.push({
                    id: "bali",
                    name: "Bali",
                    country: "Indonesia",
                    similarity_score: 0.90,
                    cost_factor: 0.5 * costFactor,
                    estimated_daily_cost: 3571 * costFactor
                });
            }
        }
        
        // Sort by similarity score
        mockDestinations.sort((a, b) => b.similarity_score - a.similarity_score);
        
        // Take top 5
        const topDestinations = mockDestinations.slice(0, 5);
        
        destinationsSection.style.display = 'block';
        displayDestinations(topDestinations);
        
        // Scroll to destinations section
        destinationsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    function displayMockItinerary(destinationId) {
        // Create a mock itinerary based on the selected destination ID
        const destinations = {
            "paris": {
                name: "Paris",
                country: "France"
            },
            "rome": {
                name: "Rome",
                country: "Italy"
            },
            "tokyo": {
                name: "Tokyo",
                country: "Japan"
            },
            "delhi": {
                name: "Delhi",
                country: "India"
            },
            "new-york": {
                name: "New York",
                country: "USA"
            },
            "bali": {
                name: "Bali",
                country: "Indonesia"
            },
            "dubai": {
                name: "Dubai",
                country: "UAE"
            }
        };
        
        const destination = destinations[destinationId] || { name: "Unknown", country: "" };
        const duration = parseInt(document.getElementById('duration').value);
        const startDate = document.getElementById('start-date').value;
        const budget = parseInt(document.getElementById('budget').value);
        const accommodation = document.getElementById('accommodation-preference').value;
        const travelStyle = document.getElementById('travel-style').value;
        
        // Adjust budget breakdown based on accommodation preference
        let accommPercent = 0.4; // Default for mid-range
        if (accommodation === 'budget') accommPercent = 0.3;
        if (accommodation === 'luxury') accommPercent = 0.5;
        if (accommodation === 'ultra-luxury') accommPercent = 0.6;
        
        // Adjust activities based on travel style
        let activitiesPerDay = 2; // Default for balanced
        if (travelStyle === 'slow') activitiesPerDay = 1;
        if (travelStyle === 'fast') activitiesPerDay = 3;
        
        // Calculate end date
        const endDateObj = new Date(startDate);
        endDateObj.setDate(endDateObj.getDate() + duration - 1);
        const endDate = endDateObj.toISOString().split('T')[0];
        
        // Create budget breakdown
        const budgetBreakdown = {
            "accommodation": Math.round(budget * accommPercent),
            "transportation": Math.round(budget * 0.2),
            "food": Math.round(budget * 0.2),
            "attractions": Math.round(budget * 0.15),
            "shopping": Math.round(budget * 0.05)
        };
        
        // Destination-specific activities
        const destinationActivities = {
            "paris": [
                { name: "Eiffel Tower", type: "attraction", category: "sightseeing", time_required: 2, cost: 25 },
                { name: "Louvre Museum", type: "attraction", category: "museums", time_required: 4, cost: 15 },
                { name: "Notre-Dame Cathedral", type: "attraction", category: "historical", time_required: 1.5, cost: 0 },
                { name: "Seine River Cruise", type: "attraction", category: "relaxation", time_required: 1, cost: 30 }
            ],
            "rome": [
                { name: "Colosseum", type: "attraction", category: "historical", time_required: 3, cost: 16 },
                { name: "Vatican Museums", type: "attraction", category: "museums", time_required: 4, cost: 17 },
                { name: "Roman Forum", type: "attraction", category: "historical", time_required: 2, cost: 16 },
                { name: "Trevi Fountain", type: "attraction", category: "sightseeing", time_required: 1, cost: 0 }
            ],
            "delhi": [
                { name: "Red Fort", type: "attraction", category: "historical", time_required: 2, cost: 10 },
                { name: "Qutub Minar", type: "attraction", category: "historical", time_required: 1.5, cost: 7 },
                { name: "India Gate", type: "attraction", category: "sightseeing", time_required: 1, cost: 0 },
                { name: "Chandni Chowk Market", type: "attraction", category: "shopping", time_required: 3, cost: 0 }
            ],
            "bali": [
                { name: "Ubud Monkey Forest", type: "attraction", category: "nature", time_required: 2, cost: 15 },
                { name: "Tegallalang Rice Terraces", type: "attraction", category: "sightseeing", time_required: 2, cost: 5 },
                { name: "Uluwatu Temple", type: "attraction", category: "spiritual", time_required: 2, cost: 10 },
                { name: "Kuta Beach", type: "attraction", category: "beach", time_required: 3, cost: 0 }
            ],
            "dubai": [
                { name: "Burj Khalifa", type: "attraction", category: "sightseeing", time_required: 2, cost: 40 },
                { name: "Dubai Mall", type: "attraction", category: "shopping", time_required: 4, cost: 0 },
                { name: "Palm Jumeirah", type: "attraction", category: "sightseeing", time_required: 3, cost: 20 },
                { name: "Desert Safari", type: "attraction", category: "adventure", time_required: 6, cost: 60 }
            ]
        };
        
        // General activities
        const generalActivities = [
            { name: "City Tour", type: "activity", category: "sightseeing", description: "A guided tour around the city's main attractions" },
            { name: "Food Tasting Tour", type: "activity", category: "food", description: "Explore local cuisine through a guided food tour" },
            { name: "Cultural Performance", type: "activity", category: "cultural", description: "Attend a local cultural performance or show" },
            { name: "Shopping Trip", type: "activity", category: "shopping", description: "Visit to local markets or shopping districts" },
            { name: "Spa & Wellness Day", type: "activity", category: "relaxation", description: "Enjoy a day of relaxation and rejuvenation" },
            { name: "Photography Walk", type: "activity", category: "photography", description: "Explore photogenic spots with a local guide" }
        ];
        
        // Create daily itinerary
        const dailyItinerary = [];
        const destActivities = destinationActivities[destinationId] || [];
        
        for (let day = 1; day <= duration; day++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + day - 1);
            const currentDateStr = currentDate.toISOString().split('T')[0];
            
            // Create activities for the day
            const activities = [];
            
            // Add destination-specific attractions
            for (let i = 0; i < activitiesPerDay && (day-1) * activitiesPerDay + i < destActivities.length; i++) {
                activities.push(destActivities[(day-1) * activitiesPerDay + i]);
            }
            
            // Add a general activity
            if (day <= generalActivities.length) {
                activities.push(generalActivities[day-1]);
            }
            
            dailyItinerary.push({
                day: day,
                date: currentDateStr,
                activities: activities
            });
        }
        
        const mockItinerary = {
            destination: destination,
            duration: duration,
            start_date: startDate,
            end_date: endDate,
            total_budget: budget,
            daily_budget: Math.round(budget / duration),
            budget_breakdown: budgetBreakdown,
            daily_itinerary: dailyItinerary
        };
        
        itinerarySection.style.display = 'block';
        displayItinerary(mockItinerary);
        
        // Scroll to itinerary section
        itinerarySection.scrollIntoView({ behavior: 'smooth' });
    }
}); 