// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Form Validation and Submission
const reservationForm = document.querySelector('.reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const formData = new FormData(this);
        let isValid = true;
        let firstInvalidField = null;
        
        for (let [key, value] of formData.entries()) {
            if (!value && key !== 'special-requests') {
                isValid = false;
                firstInvalidField = key;
                break;
            }
        }
        
        if (!isValid) {
            const field = document.getElementById(firstInvalidField);
            field.focus();
            field.classList.add('error');
            alert(`Please fill in the ${firstInvalidField} field`);
            return;
        }
        
        // Here you would typically send the form data to a server
        alert('Reservation submitted successfully! We will contact you shortly.');
        this.reset();
    });

    // Remove error class when user starts typing
    reservationForm.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
}

// Add current year to footer copyright
document.querySelector('.footer-bottom p').innerHTML = 
    `&copy; ${new Date().getFullYear()} Luxury Dining. All rights reserved.`;

// Add scroll reveal animation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Initialize sections with fade-in effect
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Add hover effect to restaurant cards
document.querySelectorAll('.restaurant-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add smooth scroll to top button
const scrollToTop = document.createElement('button');
scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTop.className = 'scroll-to-top';
document.body.appendChild(scrollToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTop.style.display = 'block';
    } else {
        scrollToTop.style.display = 'none';
    }
});

scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize LightGallery for image gallery
document.addEventListener('DOMContentLoaded', function() {
    lightGallery(document.getElementById('gallery-grid'), {
        selector: '.gallery-item',
        download: false,
        counter: false
    });
});

// Testimonials Slider
class TestimonialSlider {
    constructor() {
        this.slider = document.querySelector('.testimonials-slider');
        this.testimonials = document.querySelectorAll('.testimonial');
        this.currentIndex = 0;
        this.interval = null;
        
        if (this.slider && this.testimonials.length > 0) {
            this.init();
        }
    }

    init() {
        // Show first testimonial
        this.showTestimonial(this.currentIndex);
        
        // Start auto-sliding
        this.startAutoSlide();
        
        // Add event listeners for manual navigation
        this.addNavigationListeners();
    }

    showTestimonial(index) {
        this.testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    nextTestimonial() {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.showTestimonial(this.currentIndex);
    }

    prevTestimonial() {
        this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.showTestimonial(this.currentIndex);
    }

    startAutoSlide() {
        this.interval = setInterval(() => {
            this.nextTestimonial();
        }, 5000);
    }

    stopAutoSlide() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    addNavigationListeners() {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-nav prev';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-nav next';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        this.slider.appendChild(prevBtn);
        this.slider.appendChild(nextBtn);
        
        prevBtn.addEventListener('click', () => {
            this.stopAutoSlide();
            this.prevTestimonial();
            this.startAutoSlide();
        });
        
        nextBtn.addEventListener('click', () => {
            this.stopAutoSlide();
            this.nextTestimonial();
            this.startAutoSlide();
        });
    }
}

// Initialize the testimonial slider
new TestimonialSlider();

// Enhanced form validation
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.hasAttribute('required')) {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        }
        
        // Email validation
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
        
        // Phone validation
        if (input.type === 'tel') {
            const phoneRegex = /^\+?[\d\s-]{10,}$/;
            if (!phoneRegex.test(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Enhanced scroll to top button
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
    } else {
        scrollToTopBtn.style.opacity = '0';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}); 