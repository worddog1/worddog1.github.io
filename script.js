document.addEventListener("DOMContentLoaded", function () {
    // State management
    const state = {
        isMenuOpen: false,
        activeTestimonial: 0,
        testimonials: [
            {
                name: "Sarah Johnson",
                text: "Completely transformed our backyard into an oasis. Professional team and amazing results!",
                role: "Homeowner",
            },
            {
                name: "Michael Chen",
                text: "Best landscaping service in the area. They maintain our commercial property beautifully.",
                role: "Business Owner",
            },
            {
                name: "Emily Rodriguez",
                text: "From design to execution, they exceeded all expectations. Highly recommend!",
                role: "Residential Client",
            },
        ],
        showContactForm: false,
        formData: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
    };

    // DOM Elements
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const quoteButtons = document.querySelectorAll(".quote-button");
    const ctaButton = document.querySelector(".cta-button");
    const quoteModal = document.getElementById("quote-modal");
    const testimonialText = document.getElementById("testimonial-text");
    const testimonialName = document.getElementById("testimonial-name");
    const testimonialRole = document.getElementById("testimonial-role");
    const testimonialDotsContainer = document.querySelector(".testimonial-dots");

    // Contact form elements
    const contactForm = document.querySelector(".contact-form");
    const contactName = document.getElementById("contact-name");
    const contactEmail = document.getElementById("contact-email");
    const contactPhone = document.getElementById("contact-phone");
    const contactMessage = document.getElementById("contact-message");

    // Quote form elements
    const quoteForm = document.querySelector(".modal-form");
    const quoteName = document.getElementById("quote-name");
    const quoteEmail = document.getElementById("quote-email");
    const quotePhone = document.getElementById("quote-phone");
    const quoteMessage = document.getElementById("quote-message");

    // Initialize testimonials
    function initTestimonials() {
        // Create dots for testimonials
        state.testimonials.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.classList.add("testimonial-dot");
            if (index === state.activeTestimonial) {
                dot.classList.add("active");
            }
            dot.setAttribute("aria-label", `View testimonial ${index + 1}`);
            dot.addEventListener("click", () => {
                state.activeTestimonial = index;
                updateTestimonials();
            });
            testimonialDotsContainer.appendChild(dot);
        });

        // Set initial testimonial
        updateTestimonials();
    }

    // Update testimonials display
    function updateTestimonials() {
        const currentTestimonial = state.testimonials[state.activeTestimonial];
        testimonialText.textContent = currentTestimonial.text;
        testimonialName.textContent = currentTestimonial.name;
        testimonialRole.textContent = currentTestimonial.role;

        // Update active dot
        const dots = document.querySelectorAll(".testimonial-dot");
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === state.activeTestimonial);
        });
    }

    // Toggle mobile menu
    function toggleMobileMenu() {
        state.isMenuOpen = !state.isMenuOpen;
        mobileMenu.hidden = !state.isMenuOpen;
    }

    // Show quote modal
    function showQuoteModal() {
        quoteModal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        quoteName.focus();
    }

    // Hide quote modal
    function hideQuoteModal() {
        quoteModal.setAttribute('hidden', '');
        document.body.style.overflow = '';
    }

    // Handle all close buttons
    function setupCloseModal() {
        document.querySelectorAll('.close-modal').forEach(button => {
            button.addEventListener('click', hideQuoteModal);
        });
    }

    // Handle form submission
    function handleFormSubmit(event, isQuoteForm = false) {
        event.preventDefault();
        const formElements = isQuoteForm ? 
            [quoteName, quoteEmail, quotePhone, quoteMessage] : 
            [contactName, contactEmail, contactPhone, contactMessage];

        // Get form data
        const formData = {
            name: formElements[0].value,
            email: formElements[1].value,
            phone: formElements[2].value,
            message: formElements[3].value,
        };

        // Reset form
        formElements.forEach(element => element.value = "");

        // Show confirmation
        if (isQuoteForm) {
            hideQuoteModal();
            alert("Thank you for your request! We'll contact you shortly.");
        } else {
            alert("Thank you for your message! We will get back to you soon.");
        }
    }

    // Event Listeners
    menuToggle.addEventListener("click", toggleMobileMenu);

    quoteButtons.forEach(button => {
        button.addEventListener("click", showQuoteModal);
    });

    ctaButton.addEventListener("click", showQuoteModal);

    // Close modal when clicking outside
    quoteModal.addEventListener("click", function (event) {
        if (event.target === quoteModal) {
            hideQuoteModal();
        }
    });

    // Handle form submissions
    contactForm.addEventListener("submit", (e) => handleFormSubmit(e, false));
    quoteForm.addEventListener("submit", (e) => handleFormSubmit(e, true));

    // Close modal with Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !quoteModal.hidden) {
            hideQuoteModal();
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            if (state.isMenuOpen) toggleMobileMenu();
            const target = document.querySelector(this.hash);
            target?.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Initialize
    initTestimonials();
    setupCloseModal();
    
    // Ensure modal is hidden on initial load
    hideQuoteModal();
});