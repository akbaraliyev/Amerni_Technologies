document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    if (navbar && navLinks) {
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.setAttribute('aria-label', 'Menu');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        navbar.appendChild(hamburger);

        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('mobile-open');
            hamburger.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.classList.toggle('menu-open', isOpen);
        });

        // Close menu when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Slider Arrows Logic
    const nextBtn = document.getElementById('nextSlide');
    const prevBtn = document.getElementById('prevSlide');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            console.log('Next slide clicked');
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            console.log('Previous slide clicked');
        });
    }

    // Sticky Navbar Logic 
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Infinite Logo Marquee & Center Scale
    const track = document.getElementById('logo-track');
    if (track) {
        track.innerHTML += track.innerHTML; 
        
        const items = document.querySelectorAll('.logo-item');
        let scrollPos = 0;
        const scrollSpeed = 1; 

        function animateLogos() {
            scrollPos -= scrollSpeed; 
            if (Math.abs(scrollPos) >= track.scrollWidth / 2) {
                scrollPos = 0;
            }
            track.style.transform = `translateX(${scrollPos}px)`;

            const windowCenter = window.innerWidth / 2;
            
            items.forEach(item => {
                const rect = item.getBoundingClientRect();
                const itemCenter = rect.left + (rect.width / 2);
                const distance = Math.abs(windowCenter - itemCenter);
                
                const maxDistance = 400; 
                let scale = 1; 
                
                if (distance < maxDistance) {
                    scale = 1 + (0.5 * (1 - (distance / maxDistance)));
                }
                
                item.style.transform = `scale(${scale})`;
                if (scale > 1.1) {
                    item.style.opacity = 1;
                } else {
                    item.style.opacity = 0.5;
                }
            });

            requestAnimationFrame(animateLogos);
        }
        animateLogos();
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.accordion-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                if(faq.querySelector('i')) {
                    faq.querySelector('i').className = 'fa-solid fa-angles-right'; 
                }
            });

            // Open clicked
            if (!isActive) {
                item.classList.add('active');
                if(item.querySelector('i')) {
                    item.querySelector('i').className = 'fa-solid fa-chevron-down';
                }
            }
        });
    });

    // Testimonial Auto-Scroll Logic 
    const testTrack = document.getElementById('testimonialTrack');
    const testCards = document.querySelectorAll('.testimonial-card');
    
    if (testTrack && testCards.length > 0) {
        let currentTestimonial = 0;
        
        function slideTestimonials() {
            currentTestimonial++;
            
            if (currentTestimonial > testCards.length - 3) {
                currentTestimonial = 0;
            }
            
            const cardWidth = testCards[0].offsetWidth + 30; // 30 is the gap
            testTrack.style.transform = `translateX(-${currentTestimonial * cardWidth}px)`;
        }

        setInterval(slideTestimonials, 4000);
    }

    // Offering Carousel (What We're Offering)
    const offeringTrack = document.querySelector('.offering-track');
    const offerCardsCarousel = document.querySelectorAll('.offering-track .offer-card');
    const offeringPrev = document.querySelector('.offering-prev');
    const offeringNext = document.querySelector('.offering-next');

    if (offeringTrack && offerCardsCarousel.length > 0 && offeringPrev && offeringNext) {
        let currentOfferIndex = 0;

        function getOfferCardsPerView() {
            if (window.innerWidth >= 1001) return 5;
            if (window.innerWidth >= 768) return 3;
            if (window.innerWidth >= 600) return 2;
            return 1;
        }

        function updateOfferingCarousel() {
            const cardsPerView = getOfferCardsPerView();
            const maxIndex = Math.max(0, offerCardsCarousel.length - cardsPerView);
            if (currentOfferIndex > maxIndex) currentOfferIndex = maxIndex;
            if (currentOfferIndex < 0) currentOfferIndex = 0;

            const cardWidth = offerCardsCarousel[0].offsetWidth + 15; // 15 is gap
            offeringTrack.style.transform = `translateX(-${currentOfferIndex * cardWidth}px)`;

            offeringPrev.disabled = currentOfferIndex === 0;
            offeringNext.disabled = currentOfferIndex >= maxIndex;
        }

        offeringNext.addEventListener('click', () => {
            const cardsPerView = getOfferCardsPerView();
            const maxIndex = Math.max(0, offerCardsCarousel.length - cardsPerView);
            if (currentOfferIndex < maxIndex) {
                currentOfferIndex++;
                updateOfferingCarousel();
            }
        });

        offeringPrev.addEventListener('click', () => {
            if (currentOfferIndex > 0) {
                currentOfferIndex--;
                updateOfferingCarousel();
            }
        });

        window.addEventListener('resize', updateOfferingCarousel);
        // Initial setup (slight delay to ensure layout is ready)
        requestAnimationFrame(updateOfferingCarousel);
    }

    // Services & Products Scroll-In Animation
    const animatedRows = document.querySelectorAll('.service-row, .product-row');
    if (animatedRows.length > 0 && 'IntersectionObserver' in window) {
        const rowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    rowObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedRows.forEach(row => rowObserver.observe(row));
    } else if (animatedRows.length > 0) {
        // Fallback: show all immediately
        animatedRows.forEach(row => row.classList.add('in-view'));
    }

    // Contact Form Submit Logic
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = (contactForm.elements['name'].value || '').trim();
            const phone = (contactForm.elements['phone'].value || '').trim();
            const email = (contactForm.elements['email'].value || '').trim();
            const industry = (contactForm.elements['industry'].value || '').trim();
            const message = (contactForm.elements['message'].value || '').trim();

            const subject = `New Contact Inquiry from ${name || 'Website Visitor'}`;
            const bodyLines = [
                `Name: ${name}`,
                `Phone: ${phone}`,
                `Email: ${email}`,
                `Industry: ${industry}`,
                ``,
                `Message:`,
                message
            ];
            const body = bodyLines.join('\n');

            const mailtoUrl = `mailto:info@amernitech.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Open the user's default email client with prefilled content
            window.location.href = mailtoUrl;

            const btn = contactForm.querySelector('.submit-btn');
            btn.innerText = "Message Sent!";
            btn.style.backgroundColor = "#28a745";

            setTimeout(() => {
                contactForm.reset();
                btn.innerText = "Send";
                btn.style.backgroundColor = "#11429b";
            }, 3000);
        });
    }
});