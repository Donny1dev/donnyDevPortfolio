// ── Footer year ─────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Navbar scroll effect ─────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile menu ──────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Typewriter ───────────────────────────────
const words = ['DonnyDEV', 'a Developer', 'a Creator'];  // ← replace first entry with your name
let wordIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  const word = words[wordIdx];
  if (!deleting) {
    typeEl.textContent = word.slice(0, ++charIdx);
    if (charIdx === word.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typeEl.textContent = word.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ── Scroll reveal ────────────────────────────
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Project filter ───────────────────────────
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.opacity        = show ? '1' : '0.25';
      card.style.pointerEvents  = show ? 'auto' : 'none';
      card.style.transform      = show ? '' : 'scale(0.97)';
      card.style.transition     = 'opacity 0.3s, transform 0.3s';
    });
  });
});

// ── Contact form → Formspree ─────────────────
const contactForm  = document.getElementById('contact-form');
const formStatus   = document.getElementById('form-status');
const submitBtn    = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  formStatus.className = 'form-status';

  try {
    const res = await fetch('https://formspree.io/f/maqvvjgb', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(this),
    });

    if (res.ok) {
      formStatus.classList.add('success');
      formStatus.textContent = "Thanks! I'll get back to you soon.";
      this.reset();
    } else {
      formStatus.classList.add('error');
      formStatus.textContent = 'Something went wrong — please try emailing me directly.';
    }
  } catch {
    formStatus.classList.add('error');
    formStatus.textContent = 'Network error — please try emailing me directly.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg> Send Message`;
  }
});
