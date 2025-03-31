// Indian Cities Data
const indianCities = [
    "Mumbai, Maharashtra",
    "Delhi, NCR",
    "Bangalore, Karnataka",
    "Hyderabad, Telangana",
    "Chennai, Tamil Nadu",
    "Kolkata, West Bengal",
    "Pune, Maharashtra",
    "Ahmedabad, Gujarat",
    "Jaipur, Rajasthan",
    "Lucknow, Uttar Pradesh",
    "Chandigarh, Punjab",
    "Kochi, Kerala",
    "Goa, Panaji",
    "Varanasi, Uttar Pradesh",
    "Amritsar, Punjab",
    "Bhubaneswar, Odisha",
    "Indore, Madhya Pradesh",
    "Udaipur, Rajasthan",
    "Agra, Uttar Pradesh",
    "Shimla, Himachal Pradesh"
];

// Indian Hotels Data
const indianHotels = {
    "Mumbai": ["Taj Mahal Palace", "The Oberoi", "ITC Grand Central", "Leela Palace", "JW Marriott Juhu"],
    "Delhi": ["The Imperial", "Taj Palace", "ITC Maurya", "The Lodhi", "Roseate House"],
    "Bangalore": ["The Leela Palace", "ITC Windsor", "Taj West End", "The Oberoi", "JW Marriott"],
    "Hyderabad": ["Taj Falaknuma Palace", "ITC Kohenur", "Park Hyatt", "Trident", "Novotel"],
    "Chennai": ["ITC Grand Chola", "The Leela Palace", "Taj Coromandel", "The Park", "Crowne Plaza"],
    "Kolkata": ["The Oberoi Grand", "ITC Royal Bengal", "Taj Bengal", "The Park", "JW Marriott"],
    "Jaipur": ["Rambagh Palace", "Jai Mahal Palace", "ITC Rajputana", "The Oberoi Rajvilas", "The Lalit"],
    "Goa": ["Taj Fort Aguada", "The Leela", "ITC Grand", "Park Hyatt", "W Goa"],
    "Udaipur": ["Taj Lake Palace", "The Oberoi Udaivilas", "Leela Palace", "Trident", "The Lalit Laxmi Vilas"],
    "Agra": ["The Oberoi Amarvilas", "ITC Mughal", "Taj Hotel & Convention Centre", "Courtyard by Marriott", "Crystal Sarovar"]
};

// Indian Transportation Companies
const transportCompanies = {
    'flight': [
        'Air India',
        'IndiGo',
        'SpiceJet',
        'Vistara',
        'Go First',
        'AirAsia India'
    ],
    'train': [
        'Rajdhani Express',
        'Shatabdi Express',
        'Duronto Express',
        'Tejas Express',
        'Vande Bharat Express'
    ],
    'bus': [
        'KSRTC',
        'MSRTC',
        'UPSRTC',
        'GSRTC',
        'RSRTC',
        'DTC'
    ]
};

// Routes for different transport options
const transportRoutes = {
    'bus': {
        'Delhi': ['Manali', 'Udaipur', 'Mumbai', 'Bangalore', 'Chennai'],
        'Mumbai': ['Pune', 'Goa', 'Delhi', 'Bangalore', 'Chennai'],
        'Bangalore': ['Chennai', 'Mysore', 'Mumbai', 'Delhi'],
        'Chennai': ['Bangalore', 'Mumbai', 'Delhi'],
        'Pune': ['Mumbai', 'Bangalore'],
        'Goa': ['Mumbai', 'Bangalore'],
        'Manali': ['Delhi'],
        'Udaipur': ['Delhi'],
        'Mysore': ['Bangalore']
    },
    'flight': {
        'Mumbai': ['Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'],
        'Delhi': ['Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'],
        'Bangalore': ['Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Hyderabad'],
        'Chennai': ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Hyderabad'],
        'Kolkata': ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'],
        'Hyderabad': ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata']
    },
    'train': {
        'Mumbai': ['Delhi', 'Pune', 'Ahmedabad', 'Bangalore', 'Kolkata'],
        'Delhi': ['Mumbai', 'Agra', 'Jaipur', 'Lucknow', 'Amritsar'],
        'Bangalore': ['Mumbai', 'Chennai', 'Hyderabad', 'Kochi', 'Pune'],
        'Chennai': ['Bangalore', 'Hyderabad', 'Kochi', 'Mumbai', 'Kolkata'],
        'Kolkata': ['Delhi', 'Mumbai', 'Chennai', 'Bhubaneswar', 'Guwahati']
    },
    'hotel': {
        // ... existing hotel locations
    }
};

