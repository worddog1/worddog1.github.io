document.addEventListener("DOMContentLoaded", function () {
  // State management
  const state = {
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
    formData: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  };

  // DOM Elements with null safety
  const quoteButtons = document.querySelectorAll(".quote-button");
  const ctaButton = document.querySelector(".cta-button");
  const quoteModal = document.getElementById("quote-modal");

  // Optional elements (may be null)
  const testimonialText = document.getElementById("testimonial-text");
  const testimonialName = document.getElementById("testimonial-name");
  const testimonialRole = document.getElementById("testimonial-role");
  const testimonialDotsContainer = document.querySelector(".testimonial-dots");
  const contactForm = document.querySelector(".contact-form");
  const quoteForm = document.querySelector(".modal-form");

  // Service choice scrolling function
  window.scrollToService = function (serviceId) {
    const serviceElement = document.getElementById(serviceId);
    if (serviceElement) {
      serviceElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      // Add highlight effect
      serviceElement.style.transform = "scale(1.02)";
      setTimeout(() => {
        serviceElement.style.transform = "scale(1)";
      }, 300);
    }
  };

  // Modal functions
  function showQuoteModal() {
    if (!quoteModal) return;
    quoteModal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    document.getElementById("quote-name")?.focus();
  }

  function hideQuoteModal() {
    if (!quoteModal) return;
    quoteModal.setAttribute("hidden", "");
    document.body.style.overflow = "";
  }

  // Make openQuoteModal available globally (alias for showQuoteModal)
  window.openQuoteModal = showQuoteModal;

  function setupCloseModal() {
    document.querySelectorAll(".close-modal").forEach((button) => {
      button.addEventListener("click", hideQuoteModal);
    });
  }

  // Service CTA buttons
  const serviceCTAButtons = document.querySelectorAll(".service-cta-button");
  serviceCTAButtons.forEach((button) => {
    button.addEventListener("click", function () {
      showQuoteModal();
    });
  });

  // Initialize testimonials safely
  function initTestimonials() {
    if (!testimonialDotsContainer || !testimonialText) return;

    state.testimonials.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add("testimonial-dot");
      if (index === state.activeTestimonial) dot.classList.add("active");
      dot.setAttribute("aria-label", `View testimonial ${index + 1}`);
      dot.addEventListener("click", () => {
        state.activeTestimonial = index;
        updateTestimonials();
      });
      testimonialDotsContainer.appendChild(dot);
    });
    updateTestimonials();
  }

  function updateTestimonials() {
    if (!testimonialText || !testimonialName || !testimonialRole) return;

    const current = state.testimonials[state.activeTestimonial];
    testimonialText.textContent = current.text;
    testimonialName.textContent = current.name;
    testimonialRole.textContent = current.role;

    document.querySelectorAll(".testimonial-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === state.activeTestimonial);
    });
  }

  // Form handling
  function handleFormSubmit(event, isQuoteForm = false) {
    event.preventDefault();
    const formElements = isQuoteForm
      ? [
          document.getElementById("quote-name"),
          document.getElementById("quote-email"),
          document.getElementById("quote-phone"),
          document.getElementById("quote-message"),
        ]
      : [
          document.getElementById("contact-name"),
          document.getElementById("contact-email"),
          document.getElementById("contact-phone"),
          document.getElementById("contact-message"),
        ];

    formElements.forEach((element) => {
      if (element) element.value = "";
    });

    if (isQuoteForm) {
      hideQuoteModal();
      alert("Thank you for your request! We'll contact you shortly.");
    } else {
      alert("Thank you for your message! We will get back to you soon.");
    }
  }

  // Event listeners for quote buttons
  quoteButtons.forEach((button) => {
    button.addEventListener("click", showQuoteModal);
  });

  if (ctaButton) {
    ctaButton.addEventListener("click", showQuoteModal);
  }

  if (quoteModal) {
    quoteModal.addEventListener("click", (event) => {
      if (event.target === quoteModal) hideQuoteModal();
    });
  }

  // Form submissions
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => handleFormSubmit(e, false));
  }

  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => handleFormSubmit(e, true));
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Initialize components
  initTestimonials();
  setupCloseModal();
  hideQuoteModal(); // Ensure modal starts hidden

  // Escape key listener for modal
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && quoteModal && !quoteModal.hidden) {
      hideQuoteModal();
    }
  });
});
