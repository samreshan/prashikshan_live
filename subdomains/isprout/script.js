
// Configuration Data (JSON Structure)
const siteConfig = {
    navigation: {
        logo: "iSprout",
        links: [
            { text: "Home", href: "#hero", active: true },
            { text: "About", href: "#about" },
            { text: "Eligibility", href: "#eligibility" },
            { text: "Impact", href: "#stats" },
            { text: "Contact", href: "#contact" }
        ],
        registerUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfyjs4TMD5TkR9k-IS0Fl2yECtdn_qpdteIlEBC2DUR3xaS6w/viewform"
    },
    hero: {
        title: "<img src='images/isproutLogo.png' alt='iSprout Logo' style='width:60%; height:auto; padding:0px margin:0px;'><div class='hero-tagline'>National Seed Fund Program</div>",
        tagline: "A National Student Seed-Funding Program empowering Nepal's most promising startups with funding, mentorship, and acceleration.",
        buttons: [
            {
                text: "Register Now",
                icon: "fas fa-rocket",
                type: "primary",
                href: "https://docs.google.com/forms/d/e/1FAIpQLSfyjs4TMD5TkR9k-IS0Fl2yECtdn_qpdteIlEBC2DUR3xaS6w/viewform"
            },
            {
                text: "Learn More",
                icon: "fas fa-arrow-right",
                type: "secondary",
                href: "#about"
            }
        ]
    },
    sections: [
        {
            id: "about",
            title: "About iSprout",
            subtitle: "Transforming innovative ideas into successful ventures through comprehensive support",
            type: "cards",
            gridCols: 2,
            background: "bg-white",
            items: [
                {
                    icon: "fas fa-seedling",
                    title: "Seed Funding & Selection",
                    description: "iSprout is a national program that supports Nepal's most promising startups. Selected teams can receive up to Rs. 5 crore in seed funding after going through a rigorous selection process."
                },
                {
                    icon: "fas fa-users",
                    title: "Mentorship & Workshops",
                    description: "Founders receive expert guidance through comprehensive workshops and personalized mentoring. They develop essential skills including pitch development, financial management, and strategic business planning."
                },
                {
                    icon: "fas fa-rocket",
                    title: "Startup Acceleration",
                    description: "Startups join an intensive 3-month acceleration program focused on product refinement and market validation. With continuous mentorship and milestone reviews, they become investment-ready."
                }
            ]
        },
        {
            id: "eligibility",
            title: "Eligibility Criteria",
            subtitle: "We're looking for passionate student entrepreneurs ready to transform their innovative ideas into successful ventures.",
            type: "cards",
            gridCols: 3,
            background: "bg-secondary",
            items: [
                {
                    icon: "fas fa-graduation-cap",
                    title: "Student Status",
                    description: "Participants must be enrolled in high school, currently on a gap year, or pursuing an undergraduate degree at the time of application."
                },
                {
                    icon: "fas fa-users-cog",
                    title: "Team Composition",
                    description: "Teams of 2-3 members with of students or recent graduates. Diverse skill sets and complementary expertise encouraged."
                },
                {
                    icon: "fas fa-lightbulb",
                    title: "Founders’ Role",
                    description: "All co-founders must be students or recent graduates (gap year included). External professionals or faculty cannot be formal co-founders."
                },
                {
                    icon: "fas fa-cogs",
                    title: "Development Stage",
                    description: "Ideas should be beyond conceptual stage with working prototype, MVP, initial market research, or demonstrable proof of concept."
                },
                {
                    icon: "fas fa-gavel",
                    title: "Legal Registration",
                    description: "If legally registered, the startup must be less than 1 year old at the time of application."
                },
                {
                    icon: "fas fa-clock",
                    title: "Funding History",
                    description: "The startup should have no major prior investment or external funding (angel, VC, or institutional). Small grants, competitions, or bootstrapped funds are acceptable."
                }
            ]
        },
        {
            id: "stats",
            title: "Our Impact",
            subtitle: "Driving innovation and entrepreneurship across Nepal's student community",
            type: "stats",
            gridCols: 4,
            background: "stats-section",
            items: [
                {
                    number: "5+",
                    label: "Startups Funded",
                    countUp: true,
                    target: 5
                },
                {
                    number: "₹5Cr",
                    label: "Funding Pool",
                    target: 5,
                    suffix: "Cr"
                },
                {
                    number: "100%",
                    label: "Success Rate",
                    countUp: true,
                    target: 100,
                    suffix: "%"
                },
                {
                    number: "50+",
                    label: "Mentors/ Investors",
                    countUp: true,
                    target: 50
                }
            ]
        },
        {
            id: "contact",
            title: "Get In Touch",
            subtitle: "Ready to transform your startup idea? Connect with us today.",
            type: "contact",
            background: "bg-white",
            contactInfo: [
                {
                    icon: "fas fa-map-marker-alt",
                    title: "Location",
                    content: "New Baneshwor, Kathmandu<br>Nepal"
                },
                {
                    icon: "fas fa-envelope",
                    title: "Email",
                    content: '<a href="mailto:isprout@prashikshan.edu.np">isprout@prashikshan.edu.np</a>'
                },
                {
                    icon: "fas fa-phone",
                    title: "Phone",
                    content: '<a href="tel:+9779862429374">+977 9862429374</a>'
                }
            ],
            formFields: [
                {
                    type: "row",
                    fields: [
                        { type: "text", name: "name", placeholder: "Your Name", required: true },
                        { type: "email", name: "email", placeholder: "Your Email", required: true }
                    ]
                },
                {
                    type: "single",
                    field: { type: "text", name: "subject", placeholder: "Subject", required: true }
                },
                {
                    type: "single",
                    field: { type: "textarea", name: "message", placeholder: "Tell us about your startup idea...", required: true }
                }
            ]
        }
    ]
};

