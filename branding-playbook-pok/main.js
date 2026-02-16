document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const tabs = Array.from(document.querySelectorAll('.bp-tab'));
  const panels = Array.from(document.querySelectorAll('.bp-panel'));

  // Mobile Menu Toggle
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenu && navLinks) {
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
  }

  const handleScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll);

  const activateTab = (tab, { updateHash = true, scrollIntoView = false } = {}) => {
    if (!tab) return;
    const targetId = tab.dataset.target;
    if (!targetId) return;

    tabs.forEach(button => {
      const isActive = button === tab;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', isActive ? 'true' : 'false');
      button.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    let activePanel = null;

    panels.forEach(panel => {
      const isMatch = panel.dataset.panel === targetId || panel.id === targetId;
      panel.classList.toggle('is-active', isMatch);
      panel.hidden = !isMatch;
      if (isMatch) {
        activePanel = panel;
      }
    });

    if (updateHash && window.history && typeof window.history.replaceState === 'function') {
      window.history.replaceState(null, '', `#${targetId}`);
    }

    if (scrollIntoView && activePanel) {
      activePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activateTabById = (id, { scroll = false, updateHash = true } = {}) => {
    if (!id) return;
    const tab = tabs.find(button => button.dataset.target === id);
    if (tab) {
      activateTab(tab, { updateHash, scrollIntoView: scroll });
    }
  };

  panels.forEach(panel => {
    if (!panel.classList.contains('is-active')) {
      panel.hidden = true;
    }
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const currentIndex = tabs.indexOf(tab);
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
        const nextTab = tabs[nextIndex];
        nextTab.focus();
        activateTab(nextTab);
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const target = anchor.getAttribute('href');
      if (!target || target === '#') return;

      const targetId = target.replace('#', '');
      if (!targetId) return;

      const panel = panels.find(item => item.id === targetId);
      if (panel) {
        event.preventDefault();
        activateTabById(targetId, { scroll: true });
        return;
      }

      const section = document.getElementById(targetId);
      if (!section) return;

      event.preventDefault();
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const attendeeGrid = document.getElementById('attendeeGrid');
  const toggleButton = document.getElementById('toggleAttendees');
  const MAX_VISIBLE = 8;
  let showingAll = false;

  const renderAttendees = attendees => {
    if (!attendeeGrid) return;
    attendeeGrid.innerHTML = '';

    if (!Array.isArray(attendees) || attendees.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'bp-card bp-attendee-card';
      emptyState.innerHTML = `
        <div class="bp-attendee-info">
          <h4>Attendee list coming soon</h4>
          <span class="bp-muted">We will publish confirmed participants closer to the program date.</span>
        </div>
      `;
      attendeeGrid.appendChild(emptyState);
      if (toggleButton) {
        toggleButton.style.display = 'none';
      }
      return;
    }

    attendees.forEach((attendee, index) => {
      const card = document.createElement('article');
      card.className = 'bp-card bp-attendee-card';
      if (index >= MAX_VISIBLE) {
        card.classList.add('is-collapsed');
      }

      const photo = document.createElement('div');
      photo.className = 'bp-attendee-photo';
      if (attendee.photo) {
        photo.style.backgroundImage = `url('${attendee.photo}')`;
      }

      const info = document.createElement('div');
      info.className = 'bp-attendee-info';
      info.innerHTML = `
        <h4>${attendee.name || 'Participant'}</h4>
        <span>${attendee.designation || ''}</span>
      `;

      card.appendChild(photo);
      card.appendChild(info);
      attendeeGrid.appendChild(card);
    });

    if (toggleButton) {
      const shouldShowToggle = attendees.length > MAX_VISIBLE;
      toggleButton.style.display = shouldShowToggle ? 'inline-flex' : 'none';
    }
  };

  const toggleAttendees = () => {
    if (!attendeeGrid) return;
    const hiddenCards = attendeeGrid.querySelectorAll('.is-collapsed');
    hiddenCards.forEach(card => {
      card.classList.toggle('is-expanded');
    });
    showingAll = !showingAll;
    if (toggleButton) {
      toggleButton.textContent = showingAll ? 'Show Less' : 'Show All';
    }
  };

  if (toggleButton) {
    toggleButton.addEventListener('click', toggleAttendees);
  }

  fetch('./attendees.json')
    .then(response => (response.ok ? response.json() : []))
    .then(renderAttendees)
    .catch(() => {
      renderAttendees([]);
    })
    .finally(() => {
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
    });

  if (window.location.hash) {
    const targetId = window.location.hash.replace('#', '');
    activateTabById(targetId, { scroll: false, updateHash: false });
  }

  window.addEventListener('hashchange', () => {
    const targetId = window.location.hash.replace('#', '');
    activateTabById(targetId, { scroll: false, updateHash: false });
  });

  if (typeof feather !== 'undefined') {
    feather.replace();
  }
});
