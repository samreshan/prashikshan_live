// Render Functions
function renderJourney() {
    const grid = document.getElementById('journeyGrid');
    const journey = window.prashikshanSite.content.journey;
    grid.innerHTML = journey.map((item, index) => `
        <div class="journey-card" style="animation-delay: ${index * 0.1}s">
            <div class="journey-icon">
                <i data-feather="${item.icon}"></i>
            </div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `).join('');
    feather.replace(); // Initialize Feather icons
}

function renderPrograms() {
    const grid = document.getElementById('programsGrid');
    const programs = window.prashikshanSite.content.programs;
    grid.innerHTML = programs.map((program, index) => `
        <div class="program-card" style="animation-delay: ${index * 0.05}s">
            <img src="${program.logo}" alt="${program.title}" class="program-logo">
            <div class="program-content">
                <h4>${program.title}</h4>
                <p>${program.description}</p>
                <a href="${program.link}" class="program-link">
                    Learn More <i data-feather="arrow-right" style="width: 16px; height: 16px; vertical-align: middle;"></i>
                </a>
            </div>
        </div>
    `).join('');
    feather.replace(); // Initialize Feather icons
}

function renderImpact() {
    const stats = document.getElementById('impactStats');
    const impact = window.prashikshanSite.content.impact;
    stats.innerHTML = impact.map((stat, index) => `
        <div class="stat-card" style="animation-delay: ${index * 0.1}s">
            <div class="stat-icon">
                <i data-feather="${stat.icon}"></i>
            </div>
            <span class="stat-number" data-target="${stat.number}">${stat.number}</span>
            <span class="stat-label">${stat.label}</span>
        </div>
    `).join('');
    feather.replace(); // Initialize Feather icons
}

// Initialize Content
document.addEventListener('DOMContentLoaded', () => {
    renderJourney();
    renderPrograms();
    renderImpact();
    // Initialize all Feather icons after rendering
    setTimeout(() => {
        feather.replace();
    }, 100);

    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('mobile-active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('mobile-active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('mobile-active');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    // Smooth scroll for anchor links
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
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    // Observe all cards
    document.querySelectorAll('.journey-card, .program-card, .stat-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});

// Dynamic content update function for future use
function updateContent(section, newData) {
    window.prashikshanSite.content[section] = newData;
    switch(section) {
        case 'journey':
            renderJourney();
            break;
        case 'programs':
            renderPrograms();
            break;
        case 'impact':
            renderImpact();
            break;
    }
}

// Export for potential API integration
window.prashikshanSite = window.prashikshanSite || {};
window.prashikshanSite.updateContent = updateContent;