// Dynamic Website Builder Class
class DynamicWebsite {
    constructor(config) {
        this.config = config;
        this.observers = [];
        this.init();
    }

async init() {
        this.renderNavigation();
        this.renderHero();
        this.renderSections();
        await this.renderPartnersSection(); // <-- Add this line
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupIntersectionObserver();
        this.initializeMicroInteractions();
    }

    renderNavigation() {
        const navLinks = document.getElementById('navLinks');
        const registerBtn = document.getElementById('registerBtn');

        // Render navigation links
        navLinks.innerHTML = this.config.navigation.links
            .map(link => `
                <li>
                    <a href="${link.href}" class="nav-link ${link.active ? 'active' : ''}" 
                        data-section="${link.href.substring(1)}">
                        ${link.text}
                    </a>
                </li>
            `).join('');

        // Set register button link
        registerBtn.onclick = () => window.open(this.config.navigation.registerUrl, '_blank');
    }

    renderHero() {
        const heroContent = document.getElementById('heroContent');
        const hero = this.config.hero;

        heroContent.innerHTML = `
            <div class="hero-logo">${hero.title}</div>
            <p class="hero-tagline">${hero.tagline}</p>
            <div class="hero-buttons">
                ${hero.buttons.map(btn => `
                    <a href="${btn.href}" class="btn btn-${btn.type}" ${btn.href.startsWith('http') ? 'target="_blank"' : ''}>
                        ${btn.text}
                        <i class="${btn.icon}"></i>
                    </a>
                `).join('')}
            </div>
        `;
    }

    renderSections() {
        const container = document.getElementById('sectionsContainer');
        
        container.innerHTML = this.config.sections.map(section => {
            switch (section.type) {
                case 'cards':
                    return this.renderCardsSection(section);
                case 'stats':
                    return this.renderStatsSection(section);
                case 'contact':
                    return this.renderContactSection(section);
                default:
                    return '';
            }
        }).join('');
    }

