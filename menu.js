document.addEventListener('DOMContentLoaded', function() {
    // Initialize menu items with cart buttons
    initializeMenuItems();
    
    // Add smooth scrolling for navigation
    initializeSmoothScrolling();

    // Check for table number in URL
    const urlParams = new URLSearchParams(window.location.search);
    const tableNumber = urlParams.get('table');

    if (tableNumber) {
        console.log('Table number detected:', tableNumber);
        // Table number will be handled by cart.js
    }

    // Menu Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCategories = document.querySelectorAll('.menu-category');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            // Filter menu items
            menuCategories.forEach(categoryElement => {
                if (category === 'all' || categoryElement.getAttribute('data-category') === category) {
                    categoryElement.classList.remove('hidden');
                    // Add animation class
                    categoryElement.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    categoryElement.classList.add('hidden');
                }
            });
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Scroll to top button
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

    // Lazy loading for images
    const images = document.querySelectorAll('.item-image img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.dataset.src = img.src;
            img.src = 'images/placeholder.jpg';
            imageObserver.observe(img);
        });
    }

    // Add hover effects to menu cards
    document.querySelectorAll('.menu-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add scroll reveal animation
    const sections = document.querySelectorAll('.menu-section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });

    // Initialize sections with fade-in effect
    document.querySelectorAll('.menu-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
});

function initializeMenuItems() {
    // Add cart buttons to all menu items
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
        const priceElement = card.querySelector('.price');
        const nameElement = card.querySelector('.name');
        
        if (priceElement && nameElement) {
            const price = parseFloat(priceElement.textContent.replace('€', ''));
            const name = nameElement.textContent;
            
            // Add cart button if it doesn't exist
            if (!card.querySelector('.add-to-cart')) {
                const cartButton = document.createElement('button');
                cartButton.className = 'add-to-cart';
                cartButton.textContent = 'Add to Cart';
                cartButton.onclick = () => addToCart(name, price);
                card.querySelector('.menu-info').appendChild(cartButton);
            }
        }
    });
}

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
} 