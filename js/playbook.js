document.addEventListener('DOMContentLoaded', () => {
  const runFeather = () => {
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  };

  runFeather();

  const navToggle = document.querySelector('.section-nav__toggle');
  const navInner = document.querySelector('.section-nav__inner');
  const navLinks = Array.from(document.querySelectorAll('[data-section-link]'));
  const sections = Array.from(document.querySelectorAll('[data-section]'));

  if (navToggle && navInner) {
    navToggle.addEventListener('click', () => {
      const isOpen = navInner.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      runFeather();
    });
  }

  const setActiveLink = (id) => {
    if (!id) {
      return;
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const matches = href && href.replace('#', '') === id;
      link.classList.toggle('active', matches);
      if (matches) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href')?.replace('#', '');
      if (!targetId) {
        return;
      }

      const targetSection = document.getElementById(targetId);
      if (!targetSection) {
        return;
      }

      event.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveLink(targetId);

      if (navToggle && navInner && window.innerWidth <= 1200) {
        navInner.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        runFeather();
      }
    });
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        setActiveLink(visible[0].target.id);
      }
    },
    {
      rootMargin: '-45% 0px -45% 0px',
      threshold: [0.15, 0.35, 0.6],
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const initialHash = window.location.hash.replace('#', '');
  if (initialHash) {
    setActiveLink(initialHash);
  } else if (sections[0]) {
    setActiveLink(sections[0].id);
  }

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setActiveLink(hash);
    }
  });

  const animatedElements = Array.from(document.querySelectorAll('[data-animate]'));
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -10%',
    }
  );

  animatedElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 60, 480)}ms`;
    revealObserver.observe(element);
  });

  // Initialize independent carousels
  const initCarousel = (carouselContainer) => {
    const testimonialCards = Array.from(carouselContainer.querySelectorAll('.testimonial-card'));
    const dotsWrapper = carouselContainer.querySelector('.carousel-dots');
    const prevBtn = carouselContainer.querySelector('.carousel-btn.prev');
    const nextBtn = carouselContainer.querySelector('.carousel-btn.next');
    let activeTestimonial = 0;
    let autoplayTimer = null;

    const renderDots = () => {
      if (!dotsWrapper) {
        return;
      }

      dotsWrapper.innerHTML = '';
      testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (index === activeTestimonial) {
          dot.classList.add('active');
        }
        dot.addEventListener('click', () => showTestimonial(index));
        dotsWrapper.appendChild(dot);
      });
    };

    const showTestimonial = (index) => {
      if (testimonialCards.length === 0) {
        return;
      }

      if (index < 0) {
        activeTestimonial = testimonialCards.length - 1;
      } else if (index >= testimonialCards.length) {
        activeTestimonial = 0;
      } else {
        activeTestimonial = index;
      }

      testimonialCards.forEach((card, cardIndex) => {
        card.classList.toggle('active', cardIndex === activeTestimonial);
      });

      const dots = dotsWrapper ? Array.from(dotsWrapper.children) : [];
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === activeTestimonial);
      });
    };

    const startAutoplay = () => {
      if (autoplayTimer || testimonialCards.length === 0) {
        return;
      }
      autoplayTimer = window.setInterval(() => {
        showTestimonial(activeTestimonial + 1);
      }, 6000);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    if (testimonialCards.length > 0) {
      renderDots();
      showTestimonial(activeTestimonial);

      if (prevBtn) {
        prevBtn.addEventListener('click', () => showTestimonial(activeTestimonial - 1));
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => showTestimonial(activeTestimonial + 1));
      }

      carouselContainer.addEventListener('mouseenter', stopAutoplay);
      carouselContainer.addEventListener('mouseleave', startAutoplay);
      carouselContainer.addEventListener('focusin', stopAutoplay);
      carouselContainer.addEventListener('focusout', startAutoplay);

      startAutoplay();
    }
  };

  // Find all carousels and initialize them independently
  const allCarousels = document.querySelectorAll('.testimonial-carousel');
  allCarousels.forEach((carousel) => {
    initCarousel(carousel);
  });

  runFeather();
});