    renderCardsSection(section) {
        return `
            <section class="section ${section.background}" id="${section.id}">
                <div class="container">
                    <div class="section-title">
                        <h2>${section.title}</h2>
                        <p>${section.subtitle}</p>
                    </div>
                    <div class="card-grid cols-${section.gridCols}">
                        ${section.items.map(item => `
                            <div class="card" data-aos="fade-up">
                                <div class="card-icon">
                                    <i class="${item.icon}"></i>
                                </div>
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    async renderPartnersSection() {
        // Fetch partners.json
        try {
            const res = await fetch('partners.json');
            if (!res.ok) throw new Error('Could not load partners.json');
            const partners = await res.json();

            // Build section HTML
            const sectionHTML = `
                <section class="section bg-white" id="partners">
                    <div class="container">
                        <div class="section-title">
                            <h2>Our Partners</h2>
                            <p>We are proud to collaborate with leading organizations supporting innovation and entrepreneurship.</p>
                        </div>
                        <div class="card-grid cols-4">
                            ${partners.map(partner => `
                                <div class="card" data-aos="fade-up">
                                    <div class="card-icon" style="background: none; margin-bottom: 1rem;">
                                        <img src="${partner.image}" alt="${partner.name}" style="width: 64px; height: 64px; object-fit: contain; border-radius: 8px; background: #f5f5f5; padding: 8px;">
                                    </div>
                                    <h3>${partner.name}</h3>
                                    <p class="text-primary" style="font-weight: 600;">${partner.type}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>
            `;

            // Insert after stats section
            const statsSection = document.getElementById('stats');
            if (statsSection) {
                statsSection.insertAdjacentHTML('afterend', sectionHTML);
            } else {
                // fallback: append to sectionsContainer
                document.getElementById('sectionsContainer').insertAdjacentHTML('beforeend', sectionHTML);
            }
        } catch (err) {
            console.error('Failed to load partners:', err);
        }
    }

    renderStatsSection(section) {
        return `
            <section class="section ${section.background}" id="${section.id}">
                <div class="container">
                    <div class="section-title">
                        <h2 style="color: white;">${section.title}</h2>
                        <p style="color: rgba(255, 255, 255, 0.9);">${section.subtitle}</p>
                    </div>
                    <div class="card-grid cols-${section.gridCols}">
                        ${section.items.map(item => `
                            <div class="stat-item" data-aos="zoom-in">
                                <span class="stat-number" data-target="${item.target || 0}" data-suffix="${item.suffix || ''}">
                                    ${item.number}
                                </span>
                                <span class="stat-label">${item.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    renderContactSection(section) {
        return `
            <section class="section ${section.background}" id="${section.id}">
                <div class="container">
                    <div class="section-title">
                        <h2>${section.title}</h2>
                        <p>${section.subtitle}</p>
                    </div>
                    <div class="contact-grid">
                        <div class="card-grid cols-1">
                            ${section.contactInfo.map(info => `
                                <div class="card" data-aos="slide-right">
                                    <div class="card-icon">
                                        <i class="${info.icon}"></i>
                                    </div>
                                    <h3>${info.title}</h3>
                                    <p>${info.content}</p>
                                </div>
                            `).join('')}
                        </div>
                        <div class="contact-form" data-aos="slide-left">
                            <form id="contactForm">
                                ${this.renderFormFields(section.formFields)}
                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary" style="width: 100%;">
                                        Send Message
                                        <i class="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderFormFields(fields) {
        return fields.map(fieldGroup => {
            if (fieldGroup.type === 'row') {
                return `
                    <div class="form-group">
                        <div class="form-row">
                            ${fieldGroup.fields.map(field => this.renderFormField(field)).join('')}
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div class="form-group">
                        ${this.renderFormField(fieldGroup.field)}
                    </div>
                `;
            }
        }).join('');
    }

    renderFormField(field) {
        const baseAttrs = `
            name="${field.name}" 
            placeholder="${field.placeholder}"
            class="form-input"
            ${field.required ? 'required' : ''}
        `;

        switch (field.type) {
            case 'textarea':
                return `<textarea ${baseAttrs}></textarea>`;
            default:
                return `<input type="${field.type}" ${baseAttrs}>`;
        }
    }

    setupEventListeners() {
        // Mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        hamburger?.addEventListener('click', this.toggleMobileMenu.bind(this));

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });

        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        contactForm?.addEventListener('submit', this.handleFormSubmit.bind(this));

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTop');
        scrollTopBtn?.addEventListener('click', this.scrollToTop);

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyNavigation.bind(this));

        // Window resize handler
        window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 250));
    }

    toggleMobileMenu() {
        // Implementation for mobile menu (would require mobile menu HTML)
        console.log('Mobile menu toggle - implement mobile menu HTML structure');
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('data-section');
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Update active navigation state
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            this.showNotification('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    handleKeyNavigation(e) {
        if (e.key === 'Escape') {
            // Close any open modals or mobile menus
            console.log('Escape key pressed - close modals');
        }
    }

    handleResize() {
        // Handle responsive behavior on resize
        this.updateLayoutOnResize();
    }

    updateLayoutOnResize() {
        // Update any layout-dependent features
        console.log('Layout updated on resize');
    }

    setupScrollEffects() {
        const navbar = document.getElementById('navbar');
        const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('scroll', this.throttle(() => {
            const scrollY = window.scrollY;

            // Navbar scroll effect
            if (scrollY > 50) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }

            // Show/hide scroll to top button
            if (scrollY > 300) {
                scrollTopBtn?.classList.add('visible');
            } else {
                scrollTopBtn?.classList.remove('visible');
            }

            // Update active navigation based on scroll position
            this.updateActiveNavigation();
        }, 16));
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let activeSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                activeSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === activeSection) {
                link.classList.add('active');
            }
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Trigger counter animations for stats
                    if (entry.target.closest('.stats-section')) {
                        this.animateCounters();
                    }

                    // Add staggered animations for cards
                    const cards = entry.target.querySelectorAll('.card, .stat-item');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('fade-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            // Initially hide sections for animation
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s ease-out';
            observer.observe(section);
        });

        this.observers.push(observer);
    }

    initializeMicroInteractions() {
        // Add hover effects to buttons
        document.querySelectorAll('.btn, .card, .nav-link').forEach(element => {
            element.addEventListener('mouseenter', this.addHoverEffect);
            element.addEventListener('mouseleave', this.removeHoverEffect);
        });

        // Add click ripple effect
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', this.createRippleEffect);
        });

        // Add loading states to interactive elements
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            link.addEventListener('click', this.addLoadingState);
        });

        // Initialize card interactions
        this.initCardInteractions();
        
        // Initialize form field interactions
        this.initFormInteractions();
    }

    initCardInteractions() {
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    initFormInteractions() {
        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', (e) => {
                if (!e.target.value) {
                    e.target.parentElement.classList.remove('focused');
                }
            });

            input.addEventListener('input', (e) => {
                if (e.target.value) {
                    e.target.parentElement.classList.add('has-value');
                } else {
                    e.target.parentElement.classList.remove('has-value');
                }
            });
        });
    }

    addHoverEffect(e) {
        e.target.style.transform = 'translateY(-2px)';
    }

    removeHoverEffect(e) {
        if (!e.target.classList.contains('active')) {
            e.target.style.transform = 'translateY(0)';
        }
    }

    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addLoadingState(e) {
        const link = e.currentTarget;
        link.style.opacity = '0.7';
        link.style.pointerEvents = 'none';
        
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.pointerEvents = 'auto';
        }, 1000);
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            let current = 0;
            const increment = target / 60;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 16);
        });
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${type === 'success' ? 'var(--primary)' : '#f59e0b'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Utility functions
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
        }
    }

    debounce(func, delay) {
        let timeoutId;
        return function() {
            const args = arguments;
            const context = this;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), delay);
        }
    }

    // Public API for dynamic updates
    updateSection(sectionId, newData) {
        const section = this.config.sections.find(s => s.id === sectionId);
        if (section) {
            Object.assign(section, newData);
            this.renderSections();
            this.setupEventListeners();
        }
    }

    addSection(sectionData) {
        this.config.sections.push(sectionData);
        this.renderSections();
        this.setupEventListeners();
    }

    destroy() {
        // Clean up observers and event listeners
        this.observers.forEach(observer => observer.disconnect());
        window.removeEventListener('scroll', this.scrollHandler);
        window.removeEventListener('resize', this.resizeHandler);
    }
}

// Add ripple animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dynamicWebsite = new DynamicWebsite(siteConfig);
});

// Handle page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Global error handling
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
});
