/**
 * Bistro Noir Lahore - Interactive Frontend Logic
 * Animations, Menu Filtering, Booklet Viewer, Lightbox, Reservations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // 2. Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close when tapping outside drawer
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('open')) {
        if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
          mobileToggle.classList.remove('active');
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    });
  }

  // 3. Menu Filtering
  const filterBtns = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 4. Official 10-Page Menu Booklet Viewer
  const menuPages = [
    { page: 9, title: "To Begin (Appetizers & Starters)", desc: "Artisanal beginnings, light bites, and French-Italian warm starters." },
    { page: 10, title: "Soup & Fresh Garden Salads", desc: "Signature velvety tomato soup, Caesar royale with turkey bacon & parmesan." },
    { page: 2, title: "For The Table (Sharing Platters)", desc: "Golden fried meatballs, truffle fries, mezze & artisanal bites to share." },
    { page: 6, title: "Brick Oven Pizzas (12-inch Artisan)", desc: "Authentic wood-fired crusts, Truffle Burrata, Margherita, Roasted Garlic & Genovese." },
    { page: 8, title: "Handcrafted Pasta Selection", desc: "Fettuccine Alfredo, Penne Arrabbiata, Truffle Rigatoni, and Basil Pesto." },
    { page: 3, title: "Risotto & Soft Gnocchi", desc: "Creamy wild mushroom arborio risotto, parmesan reggiano, and gourmet gnocchi." },
    { page: 4, title: "Prime Beef & Steaks", desc: "Signature Beef Wellington, Filet Mignon, Ribeye, and 12-hour slow cooked ribs." },
    { page: 5, title: "Gourmet Chicken Entrées", desc: "Crispy Chicken Cordon Bleu, Chicken Parmigiana, and Herb-Roasted French Chicken." },
    { page: 1, title: "Fresh Catch Seafood", desc: "Pan-seared Norwegian salmon, grilled jumbo prawns, and Mediterranean sea bass." },
    { page: 7, title: "Artisan Burgers & Sandwiches", desc: "Prime smashed beef burgers, gourmet paninis, brioche buns, and gourmet sides." }
  ];

  let currentBookletIndex = 0;
  const bookletImg = document.getElementById('bookletImg');
  const bookletTitle = document.getElementById('bookletTitle');
  const bookletCounter = document.getElementById('bookletCounter');
  const bookletPills = document.querySelectorAll('.booklet-pill-btn');
  const prevBtn = document.getElementById('bookletPrev');
  const nextBtn = document.getElementById('bookletNext');

  function updateBooklet(index) {
    if (!bookletImg) return;
    currentBookletIndex = (index + menuPages.length) % menuPages.length;
    const currentData = menuPages[currentBookletIndex];

    // Smooth fade transition
    bookletImg.style.opacity = '0.3';
    setTimeout(() => {
      bookletImg.src = `assets/menu/menu_p${currentData.page}.png`;
      bookletImg.alt = currentData.title;
      if (bookletTitle) bookletTitle.textContent = currentData.title;
      if (bookletCounter) bookletCounter.textContent = `Page ${currentBookletIndex + 1} of ${menuPages.length}`;
      bookletImg.style.opacity = '1';
    }, 150);

    // Update pill highlights
    bookletPills.forEach((pill, idx) => {
      if (idx === currentBookletIndex) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateBooklet(currentBookletIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateBooklet(currentBookletIndex + 1));
  }
  bookletPills.forEach((pill, idx) => {
    pill.addEventListener('click', () => updateBooklet(idx));
  });

  // 5. Image Lightbox
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const zoomableImages = document.querySelectorAll('.zoomable, .gallery-item img, .booklet-viewport img');

  zoomableImages.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      if (lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 6. Reservation Form Handler & WhatsApp Integration
  const reservationForm = document.getElementById('reservationForm');
  const toastNotice = document.getElementById('toastNotice');

  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.querySelector('.toast-msg').textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 4500);
  }

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('resName').value.trim();
      const phone = document.getElementById('resPhone').value.trim();
      const date = document.getElementById('resDate').value;
      const time = document.getElementById('resTime').value;
      const guests = document.getElementById('resGuests').value;
      const seating = document.getElementById('resSeating').value;
      const requests = document.getElementById('resRequests').value.trim();

      if (!name || !phone || !date || !time) {
        showToast("Please fill in your name, phone number, date and time.");
        return;
      }

      // Format WhatsApp text message
      const message = `Hello Bistro Noir Lahore,\nI would like to reserve a table:\n- Name: ${name}\n- Phone: ${phone}\n- Date: ${date}\n- Time: ${time}\n- Guests: ${guests}\n- Seating Area: ${seating}\n${requests ? '- Special Requests: ' + requests : ''}\n\nLooking forward to confirmation!`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/923001888718?text=${encodedMsg}`;

      showToast(`Reservation submitted! Connecting to Bistro Noir WhatsApp...`);

      // Open WhatsApp after a brief delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        reservationForm.reset();
      }, 1200);
    });
  }

  // 7. Scroll Reveal Observer
  const reveals = document.querySelectorAll('.reveal');
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(el => revealObserver.observe(el));

  // 8. Order / Inquire Quick Buttons
  const orderButtons = document.querySelectorAll('.dish-order-btn');
  orderButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dishTitle = btn.getAttribute('data-dish') || 'Dish';
      const msg = `Hello Bistro Noir Lahore, I would like to inquire about ordering '${dishTitle}'.`;
      const url = `https://wa.me/923001888718?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    });
  });
});