// Bus routes with specific details for each city pair
const busRoutes = {
    'delhi-manali': [
        {
            type: 'Volvo AC Sleeper',
            departure: '9:00 PM',
            arrival: '9:00 AM',
            price: 1200,
            boarding: 'ISBT Kashmere Gate',
            model: 'Volvo Multi-Axle',
            duration: '12 hours',
            facilities: ['AC', 'Sleeper', 'WiFi', 'Charging Point', 'Entertainment']
        },
        {
            type: 'AC Seater',
            departure: '8:30 PM',
            arrival: '8:30 AM',
            price: 800,
            boarding: 'Majnu Ka Tilla',
            model: 'Scania Premium',
            duration: '12 hours',
            facilities: ['AC', 'Reclining Seats', 'WiFi', 'Charging Point']
        }
    ],
    'delhi-udaipur': [
        {
            type: 'Volvo AC Sleeper',
            departure: '7:00 PM',
            arrival: '8:00 AM',
            price: 1500,
            boarding: 'ISBT Kashmere Gate',
            model: 'Volvo 9400',
            duration: '13 hours',
            facilities: ['AC', 'Sleeper', 'WiFi', 'Charging Point', 'Entertainment', 'Blanket']
        },
        {
            type: 'Semi Sleeper AC',
            departure: '6:30 PM',
            arrival: '7:30 AM',
            price: 1100,
            boarding: 'Dhaula Kuan',
            model: 'Mercedes-Benz',
            duration: '13 hours',
            facilities: ['AC', 'Semi Sleeper', 'WiFi', 'Water Bottle']
        }
    ],
    'mumbai-pune': [
        {
            type: 'AC Luxury',
            departure: '6:00 AM',
            arrival: '9:00 AM',
            price: 450,
            boarding: 'Dadar',
            model: 'Volvo 8400',
            duration: '3 hours',
            facilities: ['AC', 'Comfortable Seats', 'WiFi', 'Water Bottle']
        },
        {
            type: 'Express AC',
            departure: '7:00 AM',
            arrival: '10:00 AM',
            price: 350,
            boarding: 'Borivali',
            model: 'Ashok Leyland',
            duration: '3 hours',
            facilities: ['AC', 'Regular Seats', 'Water Bottle']
        }
    ],
    'mumbai-goa': [
        {
            type: 'Luxury Sleeper',
            departure: '8:00 PM',
            arrival: '8:00 AM',
            price: 1800,
            boarding: 'Dadar West',
            model: 'Volvo 9400',
            duration: '12 hours',
            facilities: ['AC', 'Sleeper', 'WiFi', 'Entertainment', 'Snacks', 'Blanket']
        },
        {
            type: 'AC Sleeper',
            departure: '9:00 PM',
            arrival: '9:00 AM',
            price: 1500,
            boarding: 'Andheri East',
            model: 'Scania Premium',
            duration: '12 hours',
            facilities: ['AC', 'Sleeper', 'WiFi', 'Charging Point']
        }
    ],
    'bangalore-chennai': [
        {
            type: 'Premium AC',
            departure: '10:00 PM',
            arrival: '4:00 AM',
            price: 800,
            boarding: 'Majestic',
            model: 'Volvo 9400',
            duration: '6 hours',
            facilities: ['AC', 'Reclining Seats', 'WiFi', 'USB Charging']
        },
        {
            type: 'Regular AC',
            departure: '11:00 PM',
            arrival: '5:00 AM',
            price: 600,
            boarding: 'Electronic City',
            model: 'Mercedes-Benz',
            duration: '6 hours',
            facilities: ['AC', 'Seater', 'Water Bottle']
        }
    ],
    'bangalore-mysore': [
        {
            type: 'AC Luxury',
            departure: '8:00 AM',
            arrival: '11:00 AM',
            price: 300,
            boarding: 'Majestic',
            model: 'Volvo City Bus',
            duration: '3 hours',
            facilities: ['AC', 'Comfortable Seats', 'WiFi']
        },
        {
            type: 'Express AC',
            departure: '9:00 AM',
            arrival: '12:00 PM',
            price: 250,
            boarding: 'Satellite',
            model: 'Ashok Leyland',
            duration: '3 hours',
            facilities: ['AC', 'Regular Seats']
        }
    ]
};

// City coordinates for the map
const cityCoordinates = {
    'Delhi': [28.6139, 77.2090],
    'Mumbai': [19.0760, 72.8777],
    'Bangalore': [12.9716, 77.5946],
    'Chennai': [13.0827, 80.2707],
    'Kolkata': [22.5726, 88.3639],
    'Hyderabad': [17.3850, 78.4867],
    'Pune': [18.5204, 73.8567],
    'Goa': [15.2993, 74.1240],
    'Udaipur': [24.5854, 73.7125],
    'Manali': [32.2432, 77.1892],
    'Mysore': [12.2958, 76.6394],
    'Ahmedabad': [23.0225, 72.5714],
    'Jaipur': [26.9124, 75.7873],
    'Lucknow': [26.8467, 80.9462],
    'Chandigarh': [30.7333, 76.7794]
};

// Initialize map variables
let map = null;
let markers = [];
let routeLine = null;

// Initialize map
function initializeMap() {
    if (!map) {
        map = L.map('map').setView([20.5937, 78.9629], 5); // Center of India
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    }
}

