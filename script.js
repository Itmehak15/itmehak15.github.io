document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    const applyNavbarStyle = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    applyNavbarStyle();
    window.addEventListener('scroll', applyNavbarStyle);

    // --- Smooth Scrolling for Navigation Links & Active Class Update ---
    const navLinksElements = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    navLinksElements.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Determine scroll position considering fixed navbar
                const scrollOffset = targetElement.offsetTop - navbar.offsetHeight;

                window.scrollTo({
                    top: scrollOffset,
                    behavior: 'smooth'
                });

                // Update active class immediately on click
                navLinksElements.forEach(link => link.classList.remove('active'));
                this.classList.add('active');

                // Close hamburger menu on link click (for mobile)
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Intersection Observer for Active Navbar Link on Scroll
    const observerOptions = {
        root: null, // viewport
        rootMargin: `-${navbar.offsetHeight}px 0px -50% 0px`, // Navbar height from top, 50% from bottom
        threshold: 0 // Trigger when any part of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all links first
                navLinksElements.forEach(link => link.classList.remove('active'));
                // Add active to the link corresponding to the intersecting section
                const currentNavLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (currentNavLink) {
                    currentNavLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // --- Hamburger Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // --- Lightbox Functionality ---
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.close-btn');

    document.querySelectorAll('.collection-image img, .designer-image img, .weddings article img, #gallery .carousel-slide img').forEach(image => {
        image.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImage) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // --- "See More" Collections Functionality ---
    const collectionsContainer = document.getElementById('collections-container');
    const viewMoreCollectionsBtn = document.getElementById('view-more-collections');
    const hiddenCollectionCards = Array.from(collectionsContainer.querySelectorAll('.collection-card.hidden-card'));

    hiddenCollectionCards.forEach((card) => {
        card.style.display = 'none';
    });

    if (hiddenCollectionCards.length === 0) {
        viewMoreCollectionsBtn.style.display = 'none';
    }

    viewMoreCollectionsBtn.addEventListener('click', () => {
        if (viewMoreCollectionsBtn.textContent === 'See More Collections') {
            hiddenCollectionCards.forEach(card => {
                card.style.display = 'flex';
            });
            viewMoreCollectionsBtn.textContent = 'Show Less Collections';
        } else {
            hiddenCollectionCards.forEach(card => {
                card.style.display = 'none';
            });
            viewMoreCollectionsBtn.textContent = 'See More Collections';
            window.scrollTo({
                top: collectionsContainer.offsetTop - navbar.offsetHeight,
                behavior: 'smooth'
            });
        }
    });

    // --- "See More" Events Functionality ---
    const weddingsContainer = document.getElementById('weddings-container');
    const viewMoreEventsBtn = document.getElementById('view-more-events');
    const hiddenEventCards = Array.from(weddingsContainer.querySelectorAll('.hidden-card'));

    hiddenEventCards.forEach((card) => {
        card.style.display = 'none';
    });

    if (hiddenEventCards.length === 0) {
        viewMoreEventsBtn.style.display = 'none';
    }

    viewMoreEventsBtn.addEventListener('click', () => {
        if (viewMoreEventsBtn.textContent === 'See More Events') {
            hiddenEventCards.forEach(card => {
                card.style.display = 'flex';
            });
            viewMoreEventsBtn.textContent = 'Show Less Events';
        } else {
            hiddenEventCards.forEach(card => {
                card.style.display = 'none';
            });
            viewMoreEventsBtn.textContent = 'See More Events';
            window.scrollTo({
                top: weddingsContainer.offsetTop - navbar.offsetHeight,
                behavior: 'smooth'
            });
        }
    });

    // --- Card Click Navigation (Collections and Designers) ---
    document.querySelectorAll('.collection-card, .designer-card, .weddings article').forEach(card => {
        card.addEventListener('click', function() {
            const pageUrl = this.dataset.page;
            if (pageUrl) {
                // In a real scenario, you'd navigate:
                // window.location.href = pageUrl;
                // For this demonstration, we'll just log and show a message:
                const cardTitleElement = this.querySelector('.collection-title, .card-title');
                const cardTitle = cardTitleElement ? cardTitleElement.textContent : 'Card';
                showFeedbackMessage(`Navigating to details for: "${cardTitle}" (simulated to ${pageUrl})`, 'success');
                console.log(`Navigating to: ${pageUrl}`);
            }
        });
    });


    // --- Contact Form Submission (Dummy) ---
    const contactForm = document.getElementById('contact-form');
    const formFeedbackMessage = document.getElementById('form-feedback-message');

    function showFeedbackMessage(message, type) {
        formFeedbackMessage.textContent = message;
        formFeedbackMessage.className = '';
        formFeedbackMessage.classList.add('fade-in');
        if (type === 'success') {
            formFeedbackMessage.style.backgroundColor = '#d4edda';
            formFeedbackMessage.style.color = '#155724';
        } else if (type === 'error') {
            formFeedbackMessage.style.backgroundColor = '#f8d7da';
            formFeedbackMessage.style.color = '#721c24';
        }
        formFeedbackMessage.style.opacity = '1';

        setTimeout(() => {
            formFeedbackMessage.style.opacity = '0';
            formFeedbackMessage.classList.remove('fade-in');
        }, 5000);
    }

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();

        if (name && email && message && email.includes('@') && email.includes('.')) {
            showFeedbackMessage('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        } else {
            showFeedbackMessage('Please fill in all fields correctly.', 'error');
        }
    });

    // --- Scroll-to-Top Button ---
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Light/Dark Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
        document.body.classList.add('dark-mode');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        document.body.classList.remove('dark-mode');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            localStorage.setItem('theme', 'light');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    });

    // --- Event Schedule Modal ---
    const openScheduleModalBtn = document.getElementById('open-schedule-modal');
    const eventScheduleModal = document.getElementById('event-schedule-modal');
    const modalCloseBtn = eventScheduleModal.querySelector('.modal-close-btn');

    openScheduleModalBtn.addEventListener('click', () => {
        eventScheduleModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    modalCloseBtn.addEventListener('click', () => {
        eventScheduleModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    eventScheduleModal.addEventListener('click', (e) => {
        if (e.target === eventScheduleModal) {
            eventScheduleModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // --- Image Carousel/Gallery ---
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const carouselPrevBtn = document.querySelector('.carousel-prev');
    const carouselNextBtn = document.querySelector('.carousel-next');
    const carouselDotsContainer = document.querySelector('.carousel-dots');

    let currentIndex = 0;
    const totalImages = carouselImages.length;
    let autoSlideInterval;

    // Create dots
    for (let i = 0; i < totalImages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        dot.setAttribute('aria-controls', `carousel-image-${i}`);
        dot.setAttribute('tabindex', '0');

        if (i === 0) {
            dot.classList.add('active');
        }
        dot.dataset.index = i;
        carouselDotsContainer.appendChild(dot);
        dot.addEventListener('click', (e) => {
            currentIndex = parseInt(e.target.dataset.index);
            updateCarousel();
            resetAutoSlide();
        });
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentIndex = parseInt(e.target.dataset.index);
                updateCarousel();
                resetAutoSlide();
            }
        });
    }

    const updateCarousel = () => {
        const translateXValue = -currentIndex * 100;
        carouselSlide.style.transform = `translateX(${translateXValue}%)`;

        carouselDotsContainer.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
                dot.setAttribute('aria-selected', 'true');
            } else {
                dot.classList.remove('active');
                dot.setAttribute('aria-selected', 'false');
            }
        });

        carouselImages.forEach((img, index) => {
            if (index === currentIndex) {
                img.setAttribute('aria-hidden', 'false');
            } else {
                img.setAttribute('aria-hidden', 'true');
            }
        });
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    };

    carouselNextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    carouselPrevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    const startAutoSlide = () => {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    const resetAutoSlide = () => {
        stopAutoSlide();
        startAutoSlide();
    };

    startAutoSlide();

    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);

    updateCarousel();
});
