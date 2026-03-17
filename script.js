/* ============================================================
   MOKSH TIWARI PORTFOLIO — SCRIPT.JS
   ============================================================ */

/* ------- TRIGGER HERO REVEALS IMMEDIATELY ------- */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach(el => {
    el.classList.add('visible');
  });
});

/* ------- CUSTOM CURSOR ------- */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

// Smooth follower
(function animateFollower() {
  let fX = mouseX, fY = mouseY;
  function loop() {
    fX += (mouseX - fX) * 0.12;
    fY += (mouseY - fY) * 0.12;
    if (follower) {
      follower.style.left = fX + 'px';
      follower.style.top = fY + 'px';
    }
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ------- NAV SCROLL ------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

/* ------- SMOOTH NAV LINKS ------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu) mobileMenu.classList.remove('open');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ------- HAMBURGER ------- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

/* ------- REVEAL ON SCROLL ------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  // Skip hero elements – they're revealed by loader
  if (!el.closest('.hero')) {
    revealObserver.observe(el);
  }
});

/* ------- ANIMATED COUNTER ------- */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.8 });

document.querySelectorAll('.stat-num').forEach(el => {
  counterObserver.observe(el);
});

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const start = performance.now();
  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

/* ------- TILT EFFECT ON SKILL CARDS ------- */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `translateY(-6px) scale(1.01) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = 'transform 0.1s linear, box-shadow 0.3s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s';
  });
});

/* ------- HERO PARALLAX ------- */
const heroBgText = document.querySelector('.hero-bg-text');
if (heroBgText) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.25}px))`;
  });
}

/* ------- HERO PHOTO HOVER EFFECTS ------- */
const heroPhoto = document.querySelector('.hero-photo-wrap');
if (heroPhoto) {
  heroPhoto.addEventListener('mousemove', (e) => {
    const rect = heroPhoto.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    heroPhoto.style.transform = `translateY(-10px) rotateX(${-y * 0.05}deg) rotateY(${x * 0.05}deg)`;
    heroPhoto.style.transition = 'transform 0.1s linear';
  });
  heroPhoto.addEventListener('mouseleave', () => {
    heroPhoto.style.transform = '';
    heroPhoto.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
}

/* ------- ACTIVE NAV LINK ON SCROLL ------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#0a0a0a';
      link.style.fontWeight = '600';
    } else {
      link.style.fontWeight = '500';
    }
  });
});
