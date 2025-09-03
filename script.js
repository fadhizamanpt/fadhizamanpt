// Navigation functionality
const nav = document.querySelector('nav');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

// Scroll effect for nav background
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Toggle mobile menu
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  alert(`Thank you ${name}! Your message has been received. I will get back to you at ${email} soon.`);
  contactForm.reset();
});

// Section animations on scroll (more intense)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.opacity = '1';
    } else {
      entry.target.classList.remove('animate');
      entry.target.style.transform = 'translateY(50px)';
      entry.target.style.opacity = '0';
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Scroll-spy + smooth scroll with tap animation
document.addEventListener('DOMContentLoaded', () => {
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  function getNavHeight() {
    return nav ? nav.getBoundingClientRect().height : 0;
  }

  function setActiveLink(id) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${id}`) {
        link.classList.add('active');
        link.classList.remove('tap');
        void link.offsetWidth;
        link.classList.add('tap');
      } else {
        link.classList.remove('active');
      }
    });
  }

  let observer;
  function createObserver() {
    const navHeight = getNavHeight();
    if (observer) observer.disconnect();

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id) {
            setActiveLink(id);
            history.replaceState(null, '', `#${id}`);

            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
            entry.target.classList.add('animate');
          }
        }
      });
    }, {
      root: null,
      rootMargin: `-${navHeight}px 0px -40% 0px`,
      threshold: 0.45
    });

    sections.forEach(s => observer.observe(s));
  }

  createObserver();
  window.addEventListener('resize', createObserver);

  // Smooth scroll + animate section on nav click
  function smoothScrollTo(target) {
    const navHeight = getNavHeight();
    const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 6;
    window.scrollTo({ top, behavior: 'smooth' });

    // Animate section after scroll starts
    setTimeout(() => {
      target.style.transform = 'translateY(0)';
      target.style.opacity = '1';
      target.classList.add('animate');
    }, 50);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();

      const target = document.querySelector(href);
      if (!target) return;

      smoothScrollTo(target);

      // Set active nav
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Tap animation
      link.classList.remove('tap');
      void link.offsetWidth;
      link.classList.add('tap');

      // Close mobile menu
      if (navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
      }

      history.replaceState(null, '', href);
    });
  });

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
    });
  }

  // Initial active link
  const initialHash = location.hash.replace('#', '');
  if (initialHash) {
    setActiveLink(initialHash);
  } else {
    setTimeout(() => {
      sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.25) {
          setActiveLink(sec.id);
        }
      });
    }, 150);
  }

  // Initial page load animation for first visible section
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      sec.style.transform = 'translateY(50px)';
      sec.style.opacity = '0';
      setTimeout(() => {
        sec.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        sec.style.transform = 'translateY(0)';
        sec.style.opacity = '1';
        sec.classList.add('animate');
      }, 200);
      return; // animate only the first visible section
    }
  });

  // Scroll down button behavior (exact same as nav link)
  const scrollDownBtn = document.querySelector('.scroll-down-text');
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const currentSection = scrollDownBtn.closest('section');
      const nextSection = currentSection.nextElementSibling;
      if (!nextSection) return;

      smoothScrollTo(nextSection);
      setActiveLink(nextSection.id);

      const targetLink = document.querySelector(`.nav-links a[href="#${nextSection.id}"]`);
      if (targetLink) {
        targetLink.classList.remove('tap');
        void targetLink.offsetWidth;
        targetLink.classList.add('tap');
      }
    });
  }
});
// Floating Elements Generator
function createFloatingElements(sectionId, type='circle', count=12) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const container = section.querySelector('.bg-elements');
  container.innerHTML = ''; // clear previous elements

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

// Section-specific elements
createFloatingElements('dashboard', 'circle', 12);
createFloatingElements('about', 'triangle', 10);
createFloatingElements('channel', 'square', 12);
createFloatingElements('contact', 'circle', 15);

// Cursor interaction
document.addEventListener('mousemove', e => {
  document.querySelectorAll('.bg-elements .element').forEach((el, i) => {
    const speed = (i + 1) * 0.01;
    const offsetX = (e.clientX - window.innerWidth/2) * speed;
    const offsetY = (e.clientY - window.innerHeight/2) * speed;
    el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
});
