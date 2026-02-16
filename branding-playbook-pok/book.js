document.addEventListener('DOMContentLoaded', () => {
  // Initialize feather icons
  if (typeof feather !== 'undefined') {
    feather.replace();
  }

  // Page navigation
  const tabs = document.querySelectorAll('.bp-page-tab');
  const pages = document.querySelectorAll('.bp-page, .bp-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;

      // Update tabs
      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      // Update pages
      pages.forEach(page => {
        page.classList.remove('is-active');
        page.hidden = true;
      });

      const targetPage = document.getElementById(targetId);
      if (targetPage) {
        targetPage.classList.add('is-active');
        targetPage.hidden = false;
      }

      // Scroll tab into view
      tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });

  // Attendees functionality (if needed)
  const attendeeGrid = document.getElementById('attendeeGrid');
  const toggleButton = document.getElementById('toggleAttendees');

  if (attendeeGrid) {
    const MAX_VISIBLE = 12;
    let showingAll = false;

    const renderAttendees = attendees => {
      attendeeGrid.innerHTML = '';

      if (!Array.isArray(attendees) || attendees.length === 0) {
        attendeeGrid.innerHTML = `
          <div class="bp-empty-state">
            <p>Attendee list will be published closer to the program date.</p>
          </div>
        `;
        if (toggleButton) toggleButton.style.display = 'none';
        return;
      }

      attendees.forEach((attendee, index) => {
        const card = document.createElement('div');
        card.className = 'bp-team-member';
        if (index >= MAX_VISIBLE) {
          card.classList.add('is-hidden');
        }

        card.innerHTML = `
          <img src="${attendee.photo || '../images/default-avatar.png'}" alt="${attendee.name}" class="bp-team-photo">
          <div class="bp-team-name">${attendee.name || 'Participant'}</div>
          <div class="bp-team-role">${attendee.designation || ''}</div>
        `;

        attendeeGrid.appendChild(card);
      });

      if (toggleButton && attendees.length > MAX_VISIBLE) {
        toggleButton.style.display = 'inline-flex';
      }
    };

    const toggleAttendees = () => {
      const hiddenCards = attendeeGrid.querySelectorAll('.is-hidden');
      hiddenCards.forEach(card => {
        card.classList.toggle('is-visible');
      });
      showingAll = !showingAll;
      if (toggleButton) {
        toggleButton.textContent = showingAll ? 'Show Less' : 'Show All';
      }
    };

    if (toggleButton) {
      toggleButton.addEventListener('click', toggleAttendees);
    }

    // Load attendees
    fetch('./attendees.json')
      .then(response => (response.ok ? response.json() : []))
      .then(renderAttendees)
      .catch(() => renderAttendees([]));
  }
});
