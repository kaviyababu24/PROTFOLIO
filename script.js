// ============================================
// KAVIYA T B — PORTFOLIO
// script.js
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- CUSTOM CURSOR ----
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Smooth cursor follow
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor grow on hover
  const hoverEls = document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card');
  hoverEls.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.7)';
      cursor.style.background = 'rgba(192, 92, 58, 0.08)';
    });
    el.addEventListener('mouseleave', function () {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.background = 'transparent';
    });
  });


  // ---- NAVBAR SCROLL ----
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // ---- MOBILE MENU ----
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    var spans = menuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      var spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });


  // ---- REVEAL ON SCROLL ----
  var revealEls = document.querySelectorAll(
    '.section-label, .section-title, .about-text, .about-stats, ' +
    '.skill-card, .project-card, .timeline-item, .cert-card, ' +
    '.contact-left, .contact-right, .reveal'
  );

  function checkReveal() {
    var windowH = window.innerHeight;
    revealEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < windowH - 60) {
        el.classList.add('visible');
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  // Set initial state for all reveal elements
  revealEls.forEach(function (el) {
    if (!el.classList.contains('hero-tag') &&
        !el.classList.contains('hero-name') &&
        !el.classList.contains('hero-desc') &&
        !el.classList.contains('hero-actions')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    }
  });

  // Stagger skill cards
  document.querySelectorAll('.skill-card').forEach(function (card, i) {
    card.style.transitionDelay = (i * 80) + 'ms';
  });

  // Stagger cert cards
  document.querySelectorAll('.cert-card').forEach(function (card, i) {
    card.style.transitionDelay = (i * 70) + 'ms';
  });

  window.addEventListener('scroll', checkReveal);
  checkReveal();


  // ---- HERO REVEALS ----
  var heroItems = document.querySelectorAll('.hero .reveal');
  heroItems.forEach(function (el, i) {
    setTimeout(function () {
      el.classList.add('visible');
    }, 200 + i * 160);
  });


  // ---- ANIMATED COUNTERS ----
  function animateCounter(el, target, decimals) {
    var start = 0;
    var duration = 1400;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // ease out
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = start + (target - start) * eased;
      el.textContent = decimals > 0 ? current.toFixed(decimals) : Math.round(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = decimals > 0 ? target.toFixed(decimals) : target;
      }
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('.stat-num[data-count]');
  var countersStarted = false;

  function checkCounters() {
    if (countersStarted) return;
    counters.forEach(function (counter) {
      var rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        countersStarted = true;
        counters.forEach(function (c) {
          var target = parseFloat(c.getAttribute('data-count'));
          var decimals = (c.getAttribute('data-count').indexOf('.') !== -1) ? 1 : 0;
          animateCounter(c, target, decimals);
        });
      }
    });
  }

  window.addEventListener('scroll', checkCounters);
  checkCounters();


  // ---- ACTIVE NAV HIGHLIGHT ----
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        navAnchors.forEach(function (a) {
          a.style.color = '';
        });
        var activeLink = document.querySelector('.nav-links a[href="#' + section.id + '"]');
        if (activeLink) {
          activeLink.style.color = 'var(--accent)';
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);


  // ---- CONTACT FORM ----
  var form = document.getElementById('contactForm');
  var submitBtn = document.getElementById('submitBtn');
  var formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        submitBtn.textContent = 'Fill all fields!';
        submitBtn.style.background = '#c0392b';
        setTimeout(function () {
          submitBtn.textContent = 'Send Message';
          submitBtn.style.background = '';
        }, 2000);
        return;
      }

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulate send (no backend)
      setTimeout(function () {
        submitBtn.style.display = 'none';
        formSuccess.style.display = 'block';
        form.reset();
      }, 1200);
    });
  }


  // ---- SMOOTH SCROLL for older browsers ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });


  // ---- TICKER DUPLICATE ----
  // The ticker strip uses CSS animation; no JS needed, but we duplicate spans
  // so the animation loops seamlessly
  var strip = document.querySelector('.hero-strip');
  if (strip) {
    var items = strip.innerHTML;
    strip.innerHTML = items + items;
  }

});