// Update map view with route
function updateMapView() {
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    
    if (!fromSelect || !toSelect || !fromSelect.value || !toSelect.value) {
        console.log('Selections not complete');
        return;
    }

    const fromCoords = cityCoordinates[fromSelect.value];
    const toCoords = cityCoordinates[toSelect.value];

    console.log('Updating map with coordinates:', {
        from: fromSelect.value,
        to: toSelect.value,
        fromCoords,
        toCoords
    });

    if (!fromCoords || !toCoords) {
        console.error('Could not find coordinates for selected cities');
        return;
    }

    // Initialize map if not already done
    if (!map) {
        initializeMap();
    }

    // Clear existing markers and route
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    if (routeLine) {
        map.removeLayer(routeLine);
    }

    // Add markers for source and destination
    const fromMarker = L.marker(fromCoords)
        .bindPopup(`From: ${fromSelect.value}`)
        .addTo(map);
    const toMarker = L.marker(toCoords)
        .bindPopup(`To: ${toSelect.value}`)
        .addTo(map);
    
    markers.push(fromMarker, toMarker);

    // Draw route line
    routeLine = L.polyline([fromCoords, toCoords], {
        color: '#3498db',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10'
    }).addTo(map);

    // Fit map to show the entire route
    const bounds = L.latLngBounds([fromCoords, toCoords]);
    map.fitBounds(bounds, {
        padding: [50, 50]
    });
}

// Function to toggle map visibility
function toggleMap() {
    const mapContainer = document.getElementById('map-container');
    mapContainer.classList.toggle('visible');
    
    if (mapContainer.classList.contains('visible')) {
        if (!map) {
            initializeMap();
        }
        setTimeout(() => {
            map.invalidateSize();
            updateMapView();
        }, 100);
    }
}

// Populate the from dropdown on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Populating departure cities...');
    const fromSelect = document.getElementById('from');
    
    if (fromSelect) {
        // Clear any existing options except the placeholder
        while (fromSelect.options.length > 1) {
            fromSelect.remove(1);
        }
        
        // Get all cities with coordinates for the map
        const cities = Object.keys(cityCoordinates);
        
        // Add cities to the dropdown
        cities.sort().forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            fromSelect.appendChild(option);
        });
        
        console.log(`Populated ${cities.length} cities in the departure dropdown`);
        
        // Add change event listener to populate destinations
        fromSelect.addEventListener('change', function() {
            console.log('From city changed to:', this.value);
            updateDestinationOptions(this.value);
        });
    }
    
    // Check URL parameters for pre-filled values
    checkUrlParameters();
});

// Function to update destination options based on selected departure city
function updateDestinationOptions(fromCity) {
    console.log(`Updating destinations for ${fromCity}`);
    
    const toSelect = document.getElementById('to');
    if (!toSelect) {
        console.error('Destination dropdown not found');
        return;
    }
    
    // Clear existing options
    while (toSelect.options.length > 0) {
        toSelect.remove(0);
    }
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Destination City';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    toSelect.appendChild(defaultOption);
    
    // Get available destinations - all cities except the departure city
    const allCities = Object.keys(cityCoordinates);
    const destinations = allCities.filter(city => city !== fromCity);
    
    // Sort destinations alphabetically
    destinations.sort();
    
    // Add destinations to dropdown
    destinations.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        toSelect.appendChild(option);
    });
    
    console.log(`Added ${destinations.length} destination options for ${fromCity}`);
    
    // Make sure dropdown is visible
    toSelect.style.display = 'block';
    toSelect.style.visibility = 'visible';
    toSelect.style.opacity = '1';
}

// Check URL parameters for pre-filled values
function checkUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('from') && urlParams.has('to')) {
        const fromCity = urlParams.get('from');
        const toCity = urlParams.get('to');
        
        console.log('URL parameters found:', { fromCity, toCity });
        
        const fromSelect = document.getElementById('from');
        if (fromSelect) {
            fromSelect.value = fromCity;
            fromSelect.dispatchEvent(new Event('change'));
            
            // Wait for destination options to be updated
            setTimeout(() => {
                const toSelect = document.getElementById('to');
                if (toSelect) {
                    toSelect.value = toCity;
                    
                    // Update map with selected cities
                    if (typeof updateMapView === 'function') {
                        updateMapView();
                    }
                }
            }, 300);
        }
    }
}

// Set minimum date to today for all date inputs
function setMinDates() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
        
        // Set default value to today if not already set
        if (!input.value) {
            input.value = today;
        }
    });
}

