// Modern Portfolio Main JavaScript
class ModernPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoading();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupTypingEffect();
        this.setupStatsCounter();
        this.setupSkillBars();
        this.setupParallax();
        this.setupTheme();
        this.setupForm();
        this.setupModals();
        this.setupSmoothScroll();
        this.setupIntersectionObserver();
        this.setupPerformanceOptimizations();
        
        // Manual trigger for stats after a delay
        setTimeout(() => {
            this.triggerStatsManually();
        }, 3000);
    }
    
    triggerStatsManually() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            if (!stat.classList.contains('animated')) {
                stat.classList.add('animated');
                this.animateCounter(stat);
            }
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Loading Screen Management
    setupLoading() {
        window.addEventListener('load', () => {
            const loader = document.getElementById('loader');
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.classList.add('loaded');
                this.triggerEntryAnimations();
            }, 1000);
        });
    }

    triggerEntryAnimations() {
        // Trigger hero animations
        const heroText = document.querySelector('.hero-text');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroText) heroText.style.animation = 'slideInLeft 1s ease-out forwards';
        if (heroVisual) heroVisual.style.animation = 'slideInRight 1s ease-out forwards';
    }

    // Navigation Management
    setupNavigation() {
        const nav = document.getElementById('nav');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        let lastScrollY = window.scrollY;

        // Mobile menu toggle
        navToggle?.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle?.classList.remove('active');
                navMenu?.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && navMenu?.classList.contains('active')) {
                navToggle?.classList.remove('active');
                navMenu?.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Navbar scroll effects
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add/remove scrolled class
            if (currentScrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });

        // Active link highlighting
        this.updateActiveNavLink();
        window.addEventListener('scroll', () => this.updateActiveNavLink());
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Scroll Effects
    setupScrollEffects() {
        // Parallax effect for floating elements
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const floatingElements = document.querySelectorAll('.floating-element');
            
            floatingElements.forEach((element, index) => {
                const speed = parseFloat(element.dataset.speed) || 1;
                const yPos = -(scrollY * speed * 0.5);
                element.style.transform = `translateY(${yPos}px) rotate(${scrollY * 0.1}deg)`;
            });
        });
    }

    // Animation Setup
    setupAnimations() {
        // Staggered animations for elements
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach((element, index) => {
            element.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    // Typing Effect
    setupTypingEffect() {
        const heroName = document.querySelector('.hero-name');
        if (!heroName) return;

        const text = heroName.textContent;
        heroName.innerHTML = '';
        
        let charIndex = 0;
        const typeSpeed = 100;
        
        function typeWriter() {
            if (charIndex < text.length) {
                heroName.innerHTML += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                // Add cursor blink effect
                heroName.classList.add('typing-complete');
            }
        }

        // Start typing effect after page load
        setTimeout(typeWriter, 1500);
    }

    // Stats Counter Animation
    setupStatsCounter() {
        const stats = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element) => {
            const target = parseInt(element.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 16);
        };

        // Trigger counter animation when stats come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(statNumber => {
                        if (!statNumber.classList.contains('animated')) {
                            statNumber.classList.add('animated');
                            animateCounter(statNumber);
                        }
                    });
                }
            });
        }, {
            threshold: 0.5
        });

        const statsContainer = document.querySelector('.hero-stats');
        if (statsContainer) {
            observer.observe(statsContainer);
        } else {
            // Fallback: animate immediately if stats container not found
            stats.forEach(stat => {
                if (!stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    animateCounter(stat);
                }
            });
        }
    }

    // Skill Bars Animation
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        const animateSkillBar = (bar) => {
            const level = bar.dataset.level;
            setTimeout(() => {
                bar.style.width = level + '%';
            }, 200);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-bar');
                    skillBars.forEach((bar, index) => {
                        if (!bar.classList.contains('animated')) {
                            bar.classList.add('animated');
                            setTimeout(() => animateSkillBar(bar), index * 200);
                        }
                    });
                }
            });
        });

        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    // Parallax Effects
    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Theme Management
    setupTheme() {
        // Auto theme detection
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Listen for theme changes
        prefersDarkScheme.addEventListener('change', (e) => {
            // Portfolio is already dark themed, but could add light theme toggle here
        });

        // Add theme color animation
        this.animateThemeColors();
    }

    animateThemeColors() {
        const gradientElements = document.querySelectorAll('.hero-name, .logo-text');
        
        gradientElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animationDuration = '0.5s';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.animationDuration = '3s';
            });
        });
    }

    // Form Handling
    setupForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formButton = contactForm.querySelector('.form-submit');
            const originalText = formButton.innerHTML;
            
            // Show loading state
            formButton.innerHTML = '<span>Sending...</span>';
            formButton.disabled = true;
            
            try {
                // Simulate form submission (replace with actual endpoint)
                await this.simulateFormSubmission(formData);
                
                // Success feedback
                this.showNotification('Message sent successfully!', 'success');
                contactForm.reset();
                
            } catch (error) {
                // Error feedback
                this.showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                // Reset button
                formButton.innerHTML = originalText;
                formButton.disabled = false;
            }
        });
    }

    async simulateFormSubmission(formData) {
        // Replace this with actual form submission logic
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure
                Math.random() > 0.1 ? resolve() : reject();
            }, 2000);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    // Modal Management
    setupModals() {
        window.downloadCV = () => {
            const modal = document.getElementById('cv-modal');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        window.closeCVModal = () => {
            const modal = document.getElementById('cv-modal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    window.closeCVModal();
                }
            }
        });
    }

    // Smooth Scrolling
    setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Intersection Observer for Animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Observe all elements with animation class
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }

        // Debounce scroll events
        let scrollTimeout;
        const originalScrollHandler = window.onscroll;
        
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                cancelAnimationFrame(scrollTimeout);
            }
            
            scrollTimeout = requestAnimationFrame(() => {
                // Custom scroll logic here
            });
        });

        // Preload critical resources
        this.preloadResources();
    }

    preloadResources() {
        const criticalImages = [
            'assets/images/profile.jpg',
            'assets/images/medflow.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = src;
            link.as = 'image';
            document.head.appendChild(link);
        });
    }

    // Utility Methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Resize handler
    handleResize() {
        // Update any size-dependent calculations
        this.updateActiveNavLink();
        
        // Reset mobile menu on resize
        if (window.innerWidth > 768) {
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Enhanced CSS for better animations and interactions
const additionalStyles = `
    /* Additional CSS for enhanced animations */
    .notification {
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    }
    
    .notification-success {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
    }
    
    .notification-error {
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .project-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .project-card:hover .project-overlay {
        opacity: 1;
    }
    
    .project-overlay-content {
        display: flex;
        gap: 1rem;
    }
    
    .overlay-btn {
        width: 5rem;
        height: 5rem;
        background: var(--primary-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    
    .overlay-btn:hover {
        background: var(--primary-light);
        transform: scale(1.1);
    }
    
    .overlay-btn svg {
        width: 2rem;
        height: 2rem;
    }
    
    .project-category {
        display: inline-block;
        background: var(--primary-color);
        color: white;
        padding: 0.4rem 1rem;
        border-radius: 2rem;
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    
    .project-image-container {
        position: relative;
        overflow: hidden;
        border-radius: 1rem 1rem 0 0;
    }
    
    .typing-complete::after {
        content: "|";
        animation: blink 1s infinite;
        margin-left: 2px;
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @media (max-width: 768px) {
        .notification {
            top: 1rem;
            right: 1rem;
            left: 1rem;
            max-width: none;
        }
        
        .project-overlay {
            opacity: 1;
            background: rgba(0, 0, 0, 0.6);
        }
        
        .project-card.active .project-overlay {
            opacity: 1;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new ModernPortfolio();
    
    // Handle window resize
    window.addEventListener('resize', portfolio.debounce(() => {
        portfolio.handleResize();
    }, 250));
    
    // Global error handling
    window.addEventListener('error', (e) => {
        console.error('Portfolio Error:', e.error);
    });
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`Page loaded in ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            }, 0);
        });
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernPortfolio;
} 