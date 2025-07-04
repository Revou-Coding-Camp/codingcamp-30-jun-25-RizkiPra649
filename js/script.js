document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const userNameSpan = document.getElementById('user-name');
    const navLinks = document.querySelectorAll('button[data-section]');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const submittedDataDisplay = document.getElementById('submitted-data-display');
    const footerYear = document.getElementById('footer-year');
    const portfolioBtn = document.getElementById('portfolio-btn');
    const mobilePortfolioBtn = document.getElementById('mobile-portfolio-btn');

    // --- Welcome Prompt ---
    const name = window.prompt("What's your name?", "Guest");
    if (userNameSpan && name) {
        userNameSpan.textContent = name.trim() || "Guest";
    }

    // --- Dynamic Footer Year ---
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
    
    // --- Portfolio Alert ---
    const showPortfolioAlert = () => alert("Portfolio coming soon!");
    if (portfolioBtn) portfolioBtn.addEventListener('click', showPortfolioAlert);
    if (mobilePortfolioBtn) {
        mobilePortfolioBtn.addEventListener('click', () => {
            showPortfolioAlert();
            closeMobileMenu(); // also close menu on click
        });
    }

    // --- Smooth Scrolling ---
    const handleNavClick = (event) => {
        const sectionId = event.currentTarget.dataset.section;
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        // If it's a mobile link, close the menu
        if (mobileMenu.contains(event.currentTarget)) {
            closeMobileMenu();
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // --- Mobile Menu Toggle ---
    const toggleMobileMenu = () => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenu.classList.toggle('hidden');
        menuOpenIcon.classList.toggle('hidden');
        menuCloseIcon.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    };
    
    const closeMobileMenu = () => {
        mobileMenu.classList.add('hidden');
        menuOpenIcon.classList.remove('hidden');
        menuCloseIcon.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    // --- Form Validation & Submission ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const isValid = validateForm();
            if (isValid) {
                submitForm();
            }
        });
    }
    
    const validateForm = () => {
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            const errorElement = input.nextElementSibling;
            clearError(input, errorElement); // Clear previous errors
            if (input.required && input.value.trim() === '') {
                isValid = false;
                showError(input, errorElement, 'This field is required.');
            } else if (input.type === 'email' && !/\S+@\S+\.\S+/.test(input.value)) {
                isValid = false;
                showError(input, errorElement, 'Please enter a valid email address.');
            } else if (input.id === 'phone' && !/^\d+$/.test(input.value)) {
                isValid = false;
                showError(input, errorElement, 'Phone number must contain only digits.');
            }
        });

        return isValid;
    };
    
    const showError = (input, errorElement, message) => {
        input.classList.add('invalid');
        if (errorElement) errorElement.textContent = message;
    }

    const clearError = (input, errorElement) => {
        input.classList.remove('invalid');
        if(errorElement) errorElement.textContent = '';
    }

    const submitForm = () => {
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        // Simulate API call
        setTimeout(() => {
            displaySubmittedData(data);
            contactForm.reset();
            inputs.forEach(input => clearError(input, input.nextElementSibling));
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }, 1000);
    };

    const displaySubmittedData = (data) => {
        submittedDataDisplay.innerHTML = `
            <div>
                <p><strong>Name:</strong> ${escapeHTML(data.name)}</p>
                <p><strong>Email:</strong> ${escapeHTML(data.email)}</p>
                <p><strong>Phone:</strong> ${escapeHTML(data.phone)}</p>
                <p><strong>Message:</strong></p>
                <p class="message-display">${escapeHTML(data.message)}</p>
            </div>
        `;
    };
    
    const inputs = contactForm ? Array.from(contactForm.querySelectorAll('input, textarea')) : [];

    const escapeHTML = (str) => {
        const p = document.createElement("p");
        p.textContent = str;
        return p.innerHTML;
    };
});