// Initialize transport tabs
function initializeTransportTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Check for active tab in URL or localStorage
    let activeTab = 'bus'; // Default to bus
    
    // Check URL params first
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('tab')) {
        activeTab = urlParams.get('tab');
    } 
    // Then check localStorage
    else if (localStorage.getItem('activeTransportTab')) {
        activeTab = localStorage.getItem('activeTransportTab');
    }
    
    console.log(`Initializing tabs with active tab: ${activeTab}`);
    
    // Set active tab
    tabButtons.forEach(button => {
        const tabType = button.getAttribute('data-tab');
        if (tabType === activeTab) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
        
        // Add click event listener
        button.addEventListener('click', function() {
            const tabType = this.getAttribute('data-tab');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update tab content
            tabContents.forEach(content => {
                if (content.getAttribute('data-tab') === tabType) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
            
            // Store active tab
            localStorage.setItem('activeTransportTab', tabType);
            
            // Update dropdowns based on new transport type
            const fromSelect = document.getElementById('from');
            if (fromSelect && fromSelect.value) {
                updateDestinationOptions(fromSelect.value, tabType);
            }
        });
    });
    
    // Show active tab content
    tabContents.forEach(content => {
        if (content.getAttribute('data-tab') === activeTab) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    // Initialize dropdowns for active tab
    initializeDropdowns(activeTab);
    
    return activeTab;
}

// Set up search form submission
function setupSearchForm() {
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const resultsContainer = document.querySelector('.results-container');
            if (resultsContainer) {
                resultsContainer.innerHTML = '<div class="loading">Searching for the best options...</div>';
                
                // Simulate API call with timeout
                setTimeout(() => {
                    // Process form data and update results
                    updateSearchResults();
                }, 1500);
            }
        });
    }
    
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('from') && urlParams.has('to')) {
        // Fill form with URL parameters
        fillFormFromUrlParams(urlParams);
        
        // Trigger search
        if (searchForm) {
            searchForm.dispatchEvent(new Event('submit'));
        }
    }
}

// Fill form fields from URL parameters
function fillFormFromUrlParams(params) {
    if (params.has('from')) {
        const fromSelect = document.getElementById('from');
        if (fromSelect) fromSelect.value = params.get('from');
    }
    
    if (params.has('to')) {
        const toSelect = document.getElementById('to');
        if (toSelect) toSelect.value = params.get('to');
    }
    
    if (params.has('depart')) {
        const dateInput = document.getElementById('date');
        if (dateInput) dateInput.value = params.get('depart');
    }
    
    if (params.has('passengers')) {
        const passengersSelect = document.getElementById('passengers');
        if (passengersSelect) passengersSelect.value = params.get('passengers');
    }
}

// Set up filtering functionality
function setupFilters() {
    const filterSelects = document.querySelectorAll('.filter-group select');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            filterResults();
        });
    });
}

// Filter results based on current filters
function filterResults() {
    // Get filter values
    const sortBy = document.getElementById('sort-by')?.value || 'price';
    const priceRange = document.getElementById('price-range')?.value || 'all';
    
    // Get all result cards
    const resultCards = document.querySelectorAll('.result-card');
    
    // Filter by price range
    resultCards.forEach(card => {
        const priceElement = card.querySelector('.amount');
        if (!priceElement) return;
        
        const price = parseFloat(priceElement.textContent.replace(/[^0-9.]/g, ''));
        card.setAttribute('data-price', price);
        
        // Show/hide based on price range
        let visible = true;
        
        if (priceRange !== 'all') {
            const [min, max] = priceRange.split('-').map(val => parseFloat(val) || 0);
            if (max) {
                visible = price >= min && price <= max;
            } else {
                visible = price >= min;
            }
        }
        
        card.style.display = visible ? 'block' : 'none';
    });
    
    // Sort visible cards
    sortResults(sortBy);
    
    // Check if no results are visible
    checkNoResults();
}

// Update search results based on form data
function updateSearchResults() {
    const from = document.getElementById('from')?.value;
    const to = document.getElementById('to')?.value;
    const date = document.getElementById('date')?.value;
    const passengers = parseInt(document.getElementById('passengers')?.value || '1');

    // Get current active transport mode
    const activeTab = document.querySelector('.tab-btn.active');
    const activeMode = activeTab ? activeTab.getAttribute('data-mode') : 'flight';
    
    // Get sample data for the active mode
    let results = transportData[activeMode] || [];

    // Update prices based on number of passengers
    results = results.map(result => {
        return {
            ...result,
            totalPrice: result.price * passengers
        };
    });

    // Display the results
    displayResults(results);
    
    // Apply any active filters
    filterResults();
}

