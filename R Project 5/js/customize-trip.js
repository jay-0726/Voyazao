// Customize Trip specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Step navigation
    const steps = document.querySelectorAll('.step');
    const stepContents = document.querySelectorAll('.step-content');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.previous-step');
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    
    // Initialize progress
    updateProgress(1);

    // Step navigation click
    steps.forEach(step => {
        step.addEventListener('click', function() {
            const stepNumber = parseInt(this.getAttribute('data-step'));
            goToStep(stepNumber);
        });
    });
    
    // Next button click
    nextBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const nextStep = parseInt(this.getAttribute('data-next'));
            if (validateCurrentStep(nextStep - 1)) {
                goToStep(nextStep);
            }
        });
    });
    
    // Previous button click
    prevBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const prevStep = parseInt(this.getAttribute('data-prev'));
            goToStep(prevStep);
        });
    });
    
    function goToStep(stepNumber) {
        // Update active step
        steps.forEach(s => s.classList.remove('active'));
        document.querySelector(`.step[data-step="${stepNumber}"]`).classList.add('active');
        
        // Update active content
        stepContents.forEach(c => c.classList.remove('active'));
        document.getElementById(`step-${stepNumber}`).classList.add('active');
        
        // Update progress
        updateProgress(stepNumber);
    }
    
    function updateProgress(stepNumber) {
        const totalSteps = steps.length;
        const progressPercentageValue = ((stepNumber - 1) / (totalSteps - 1) * 100).toFixed(1);
        progressFill.style.width = `${progressPercentageValue}%`;
        progressPercentage.textContent = `${progressPercentageValue}%`;
    }
    
    function validateCurrentStep(stepNumber) {
        switch(stepNumber) {
            case 1:
                return validateDestinationStep();
            case 2:
                return validateDateStep();
            case 3:
                return validateTransportationStep();
            case 4:
                return validateActivitiesStep();
            case 5:
                return validateBudgetStep();
            default:
                return true;
        }
    }
    
    // Step 1: Destination
    const destinationCards = document.querySelectorAll('.destination-card');
    const destinationSearch = document.getElementById('destination-search');
    const selectedDestinationDisplay = document.getElementById('selected-destination-display');
    const selectedDestinationImg = document.getElementById('selected-destination-img');
    const selectedCity = document.getElementById('selected-city');
    const selectedCountry = document.getElementById('selected-country');
    const changeDestinationBtn = document.getElementById('change-destination');
    const sidebarDestination = document.getElementById('sidebar-destination');
    
    let selectedDestination = null;
    
    destinationCards.forEach(card => {
        card.addEventListener('click', function() {
            selectDestination(this);
        });
    });
    
    changeDestinationBtn.addEventListener('click', function() {
        selectedDestinationDisplay.classList.add('hidden');
        selectedDestination = null;
        sidebarDestination.textContent = 'Not selected';
    });
    
    function selectDestination(card) {
        // Get destination data
        const city = card.getAttribute('data-city');
        const country = card.getAttribute('data-country');
        const imgSrc = card.querySelector('img').src;
        
        // Update selected destination info
        selectedDestinationImg.src = imgSrc;
        selectedCity.textContent = city;
        selectedCountry.textContent = country;
        selectedDestinationDisplay.classList.remove('hidden');
        
        // Store selected destination
        selectedDestination = {
            city: city,
            country: country,
            imgSrc: imgSrc
        };
        
        // Update sidebar
        sidebarDestination.textContent = `${city}, ${country}`;
        
        // Update review page
        document.getElementById('review-destination').textContent = `${city}, ${country}`;
        document.getElementById('review-destination-img').style.backgroundImage = `url('${imgSrc}')`;
    }
    
    function validateDestinationStep() {
        if (!selectedDestination) {
            alert('Please select a destination before continuing.');
            return false;
        }
        return true;
    }
    
    // Step 2: Travel Dates
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const durationDays = document.getElementById('duration-days');
    const sidebarDates = document.getElementById('sidebar-dates');
    const sidebarDuration = document.getElementById('sidebar-duration');
    
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    startDateInput.setAttribute('min', today);
    endDateInput.setAttribute('min', today);
    
    startDateInput.addEventListener('change', function() {
        // Update end date min value
        endDateInput.setAttribute('min', this.value);
        updateDuration();
    });
    
    endDateInput.addEventListener('change', function() {
        updateDuration();
    });
    
    function updateDuration() {
        const startDate = startDateInput.value ? new Date(startDateInput.value) : null;
        const endDate = endDateInput.value ? new Date(endDateInput.value) : null;
        
        if (startDate && endDate) {
            // Calculate duration in days
            const durationMs = endDate - startDate;
            const durationDaysValue = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
            
            // Update duration display
            durationDays.textContent = durationDaysValue;
            
            // Format dates for display
            const startDateFormatted = formatDate(startDate);
            const endDateFormatted = formatDate(endDate);
            
            // Update sidebar
            sidebarDates.textContent = `${startDateFormatted} - ${endDateFormatted}`;
            sidebarDuration.textContent = `${durationDaysValue} days`;
            
            // Update review page
            document.getElementById('review-dates').textContent = `${startDateFormatted} - ${endDateFormatted}`;
            document.getElementById('review-duration').textContent = durationDaysValue;
        }
    }
    
    function formatDate(date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    function validateDateStep() {
        if (!startDateInput.value || !endDateInput.value) {
            alert('Please select both start and end dates for your trip.');
            return false;
        }
        return true;
    }
    
    // Step 3: Transportation
    const transportOptions = document.querySelectorAll('.transport-option');
    const sidebarTransportation = document.getElementById('sidebar-transportation');
    
    let selectedTransport = null;
    
    transportOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            transportOptions.forEach(o => o.classList.remove('selected'));
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Store selected transport
            selectedTransport = this.getAttribute('data-transport');
            
            // Update sidebar
            sidebarTransportation.textContent = this.querySelector('h4').textContent;
            
            // Update transportation summary in review
            updateTransportationSummary();
        });
    });
    
    function updateTransportationSummary() {
        const transportationSummary = document.getElementById('transportation-summary');
        let mainTransport = '';
        
        if (selectedTransport) {
            const transportText = document.querySelector(`.transport-option[data-transport="${selectedTransport}"] h4`).textContent;
            mainTransport = `<p><strong>Main Transportation:</strong> ${transportText}</p>`;
        }
        
        let localTransports = [];
        document.querySelectorAll('.transport-checkbox:checked').forEach(checkbox => {
            const label = checkbox.nextElementSibling.querySelector('span').textContent;
            localTransports.push(label);
        });
        
        let localTransportHtml = '';
        if (localTransports.length > 0) {
            localTransportHtml = `<p><strong>Local Transportation:</strong> ${localTransports.join(', ')}</p>`;
        }
        
        transportationSummary.innerHTML = mainTransport + localTransportHtml;
    }
    
    document.querySelectorAll('.transport-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateTransportationSummary);
    });
    
    function validateTransportationStep() {
        if (!selectedTransport) {
            alert('Please select a main transportation option before continuing.');
            return false;
        }
        return true;
    }
    
    // Step 4: Activities
    const interestCheckboxes = document.querySelectorAll('.interest-checkbox');
    const addActivityBtn = document.getElementById('add-activity');
    const customActivityInput = document.getElementById('custom-activity');
    const customActivitiesList = document.getElementById('custom-activities-list');
    
    let customActivities = [];
    
    // Interest tags
    interestCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Here you would normally fetch suggested activities based on destination and interests
            // For this example, we'll just show a placeholder message
            if (document.querySelectorAll('.interest-checkbox:checked').length > 0 && selectedDestination) {
                document.querySelector('.placeholder-message').style.display = 'none';
                document.getElementById('activities-container').classList.remove('hidden');
            } else {
                document.querySelector('.placeholder-message').style.display = 'block';
                document.getElementById('activities-container').classList.add('hidden');
            }
        });
    });
    
    // Add custom activity
    addActivityBtn.addEventListener('click', function() {
        const activityName = customActivityInput.value.trim();
        
        if (activityName) {
            // Add to custom activities list
            customActivities.push(activityName);
            
            // Create activity item
            const activityItem = document.createElement('div');
            activityItem.className = 'custom-activity-item';
            activityItem.innerHTML = `
                <span>${activityName}</span>
                <button class="remove-activity" data-activity="${activityName}"><i class="fas fa-times"></i></button>
            `;
            
            // Add to list
            customActivitiesList.appendChild(activityItem);
            
            // Clear input
            customActivityInput.value = '';
            
            // Update activities summary in review
            updateActivitiesSummary();
        }
    });
    
    // Remove custom activity
    customActivitiesList.addEventListener('click', function(e) {
        if (e.target.closest('.remove-activity')) {
            const button = e.target.closest('.remove-activity');
            const activityName = button.getAttribute('data-activity');
            const activityItem = button.parentElement;
            
            // Remove from DOM
            activityItem.remove();
            
            // Remove from array
            customActivities = customActivities.filter(activity => activity !== activityName);
            
            // Update activities summary in review
            updateActivitiesSummary();
        }
    });
    
    function updateActivitiesSummary() {
        const activitiesSummary = document.getElementById('activities-summary');
        
        let interestsHtml = '';
        let selectedInterests = [];
        interestCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedInterests.push(checkbox.nextElementSibling.textContent);
            }
        });
        
        if (selectedInterests.length > 0) {
            interestsHtml = `<p><strong>Interests:</strong> ${selectedInterests.join(', ')}</p>`;
        }
        
        let customActivitiesHtml = '';
        if (customActivities.length > 0) {
            customActivitiesHtml = `
                <p><strong>Planned Activities:</strong></p>
                <ul>
                    ${customActivities.map(activity => `<li>${activity}</li>`).join('')}
                </ul>
            `;
        }
        
        activitiesSummary.innerHTML = interestsHtml + customActivitiesHtml;
    }
    
    function validateActivitiesStep() {
        return true; // Activities are optional
    }
    
    // Step 5: Budget
    const budgetSlider = document.getElementById('budget-slider');
    const budgetValue = document.getElementById('budget-value');
    const categorySliders = document.querySelectorAll('.category-slider');
    const sidebarBudget = document.getElementById('sidebar-budget');
    
    budgetSlider.addEventListener('input', function() {
        const value = this.value;
        budgetValue.textContent = value;
        sidebarBudget.textContent = `$${value}`;
        
        // Update category amounts
        updateCategoryAmounts();
    });
    
    categorySliders.forEach(slider => {
        slider.addEventListener('input', function() {
            const categoryId = this.id.split('-')[0];
            const percentage = this.value;
            
            // Update percentage display
            document.getElementById(`${categoryId}-percentage`).textContent = `${percentage}%`;
            
            // Update amount
            updateCategoryAmount(categoryId, percentage);
        });
    });
    
    function updateCategoryAmounts() {
        const totalBudget = parseInt(budgetSlider.value);
        
        categorySliders.forEach(slider => {
            const categoryId = slider.id.split('-')[0];
            const percentage = slider.value;
            updateCategoryAmount(categoryId, percentage, totalBudget);
        });
        
        // Update budget summary in review
        updateBudgetSummary();
    }
    
    function updateCategoryAmount(categoryId, percentage, budget = null) {
        const totalBudget = budget || parseInt(budgetSlider.value);
        const amount = Math.round(totalBudget * (percentage / 100));
        document.getElementById(`${categoryId}-amount`).textContent = amount;
        
        // Update budget summary in review
        updateBudgetSummary();
    }
    
    function updateBudgetSummary() {
        const budgetSummary = document.getElementById('budget-summary');
        const totalBudget = parseInt(budgetSlider.value);
        
        let categoriesHtml = '';
        categorySliders.forEach(slider => {
            const categoryId = slider.id.split('-')[0];
            const percentage = slider.value;
            const amount = document.getElementById(`${categoryId}-amount`).textContent;
            const categoryName = slider.closest('.budget-category').querySelector('.category-label span').textContent;
            
            categoriesHtml += `<p><strong>${categoryName}:</strong> $${amount} (${percentage}%)</p>`;
        });
        
        budgetSummary.innerHTML = `
            <p><strong>Total Budget:</strong> $${totalBudget}</p>
            ${categoriesHtml}
        `;
    }
    
    function validateBudgetStep() {
        return true; // Budget is always valid
    }
    
    // Initialize budget
    updateCategoryAmounts();
    
    // Step 6: Review
    const finishTripBtn = document.getElementById('finish-trip');
    const saveTripBtn = document.getElementById('save-trip');
    const shareTripBtn = document.getElementById('share-trip');
    const downloadPdfBtn = document.getElementById('download-pdf');
    
    finishTripBtn.addEventListener('click', function() {
        // Simulate trip booking completion
        alert('Your trip has been booked successfully! You will receive a confirmation email shortly.');
        window.location.href = '../index.html';
    });
    
    saveTripBtn.addEventListener('click', function() {
        alert('Your trip has been saved! You can access it anytime in your account.');
    });
    
    shareTripBtn.addEventListener('click', function() {
        alert('Trip sharing options will appear here. This feature is coming soon!');
    });
    
    downloadPdfBtn.addEventListener('click', function() {
        alert('PDF download feature is coming soon! Your trip details will be available for download as a PDF.');
    });
    
    // Contact expert button
    document.getElementById('contact-expert').addEventListener('click', function() {
        alert('Our travel expert will contact you shortly to help with your trip planning.');
    });
    
    // Initialize trip overview
    function initializeTripOverview() {
        const tripOverview = document.getElementById('trip-overview');
        tripOverview.innerHTML = `
            <p>This is your custom trip plan. You can modify any part of your trip by going back to the respective steps.</p>
            <p>Once you're satisfied with your plan, click "Finish & Book" to complete your booking.</p>
        `;
    }
    
    initializeTripOverview();
}); 