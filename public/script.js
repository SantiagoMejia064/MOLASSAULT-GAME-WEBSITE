/* ========================================
   MOLASSAULT - JAVASCRIPT
   Video Game Development Portfolio
   ======================================== */

// ========================================
// DOM CONTENT LOADED
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initParticles();
    initScrollAnimations();
    initWeekCards();
    initWorldTabs();
    initWeeksFilter();
    initProgressBar();
    initSmoothScroll();
    initGalleryLightbox();
});

// ========================================
// NAVIGATION
// ========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Active link highlight on scroll
    const sections = document.querySelectorAll('section[id]');
    
    const updateActiveLink = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    };
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Call on page load
}

// ========================================
// HERO PARTICLES
// ========================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random delay
        particle.style.animationDelay = Math.random() * 15 + 's';
        
        // Random duration
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
    }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe story cards
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => observer.observe(card));

    // Observe other animated elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Observe section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('fade-in');
        observer.observe(header);
    });

    // Observe cards
    const cards = document.querySelectorAll('.about-card, .gameplay-card, .team-card, .theme-card, .element-card, .stat-card');
    cards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = (index % 6) * 0.1 + 's';
        observer.observe(card);
    });

    // Observe gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = (index % 8) * 0.05 + 's';
        observer.observe(item);
    });
}

// ========================================
// WEEK CARDS (EXPANDABLE)
// ========================================
function initWeekCards() {
    const weekCards = document.querySelectorAll('.week-card');

    weekCards.forEach(card => {
        const header = card.querySelector('.week-header');
        
        header.addEventListener('click', () => {
            // Close other cards (optional - comment out for multiple open)
            // weekCards.forEach(otherCard => {
            //     if (otherCard !== card) {
            //         otherCard.classList.remove('expanded');
            //     }
            // });

            // Toggle current card
            card.classList.toggle('expanded');
        });
    });

    // Open first card by default
    if (weekCards.length > 0) {
        weekCards[0].classList.add('expanded');
    }
}

// ========================================
// WORLD TABS
// ========================================
function initWorldTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update active panel
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === tabId) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

// ========================================
// WEEKS FILTER
// ========================================
function initWeeksFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const weekCards = document.querySelectorAll('.week-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter cards
            weekCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ========================================
// PROGRESS BAR ANIMATION
// ========================================
function initProgressBar() {
    const progressBar = document.getElementById('mainProgressBar');
    if (!progressBar) return;

    const progressSection = document.getElementById('projectProgress');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate progress bar to 69% (current project progress)
                setTimeout(() => {
                    progressBar.style.width = '69%';
                }, 300);
                
                // Animate stat numbers
                animateStats();
                
                // Only animate once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(progressSection);
}

// ========================================
// ANIMATE STATISTICS
// ========================================
function animateStats() {
    const completedWeeks = document.getElementById('completedWeeks');
    const progressPercent = document.getElementById('progressPercent');

    if (completedWeeks) {
        animateValue(completedWeeks, 0, 11, 1500, '');
    }

    if (progressPercent) {
        animateValue(progressPercent, 0, 69, 1500, '%');
    }
}

function animateValue(element, start, end, duration, suffix) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const current = Math.round(start + range * easeOut);
        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// PARALLAX EFFECT (OPTIONAL)
// ========================================
function initParallax() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        if (hero) {
            hero.style.backgroundPositionY = rate + 'px';
        }
    });
}

// ========================================
// GALLERY LIGHTBOX
// ========================================
function initGalleryLightbox() {
    // Obtener elementos del DOM
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxType = document.getElementById('lightboxType');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    
    // Validar que existen los elementos
    if (!lightbox || !lightboxImage) {
        console.error('Lightbox elements not found');
        return;
    }
    
    let currentIndex = 0;
    let images = [];

    // Recolectar imágenes de la galería
    document.querySelectorAll('.gallery-item .gallery-image').forEach((img) => {
        images.push({
            src: img.src,
            alt: img.alt,
            title: img.closest('.gallery-item').querySelector('.gallery-title')?.textContent || '',
            type: img.closest('.gallery-item').querySelector('.gallery-type')?.textContent || ''
        });
    });

    console.log('Gallery images found:', images.length);

    // Función para abrir el lightbox
    function showLightbox(index) {
        console.log('Opening lightbox at index:', index);
        if (images.length === 0) return;
        
        currentIndex = Math.max(0, Math.min(index, images.length - 1));
        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt;
        if (lightboxTitle) lightboxTitle.textContent = images[currentIndex].title;
        if (lightboxType) lightboxType.textContent = images[currentIndex].type;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Función para cerrar el lightbox
    function hideLightbox() {
        console.log('Closing lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Agregar click listeners a cada imagen
    document.querySelectorAll('.gallery-item .gallery-image').forEach((img, idx) => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Image clicked:', idx);
            showLightbox(idx);
        });
    });

    // Event listeners para los controles
    if (lightboxClose) {
        lightboxClose.addEventListener('click', hideLightbox);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            lightboxImage.src = images[currentIndex].src;
            lightboxImage.alt = images[currentIndex].alt;
            if (lightboxTitle) lightboxTitle.textContent = images[currentIndex].title;
            if (lightboxType) lightboxType.textContent = images[currentIndex].type;
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            lightboxImage.src = images[currentIndex].src;
            lightboxImage.alt = images[currentIndex].alt;
            if (lightboxTitle) lightboxTitle.textContent = images[currentIndex].title;
            if (lightboxType) lightboxType.textContent = images[currentIndex].type;
        });
    }

    // Cerrar al hacer click en el fondo
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            hideLightbox();
        }
    });

    // Teclas del teclado
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            hideLightbox();
        } else if (e.key === 'ArrowRight') {
            if (lightboxNext) lightboxNext.click();
        } else if (e.key === 'ArrowLeft') {
            if (lightboxPrev) lightboxPrev.click();
        }
    });
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// ========================================
// PERFORMANCE: DEBOUNCE SCROLL EVENTS
// ========================================
function debounce(func, wait) {
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

// ========================================
// LOADING STATE
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
});

// Add initial loading styles
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        heroContent.style.transition = 'all 0.8s ease 0.3s';
    }
});