// Sample data for different transport modes with Indian prices
const transportData = {
    flight: [
        {
            company: 'Air India',
            number: 'AI 203',
            departure: { time: '09:30', city: 'Mumbai', terminal: 'Terminal 2' },
            arrival: { time: '11:50', city: 'Delhi', terminal: 'Terminal 3' },
            duration: '2h 20m',
            stops: 'Direct',
            amenities: ['WiFi', 'Meals', 'Entertainment'],
            vehicle: 'Airbus A320neo',
            driver: 'Captain: Rajesh Kumar',
            price: 5500
        },
        {
            company: 'IndiGo',
            number: '6E 345',
            departure: { time: '08:40', city: 'Bangalore', terminal: 'Terminal 1' },
            arrival: { time: '11:10', city: 'Mumbai', terminal: 'Terminal 2' },
            duration: '2h 30m',
            stops: 'Direct',
            amenities: ['WiFi', 'Snacks', 'Entertainment'],
            vehicle: 'Airbus A321',
            driver: 'Captain: Priya Singh',
            price: 4800
        },
        {
            company: 'Vistara',
            number: 'UK 835',
            departure: { time: '11:45', city: 'Delhi', terminal: 'Terminal 3' },
            arrival: { time: '14:20', city: 'Bangalore', terminal: 'Terminal 2' },
            duration: '2h 35m',
            stops: 'Direct',
            amenities: ['WiFi', 'Premium Meals', 'Entertainment'],
            vehicle: 'Boeing 737',
            driver: 'Captain: Amit Sharma',
            price: 6200
        },
        {
            company: 'SpiceJet',
            number: 'SG 154',
            departure: { time: '07:15', city: 'Chennai', terminal: 'Terminal 1' },
            arrival: { time: '09:45', city: 'Kolkata', terminal: 'Terminal 2' },
            duration: '2h 30m',
            stops: 'Direct',
            amenities: ['Snacks', 'Entertainment'],
            vehicle: 'Boeing 737-800',
            driver: 'Captain: Deepak Verma',
            price: 4200
        },
        {
            company: 'Air India Express',
            number: 'IX 676',
            departure: { time: '14:30', city: 'Kochi', terminal: 'Terminal 1' },
            arrival: { time: '17:15', city: 'Mumbai', terminal: 'Terminal 2' },
            duration: '2h 45m',
            stops: 'Direct',
            amenities: ['Meals', 'Entertainment'],
            vehicle: 'Boeing 737-800',
            driver: 'Captain: Sanjay Nair',
            price: 5100
        }
    ],
    train: [
        {
            company: 'Rajdhani Express',
            number: '12951',
            departure: { time: '16:15', city: 'Mumbai', station: 'Mumbai Central' },
            arrival: { time: '08:31', city: 'Delhi', station: 'New Delhi' },
            duration: '16h 16m',
            stops: '5 stops',
            amenities: ['Meals', 'Bedding', 'AC'],
            vehicle: 'Premium Express Train',
            driver: 'Driver: Suresh Patel',
            price: 2200
        },
        {
            company: 'Shatabdi Express',
            number: '12007',
            departure: { time: '06:00', city: 'Chennai', station: 'Chennai Central' },
            arrival: { time: '12:45', city: 'Bangalore', station: 'KSR Bengaluru' },
            duration: '6h 45m',
            stops: '2 stops',
            amenities: ['Meals', 'WiFi', 'AC'],
            vehicle: 'Premium Express Train',
            driver: 'Driver: Ramesh Kumar',
            price: 1500
        },
        {
            company: 'Duronto Express',
            number: '12264',
            departure: { time: '20:15', city: 'Delhi', station: 'New Delhi' },
            arrival: { time: '11:30', city: 'Pune', station: 'Pune Junction' },
            duration: '15h 15m',
            stops: '3 stops',
            amenities: ['Meals', 'Bedding', 'AC'],
            vehicle: 'Super Fast Train',
            driver: 'Driver: Vikram Singh',
            price: 2800
        },
        {
            company: 'Vande Bharat Express',
            number: '22436',
            departure: { time: '05:45', city: 'Delhi', station: 'New Delhi' },
            arrival: { time: '14:00', city: 'Varanasi', station: 'Varanasi Junction' },
            duration: '8h 15m',
            stops: '2 stops',
            amenities: ['Premium Meals', 'WiFi', 'AC'],
            vehicle: 'Semi High Speed Train',
            driver: 'Driver: Rajiv Kumar',
            price: 1850
        }
    ],
    bus: [
        {
            company: 'KSRTC Airavat',
            number: 'KA 01 F 1234',
            departure: { time: '21:30', city: 'Bangalore', station: 'Majestic' },
            arrival: { time: '06:45', city: 'Chennai', station: 'CMBT' },
            duration: '9h 15m',
            stops: '2 stops',
            amenities: ['AC', 'USB Charging', 'Reclining Seats'],
            vehicle: 'Volvo Multi-Axle',
            driver: 'Driver: Venkatesh R',
            price: 950
        },
        {
            company: 'MSRTC Shivneri',
            number: 'MH 12 KP 5678',
            departure: { time: '07:00', city: 'Mumbai', station: 'Dadar' },
            arrival: { time: '11:30', city: 'Pune', station: 'Shivajinagar' },
            duration: '4h 30m',
            stops: '1 stop',
            amenities: ['AC', 'WiFi', 'Water Bottle'],
            vehicle: 'Volvo AC Bus',
            driver: 'Driver: Mahesh Patil',
            price: 450
        },
        {
            company: 'RSRTC Volvo',
            number: 'RJ 14 PA 3456',
            departure: { time: '19:00', city: 'Jaipur', station: 'Sindhi Camp' },
            arrival: { time: '05:30', city: 'Delhi', station: 'Kashmere Gate' },
            duration: '10h 30m',
            stops: '2 stops',
            amenities: ['AC', 'Blanket', 'Movie'],
            vehicle: 'Volvo 9400',
            driver: 'Driver: Prakash Sharma',
            price: 1200
        }
    ],
    cab: [
        {
            company: 'Ola Prime SUV',
            number: 'DL 01 XX 1234',
            departure: { time: 'Flexible', city: 'Delhi', station: 'Your Location' },
            arrival: { time: '4h later', city: 'Agra', station: 'Drop Location' },
            duration: '4h 00m',
            stops: 'Flexible',
            amenities: ['AC', 'WiFi', 'Water Bottle'],
            vehicle: 'Toyota Innova',
            driver: 'Driver: Ravi Kumar',
            price: 3500
        },
        {
            company: 'Uber Intercity',
            number: 'MH 02 YY 5678',
            departure: { time: 'Flexible', city: 'Mumbai', station: 'Your Location' },
            arrival: { time: '3h later', city: 'Pune', station: 'Drop Location' },
            duration: '3h 00m',
            stops: 'Flexible',
            amenities: ['AC', 'Music System', 'Sanitized'],
            vehicle: 'Honda City',
            driver: 'Driver: Anil Patil',
            price: 2800
        },
        {
            company: 'Meru Cabs',
            number: 'KA 03 ZZ 9012',
            departure: { time: 'Flexible', city: 'Bangalore', station: 'Your Location' },
            arrival: { time: '6h later', city: 'Mysore', station: 'Drop Location' },
            duration: '6h 00m',
            stops: 'Flexible',
            amenities: ['AC', 'GPS Tracking', 'First Aid'],
            vehicle: 'Maruti Suzuki Ertiga',
            driver: 'Driver: Krishna Murthy',
            price: 4200
        }
    ]
};

