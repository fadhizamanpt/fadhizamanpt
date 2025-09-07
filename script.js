// ===============================
// Navigation functionality
// ===============================
const nav = document.querySelector('nav');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

// Scroll effect for nav background
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// Toggle mobile menu
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// ===============================
// Form submission (FIXED for Formspree)
// ===============================
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      alert("✅ Thank you! Your message has been sent successfully.");
      contactForm.reset();
    } else {
      alert("⚠️ Oops! Something went wrong, please try again.");
    }
  } catch (error) {
    alert("❌ Network error, please check your connection.");
  }
});

// ===============================
// Section animations on scroll
// ===============================
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('animate');
    else entry.target.classList.remove('animate');
  });
}, observerOptions);
document.querySelectorAll('section').forEach(section => observer.observe(section));

// ===============================
// Scroll-spy + smooth scroll + scroll-down button
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');
  const scrollDown = document.querySelector('.scroll-down-text');

  function getNavHeight() {
    return nav ? nav.getBoundingClientRect().height : 0;
  }

  function setActiveLink(id) {
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  }

  function smoothScrollTo(target) {
    const top = target.getBoundingClientRect().top + window.pageYOffset - getNavHeight() - 6;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  // Nav links click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      smoothScrollTo(target);
      navLinksContainer.classList.remove('active');
    });
  });

  // Scroll-down button behaves like About link
  if (scrollDown) {
    scrollDown.addEventListener('click', (e) => {
      e.preventDefault();
      const aboutLink = document.querySelector('.nav-links a[href="#about"]');
      if (aboutLink) {
        // tap effect
        aboutLink.classList.add('tap');
        setTimeout(() => aboutLink.classList.remove('tap'), 260);
        // trigger smooth scroll & close mobile menu
        aboutLink.click();
      }
    });
  }

  // Scroll-spy
  function checkActiveSection() {
    let current = "";
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= getNavHeight() + 50 && rect.bottom > getNavHeight() + 50) {
        current = section.id;
      }
    });
    if (current) setActiveLink(current);
  }

  window.addEventListener('scroll', checkActiveSection);
  checkActiveSection();
});

// ===============================
// Floating Elements Generator
// ===============================
function createFloatingElements(sectionId, type = 'circle', count = 20) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  const container = section.querySelector('.bg-elements');
  container.innerHTML = '';
  const step = 100 / count; // spread uniformly
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.classList.add('element', type);
    const size = 20 + Math.random() * 40;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.top = Math.random() * 100 + '%';
    el.style.left = step * i + '%'; // uniform distribution
    const duration = 4 + Math.random() * 6;
    const delay = Math.random() * 5;
    el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
    container.appendChild(el);
  }
}

// Updated element counts and uniform spread
createFloatingElements('dashboard', 'circle', 25);
createFloatingElements('about', 'triangle', 15);
createFloatingElements('channel', 'square', 20);
createFloatingElements('contact', 'circle', 25);

// ===============================
// Removed cursor interaction on 3D elements

// Make all sections animate instantly on page load
document.querySelectorAll('section').forEach(section => {
  section.classList.add('animate');  // forces 'animate' class immediately
  section.style.transition = 'none'; // remove transition delay
});

// Start floating element animations immediately
document.querySelectorAll('.bg-elements .element').forEach(el => {
  el.style.animationPlayState = 'running';
});

// ===============================
// Removed back-to-top button code

// Continuous reveal/unreveal on scroll
document.querySelectorAll('.glass, .section-title, .btn').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.7s ease';

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
      } else {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
      }
    });
  }, { threshold: 0.2 });

  revealObserver.observe(el);
});
