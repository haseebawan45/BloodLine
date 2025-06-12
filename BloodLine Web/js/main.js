document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Create mobile menu styles dynamically
            if (!document.getElementById('mobile-menu-styles')) {
                const style = document.createElement('style');
                style.id = 'mobile-menu-styles';
                style.textContent = `
                    .nav-links.active {
                        display: flex;
                        flex-direction: column;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: white;
                        padding: 1rem;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                        z-index: 1000;
                    }
                `;
                document.head.appendChild(style);
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                
                // Scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Screenshot slider functionality
    const sliderContainer = document.querySelector('.screenshot-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    const screenshots = document.querySelectorAll('.screenshot');
    
    if (sliderContainer && screenshots.length > 0) {
        let currentIndex = 0;
        const screenshotWidth = screenshots[0].offsetWidth + 32; // Width + gap
        
        // Update slider position
        function updateSlider() {
            sliderContainer.scrollLeft = currentIndex * screenshotWidth;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
        
        // Event listeners for navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (currentIndex < screenshots.length - 1) {
                    currentIndex++;
                    updateSlider();
                }
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', function() {
                currentIndex = i;
                updateSlider();
            });
        });
        
        // Touch events for mobile swiping
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swiped left
                if (currentIndex < screenshots.length - 1) {
                    currentIndex++;
                    updateSlider();
                }
            }
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swiped right
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            }
        }
    }

    // Form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            let isValid = true;
            
            // Reset previous error states
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('error');
                const existingError = group.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
            });
            
            // Validate name
            if (name.value.trim() === '') {
                displayError(name, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            if (email.value.trim() === '') {
                displayError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                displayError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate subject
            if (subject.value.trim() === '') {
                displayError(subject, 'Subject is required');
                isValid = false;
            }
            
            // Validate message
            if (message.value.trim() === '') {
                displayError(message, 'Message is required');
                isValid = false;
            }
            
            // Submit the form if valid
            if (isValid) {
                // Here you would typically send the data to a server
                // For now, display a success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you! Your message has been sent.';
                contactForm.appendChild(successMessage);
                
                // Reset the form
                contactForm.reset();
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
        
        // Add error display function
        function displayError(input, message) {
            const formGroup = input.closest('.form-group');
            formGroup.classList.add('error');
            
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            formGroup.appendChild(errorElement);
            
            // Add error styles dynamically
            if (!document.getElementById('form-error-styles')) {
                const style = document.createElement('style');
                style.id = 'form-error-styles';
                style.textContent = `
                    .form-group.error input,
                    .form-group.error textarea {
                        border-color: var(--error-color);
                    }
                    
                    .error-message {
                        color: var(--error-color);
                        font-size: 0.85rem;
                        margin-top: 5px;
                    }
                    
                    .success-message {
                        color: var(--success-color);
                        padding: 10px;
                        margin-top: 15px;
                        background-color: rgba(76, 175, 80, 0.1);
                        border-radius: var(--border-radius);
                        text-align: center;
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        // Email validation function
        function isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.toLowerCase());
        }
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const input = newsletterForm.querySelector('input');
            if (!input.value || !isValidEmail(input.value)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Success message
            const originalHTML = newsletterForm.innerHTML;
            newsletterForm.innerHTML = '<p class="success">Thank you for subscribing!</p>';
            
            // Reset after 3 seconds
            setTimeout(() => {
                newsletterForm.innerHTML = originalHTML;
                const emailInput = newsletterForm.querySelector('input');
                if (emailInput) {
                    emailInput.value = '';
                }
                attachNewsletterFormListener();
            }, 3000);
        });
        
        function isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.toLowerCase());
        }
        
        function attachNewsletterFormListener() {
            const form = document.querySelector('.newsletter-form');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    // Same logic as above
                });
            }
        }
    }

    // Animation on scroll
    const elementsToAnimate = document.querySelectorAll('.feature-card, .step, .screenshot, .testimonial');
    
    // Create observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Add animation styles dynamically
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .feature-card, .step, .screenshot, .testimonial {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .step.animate, .screenshot.animate, .testimonial.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyles);
    
    // Observe elements
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}); 