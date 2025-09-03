// Navigation functionality
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

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  alert(`Thank you ${name}! Your message has been received. I will get back to you at ${email} soon.`);
  contactForm.reset();
});

// Section animations on scroll
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('animate');
    else entry.target.classList.remove('animate');
  });
}, observerOptions);
document.querySelectorAll('section').forEach(section => observer.observe(section));

// Scroll-spy + smooth scroll
document.addEventListener('DOMContentLoaded', () => {
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  function getNavHeight() { return nav ? nav.getBoundingClientRect().height : 0; }
  function setActiveLink(id) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  function smoothScrollTo(target) {
    const top = target.getBoundingClientRect().top + window.pageYOffset - getNavHeight() - 6;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      smoothScrollTo(target);
      navLinksContainer.classList.remove('active');
    });
  });
});

// Floating Elements Generator
function createFloatingElements(sectionId, type='circle', count=12) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  const container = section.querySelector('.bg-elements');
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.classList.add('element', type);
    const size = 20 + Math.random() * 40;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.top = Math.random() * 100 + '%';
    el.style.left = Math.random() * 100 + '%';
    const duration = 4 + Math.random() * 6;
    const delay = Math.random() * 5;
    el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
    container.appendChild(el);
  }
}
createFloatingElements('dashboard','circle',12);
createFloatingElements('about','triangle',10);
createFloatingElements('channel','square',12);
createFloatingElements('contact','circle',15);

// Cursor interaction
document.addEventListener('mousemove', e => {
  document.querySelectorAll('.bg-elements .element').forEach((el,i) => {
    const speed = (i+1)*0.01;
    const offsetX = (e.clientX - window.innerWidth/2) * speed;
    const offsetY = (e.clientY - window.innerHeight/2) * speed;
    el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
});