// Update base prices for Indian market
const basePrice = {
    'flight': {
        'short': 3500,  // For flights under 500km (e.g., Mumbai-Ahmedabad)
        'medium': 5500, // For flights 500-1000km (e.g., Delhi-Mumbai)
        'long': 7500   // For flights over 1000km (e.g., Delhi-Bangalore)
    },
    'train': {
        'short': 800,   // For trains under 300km (e.g., Mumbai-Pune)
        'medium': 1500, // For trains 300-800km (e.g., Delhi-Agra-Jaipur)
        'long': 2500   // For trains over 800km (e.g., Mumbai-Delhi)
    },
    'bus': {
        'short': 300,   // For buses under 100km (e.g., Mumbai-Lonavala)
        'medium': 600,  // For buses 100-300km (e.g., Bangalore-Mysore)
        'long': 1200   // For buses over 300km (e.g., Mumbai-Goa)
    },
    'cab': {
        'short': 1000,  // For cabs under 50km (e.g., Airport transfers)
        'medium': 2000, // For cabs 50-150km (e.g., Mumbai-Lonavala)
        'long': 4000   // For cabs over 150km (e.g., Delhi-Agra)
    }
};

// Display results in the container with Indian prices
function displayResults(results) {
    const container = document.querySelector('.results-container');
    if (!container) return;
    
    if (results.length === 0) {
        showNoResults();
        return;
    }
    
    container.innerHTML = results.map(result => `
        <div class="result-card">
            <div class="transport-header">
                <div class="company-logo-placeholder">${result.company[0]}</div>
                <div class="company-name">${result.company}</div>
                <div class="transport-number">${result.transportNumber}</div>
            </div>
            <div class="journey-details">
                <div class="departure">
                    <h3>${result.departure.time}</h3>
                    <div class="city">${result.departure.city}</div>
                </div>
                <div class="journey-duration">
                    <div class="duration">${result.duration}</div>
                    <div class="route-line">
                        ${getTransportIcon(result.transportNumber)}
                    </div>
                </div>
                <div class="arrival">
                    <h3>${result.arrival.time}</h3>
                    <div class="city">${result.arrival.city}</div>
                </div>
            </div>
            <div class="price-section">
                <div class="price">
                    <span class="amount">₹${Math.round(result.price).toLocaleString('en-IN')}</span>
                    <span class="per-person">per person</span>
                </div>
                <button class="book-btn" onclick="handleBooking('${result.company}', '${result.transportNumber}', '${result.departure.city}', '${result.arrival.city}', ${result.price})">
                    Book Now
                </button>
            </div>
        </div>
    `).join('');
}

// Get transport icon based on type
function getTransportIcon(type) {
    switch (type) {
        case 'flight': return 'plane';
        case 'train': return 'train';
        default: return 'bus';
    }
}

// Get transport info class based on type
function getTransportInfoClass(type) {
    switch (type) {
        case 'flight': return 'aircraft-info';
        case 'train': return 'train-info';
        default: return 'bus-info';
    }
}

// Get icon for amenity
function getAmenityIcon(amenity) {
    const icons = {
        'WiFi': 'wifi',
        'Free WiFi': 'wifi',
        'Meals': 'utensils',
        'Premium Meals': 'utensils',
        'Snacks': 'cookie',
        'Entertainment': 'tv',
        'Cafe': 'coffee',
        'Cafe Car': 'coffee',
        'Bar': 'glass-martini-alt',
        'Cafeteria': 'coffee',
        'Food Trolley': 'utensils',
        'Power': 'plug',
        'Power Outlets': 'plug',
        'USB Ports': 'charging-station',
        'AC': 'temperature-low',
        'Toilet': 'toilet'
    };
    return icons[amenity] || 'check';
}

