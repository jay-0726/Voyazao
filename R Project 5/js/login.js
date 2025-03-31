// Login page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Toggle between login and signup forms
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Toggle forms based on which button was clicked
            const formType = this.getAttribute('data-form');
            if (formType === 'login') {
                loginForm.classList.add('active');
                signupForm.classList.remove('active');
            } else {
                signupForm.classList.add('active');
                loginForm.classList.remove('active');
            }
        });
    });

    // Password visibility toggle
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            
            // Toggle the password visibility
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();
        let isValid = true;
        
        // Basic validation
        if (!email) {
            markAsInvalid('login-email', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            markAsInvalid('login-email', 'Please enter a valid email');
            isValid = false;
        } else {
            markAsValid('login-email');
        }
        
        if (!password) {
            markAsInvalid('login-password', 'Password is required');
            isValid = false;
        } else {
            markAsValid('login-password');
        }
        
        if (isValid) {
            // In a real application, you would make an API call to authenticate the user
            // For this example, we'll just show a success message
            alert('Login successful! Redirecting to dashboard...');
            // Simulate redirect
            window.location.href = '../index.html';
        }
    });

    // Sign up form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();
        const confirmPassword = document.getElementById('signup-confirm-password').value.trim();
        const agreeTerms = document.getElementById('agree').checked;
        let isValid = true;
        
        // Basic validation
        if (!name) {
            markAsInvalid('signup-name', 'Name is required');
            isValid = false;
        } else {
            markAsValid('signup-name');
        }
        
        if (!email) {
            markAsInvalid('signup-email', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            markAsInvalid('signup-email', 'Please enter a valid email');
            isValid = false;
        } else {
            markAsValid('signup-email');
        }
        
        if (!password) {
            markAsInvalid('signup-password', 'Password is required');
            isValid = false;
        } else if (password.length < 8) {
            markAsInvalid('signup-password', 'Password must be at least 8 characters');
            isValid = false;
        } else {
            markAsValid('signup-password');
        }
        
        if (!confirmPassword) {
            markAsInvalid('signup-confirm-password', 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            markAsInvalid('signup-confirm-password', 'Passwords do not match');
            isValid = false;
        } else {
            markAsValid('signup-confirm-password');
        }
        
        if (!agreeTerms) {
            alert('You must agree to the Terms of Service and Privacy Policy');
            isValid = false;
        }
        
        if (isValid) {
            // In a real application, you would make an API call to register the user
            // For this example, we'll just show a success message
            alert('Account created successfully! You can now log in.');
            // Switch to login form
            document.querySelector('[data-form="login"]').click();
        }
    });

    // Form validation helper functions
    function markAsInvalid(inputId, errorMessage) {
        const input = document.getElementById(inputId);
        input.classList.add('error');
        
        // Remove any existing error message
        if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
            input.parentNode.removeChild(input.nextElementSibling);
        }
        
        // Add error message
        const errorMsg = document.createElement('span');
        errorMsg.classList.add('error-message');
        errorMsg.textContent = errorMessage;
        input.parentNode.insertBefore(errorMsg, input.nextSibling);
    }
    
    function markAsValid(inputId) {
        const input = document.getElementById(inputId);
        input.classList.remove('error');
        
        // Remove any existing error message
        if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
            input.parentNode.removeChild(input.nextElementSibling);
        }
    }
    
    // Email validation function
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}); 