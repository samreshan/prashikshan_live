document.addEventListener('DOMContentLoaded', () => {
  const data = window.PLAYBOOK_CONFIG;
  if (!data) {
    console.error('Playbook config not found!');
    return;
  }

  const updateText = (selector, text) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (text) el.textContent = text;
    });
  };

  const updateHref = (selector, href) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (href) el.setAttribute('href', href);
    });
  };

  // --- Meta ---
  if (data.meta && data.meta.title) {
    document.title = data.meta.title;
  }

  // --- Hero Section ---
  if (data.hero) {
    updateText('.hero-label', data.hero.label);
    updateText('[data-field="dates"]', data.hero.dates); 
    updateText('[data-field="location"]', data.hero.location); 
    updateHref('[data-field="apply-link"]', data.hero.applyLink);
    updateText('.hero-note', data.hero.note);
    updateHref('.cta-button', data.hero.applyLink); 
  }

  // --- About Section ---
  if (data.about) {
    // Extra Paragraph
    const aboutTextContainer = document.querySelector('.prose'); 
    if (data.about.extraParagraph && aboutTextContainer) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data.about.extraParagraph;
        aboutTextContainer.prepend(tempDiv.firstChild);
    }

    // Investment Tiers
    if (data.about.investment) {
       const pricingItems = document.querySelectorAll('.pricing-item');
       data.about.investment.forEach((tier, index) => {
           if (pricingItems[index]) {
               const nameEl = pricingItems[index].querySelector('.pricing-name');
               const amountEl = pricingItems[index].querySelector('.pricing-amount');
               const noteEl = pricingItems[index].querySelector('small');
               
               if (tier.strikethrough) {
                   nameEl.innerHTML = `<strike>${tier.name}</strike>`;
                   amountEl.innerHTML = `<strike>${tier.amount}</strike>`;
               } else {
                   if (nameEl) nameEl.textContent = tier.name;
                   if (amountEl) amountEl.textContent = tier.amount;
               }

               if (tier.status) {
                   pricingItems[index].className = `pricing-item ${tier.status}`;
               } else {
                   pricingItems[index].className = 'pricing-item';
               }

               if (tier.note && noteEl) {
                   noteEl.textContent = tier.note;
               }
           }
       });
    }

    // Contact
    if (data.about.contact) {
      updateText('#footer-phone-text', data.about.contact.phone);
      updateHref('.contact-link', `tel:${data.about.contact.phoneLink}`);
      updateText('.contact-link span', data.about.contact.phone);
    }
  }

  // --- Venue ---
  if (data.venue) {
    const venueSection = document.getElementById('venue');
    if (venueSection) {
        const venueTitle = venueSection.querySelector('.content-title');
        if (venueTitle) venueTitle.textContent = data.venue.name;
        
        const venueDetails = venueSection.querySelectorAll('dd');
        if (venueDetails.length >= 2) {
            venueDetails[0].textContent = data.venue.neighborhood;
            venueDetails[1].textContent = data.venue.travelSupport;
        }

        const mapFrame = venueSection.querySelector('iframe');
        if (mapFrame) mapFrame.src = data.venue.mapSrc;
    }
  }
  // --- Trainer Section ---
  if (data.trainer) {
    const trainerAvatar = document.querySelector('.trainer-avatar');
    if (trainerAvatar) {
        if (data.trainer.imageType === 'image') {
            trainerAvatar.innerHTML = `<img src="${data.trainer.content}" alt="Trainer">`;
        } else {
            trainerAvatar.textContent = data.trainer.content;
        }
    }
  }

  // --- Testimonials ---
  if (data.testimonials) {
    updateText('#testimonials-subtitle', data.testimonials.subtitle);
  }

  // --- Attendees ---
  const attendeesSection = document.getElementById('attendees');
  const attendeesNav = document.getElementById('nav-attendees');
  const modal = document.getElementById('attendee-modal');
  const modalClose = document.getElementById('modal-close');
  const modalAvatar = document.getElementById('modal-avatar');
  const modalName = document.getElementById('modal-name');
  const modalRole = document.getElementById('modal-role');

  if (data.attendees && data.attendees.show && attendeesSection) {
    attendeesSection.style.display = 'block';
    if (attendeesNav) attendeesNav.style.display = 'flex';
    
    if (data.attendees.title) updateText('#attendees-title', data.attendees.title);
    if (data.attendees.subtitle) updateText('#attendees-subtitle', data.attendees.subtitle);

    const attendeesData = data.attendees.list || [];
    
    if (attendeesData.length > 0) {
        // Sort
        attendeesData.sort((a, b) => a.name.localeCompare(b.name));

        const attendeesGrid = document.getElementById('attendees-grid');
        if (attendeesGrid) {
            attendeesGrid.className = 'attendees-grid';
            // Render cards with smooth stagger
            attendeesGrid.innerHTML = attendeesData.map((person, index) => `
                <article class="attendee-card-compact" role="button" tabindex="0" data-index="${index}" style="cursor: pointer; opacity: 0; transform: translateY(20px);">
                    <img src="${person.photo}" alt="${person.name}" class="attendee-avatar-compact" loading="lazy" width="56" height="56">
                    <div class="attendee-info">
                        <h4 class="attendee-name">${person.name}</h4>
                        <p class="attendee-role">${person.designation}</p>
                    </div>
                </article>
            `).join('');

            // Modal Handlers
            attendeesGrid.querySelectorAll('.attendee-card-compact').forEach((card, idx) => {
                card.addEventListener('click', () => {
                   const person = attendeesData[idx];
                   if (person && modal) {
                       modalAvatar.src = person.photo;
                       modalAvatar.alt = person.name;
                       modalName.textContent = person.name;
                       modalRole.textContent = person.designation;
                       modal.showModal();
                   }
                });
                
                // Add keyboard support
                card.addEventListener('keydown', (e) => {
                   if (e.key === 'Enter' || e.key === ' ') {
                       e.preventDefault();
                       card.click();
                   }
                });
            });
            
            // Smooth staggered reveal animation
            requestAnimationFrame(() => {
                const cards = attendeesGrid.querySelectorAll('.attendee-card-compact');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 40); // Smooth 40ms stagger
                });
            });
        }
    }
  } else {
    // Hide if disabled
    if (attendeesSection) attendeesSection.remove();
    if (attendeesNav) attendeesNav.remove();
  }

  // Modal Close Logic
  if (modalClose && modal) {
    modalClose.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
       if (e.target === modal) modal.close();
    });
  }

  // Re-run feather
  if (typeof feather !== 'undefined') feather.replace();

});