// Sort result cards
function sortResults(sortBy) {
    const resultsContainer = document.querySelector('.results-container');
    if (!resultsContainer) return;
    
    const resultCards = Array.from(document.querySelectorAll('.result-card[style="display: block"]'));
    
    resultCards.sort((a, b) => {
        switch (sortBy) {
            case 'price':
                return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
            case 'duration':
                return parseFloat(a.getAttribute('data-duration')) - parseFloat(b.getAttribute('data-duration'));
            case 'departure':
                return getTimeMinutes(a.getAttribute('data-departure')) - getTimeMinutes(b.getAttribute('data-departure'));
            default:
                return 0;
        }
    });
    
    // Re-append cards in sorted order
    resultCards.forEach(card => {
        resultsContainer.appendChild(card);
    });
}

// Check if no results and display message
function checkNoResults() {
    const resultsContainer = document.querySelector('.results-container');
    if (!resultsContainer) return;
    
    const visibleCards = document.querySelectorAll('.result-card[style="display: block"]');
    
    // Remove existing no-results message
    const existingNoResults = document.querySelector('.no-results');
    if (existingNoResults) {
        existingNoResults.remove();
    }
    
    // Add no-results message if no cards are visible
    if (visibleCards.length === 0) {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results';
        noResultsMessage.textContent = 'No results match your current filters. Try adjusting your filters.';
        resultsContainer.appendChild(noResultsMessage);
    }
}

// Set up booking buttons
function setupBookingButtons() {
    // Use event delegation for booking buttons
    document.addEventListener('click', function(e) {
        const bookBtn = e.target.closest('.book-btn');
        
        if (bookBtn) {
            e.preventDefault();
            
            // Get transportation details from the card
            const card = bookBtn.closest('.result-card');
            if (!card) return;
            
            const transport = card.getAttribute('data-transport') || 'Unknown';
            const company = card.querySelector('.company-name')?.textContent || 'Unknown';
            const from = card.querySelector('.departure .city')?.textContent || 'Unknown';
            const to = card.querySelector('.arrival .city')?.textContent || 'Unknown';
            const price = card.querySelector('.amount')?.textContent || 'Unknown';
            
            // Show booking confirmation
            alert(`Booking Confirmed!\n\nTransport: ${transport}\nCompany: ${company}\nDeparture: ${from}\nArrival: ${to}\nPrice: ${price}\n\nThank you for booking with TravelEase!`);
        }
    });
}

// Helper function to get duration in minutes
function getDurationMinutes(duration) {
    const parts = duration.split('h ');
    const hours = parseInt(parts[0]) || 0;
    const minutes = parts.length > 1 ? parseInt(parts[1].replace('m', '')) || 0 : 0;
    return hours * 60 + minutes;
}

// Helper function to get time in minutes
function getTimeMinutes(time) {
    if (!time) return 0;
    const [hours, minutes] = time.split(':').map(Number);
    return (hours || 0) * 60 + (minutes || 0);
}

// Generate sample results with Indian context
function generateSampleResults(from, to, date, passengers, transportType) {
    const basePrice = {
        'flight': 5000,
        'train': 1500,
        'bus': 800
    }[transportType] || 2000;
    
    const companies = transportCompanies[transportType] || [];
    
    return Array.from({length: 3}, (_, i) => ({
        company: companies[Math.floor(Math.random() * companies.length)],
        departure: {
            time: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            city: from
        },
        arrival: {
            time: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            city: to
        },
        price: (basePrice + (Math.random() * 1000)) * passengers,
        duration: `${2 + Math.floor(Math.random() * 8)}h ${Math.floor(Math.random() * 60)}m`,
        transportNumber: generateTransportNumber(transportType)
    }));
}

// Generate Indian transport numbers
function generateTransportNumber(type) {
    switch(type) {
        case 'flight':
            const airlines = ['AI', 'IG', 'SG', 'UK', 'G8'];
            return `${airlines[Math.floor(Math.random() * airlines.length)]}${Math.floor(Math.random() * 9000) + 1000}`;
        case 'train':
            return `${Math.floor(Math.random() * 90000) + 10000}`;
        case 'bus':
            const states = ['KA', 'MH', 'UP', 'GJ', 'RJ', 'DL'];
            return `${states[Math.floor(Math.random() * states.length)]}${Math.floor(Math.random() * 90) + 10}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9000) + 1000}`;
        default:
            return `TR${Math.floor(Math.random() * 9000) + 1000}`;
    }
}

// Get appropriate transport icon
function getTransportIcon(transportNumber) {
    if (transportNumber.match(/^[A-Z]{2}\d/)) {
        return '<i class="fas fa-plane"></i>';
    } else if (transportNumber.match(/^\d{5}$/)) {
        return '<i class="fas fa-train"></i>';
    } else {
        return '<i class="fas fa-bus"></i>';
    }
}

// Handle booking with Indian prices
function handleBooking(company, transportNumber, from, to, price) {
    const message = `Booking Confirmed!\n\n` +
        `Service Provider: ${company}\n` +
        `${getTransportType(transportNumber)} Number: ${transportNumber}\n` +
        `From: ${from}\n` +
        `To: ${to}\n` +
        `Total Fare: ₹${Math.round(price).toLocaleString('en-IN')}`;
    alert(message);
}

// Get transport type based on number format
function getTransportType(transportNumber) {
    if (transportNumber.match(/^[A-Z]{2}\d/)) {
        return 'Flight';
    } else if (transportNumber.match(/^\d{5}$/)) {
        return 'Train';
    } else {
        return 'Bus';
    }
}

// Update map view with route
function updateMapView(from, to) {
    console.log('Updating map view for:', from, 'to', to);
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) {
        console.error('Map container not found');
        return;
    }
    
    // Show map container
    mapContainer.style.display = 'block';

    // Get coordinates
    const fromCoords = getCityCoordinates(from);
    const toCoords = getCityCoordinates(to);

    console.log('Coordinates:', fromCoords, toCoords);

    if (!fromCoords || !toCoords) {
        console.error('Could not find coordinates for cities');
        return;
    }
    
    // Initialize map if not already initialized
    if (!window.map) {
        window.map = L.map('map-container').setView([20.5937, 78.9629], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(window.map);
    }
    
    // Clear existing markers and routes
    window.map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            window.map.removeLayer(layer);
        }
    });
    
    // Add markers for departure and destination
    L.marker(fromCoords).addTo(window.map)
            .bindPopup(`Departure: ${from}`);
    L.marker(toCoords).addTo(window.map)
            .bindPopup(`Destination: ${to}`);
        
        // Draw route line
        L.polyline([fromCoords, toCoords], {
        color: '#3498db',
            weight: 3,
        opacity: 0.8,
        dashArray: '10, 10'
    }).addTo(window.map);

    // Fit map to show both points with padding
    window.map.fitBounds([fromCoords, toCoords], {
        padding: [50, 50]
    });
}

// Get city coordinates (updated to handle city names with state)
function getCityCoordinates(city) {
    // Extract just the city name before the comma if it exists
    const cityName = city.split(',')[0].trim();
    return cityCoordinates[cityName];
}

// Function to generate route key
function getRouteKey(fromCity, toCity) {
    return `${fromCity.toLowerCase()}-${toCity.toLowerCase()}`;
}

// Function to update results section with bus options
function updateBusResults(fromCity, toCity) {
    const resultsSection = document.getElementById('results-section');
    const routeKey = getRouteKey(fromCity, toCity);
    const routes = busRoutes[routeKey];

    if (!routes) {
        resultsSection.innerHTML = '<h2>No direct buses available for this route</h2>';
        return;
    }

    let html = '<h2>Available Bus Routes</h2>';
    
    routes.forEach(route => {
        const facilitiesHtml = route.facilities.map(facility => `
            <div class="facility">
                <i class="fas fa-${getFacilityIcon(facility)}"></i>
                <span>${facility}</span>
            </div>
        `).join('');

        html += `
            <div class="bus-route-card" data-bus-type="${route.type}" 
                data-departure="${route.departure}" 
                data-arrival="${route.arrival}" 
                data-price="${route.price}"
                data-boarding="${route.boarding}" 
                data-bus-model="${route.model}">
                <div class="route-header">
                    <div class="route-timing">
                        <h3>${route.type}</h3>
                        <p>Departure: ${route.departure} • Arrival: ${route.arrival}</p>
                    </div>
                    <div class="route-price">₹${route.price}</div>
                </div>
                <div class="route-details">
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <span>${route.duration}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${route.boarding}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-bus"></i>
                        <span>${route.model}</span>
                    </div>
                </div>
                <div class="facilities">
                    ${facilitiesHtml}
                </div>
                <a href="#" class="book-now-btn" onclick="proceedToBooking(this.closest('.bus-route-card'))">Book Now</a>
            </div>
        `;
    });

    resultsSection.innerHTML = html;
    resultsSection.classList.add('visible');
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Helper function to get appropriate icon for facility
function getFacilityIcon(facility) {
    const iconMap = {
        'AC': 'snowflake',
        'Sleeper': 'bed',
        'Semi Sleeper': 'bed',
        'WiFi': 'wifi',
        'Charging Point': 'charging-station',
        'USB Charging': 'charging-station',
        'Entertainment': 'video',
        'Water Bottle': 'tint',
        'Snacks': 'cookie',
        'Blanket': 'blanket',
        'Comfortable Seats': 'couch',
        'Regular Seats': 'chair',
        'Reclining Seats': 'couch'
    };
    return iconMap[facility] || 'check';
}

// Update the form submit handler
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fromCity = document.getElementById('from').value;
            const toCity = document.getElementById('to').value;
            
            // Update bus results
            updateBusResults(fromCity, toCity);
            
            // Update map with selected cities
            updateMapView(fromCity, toCity);
        });
    }

    // Add change event listeners to dropdowns for real-time map updates
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');

    if (fromSelect && toSelect) {
        fromSelect.addEventListener('change', function() {
            const toCity = toSelect.value;
            if (toCity) {
                updateMapView(this.value, toCity);
            }
        });

        toSelect.addEventListener('change', function() {
            const fromCity = fromSelect.value;
            if (fromCity) {
                updateMapView(fromCity, this.value);
            }
        });
    }
}); 