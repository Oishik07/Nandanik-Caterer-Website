/* ============================================================
   NANDANIK CATERER — Main JavaScript (Simplified)
   ============================================================ */

/* --- PRELOADER --- */
const preloader     = document.getElementById('preloader');
const preloaderFill = document.getElementById('preloaderFill');

let progress = 0;
document.body.style.overflow = 'hidden';

const preloaderInterval = setInterval(() => {
  progress += Math.random() * 14;
  if (progress >= 100) {
    progress = 100;
    clearInterval(preloaderInterval);
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      revealOnScroll();
      startCounters();
    }, 400);
  }
  preloaderFill.style.width = progress + '%';
}, 40);

/* --- NAVBAR SCROLL BEHAVIOUR --- */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky glass style
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Active link highlight
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 110) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });

  // Scroll reveal
  revealOnScroll();
});

/* --- MOBILE MENU --- */
const hamburger   = document.getElementById('hamburger');
const mobileLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileLinks.classList.toggle('open');
});

mobileLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileLinks.classList.remove('open');
  });
});

/* --- SCROLL REVEAL --- */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.9;
  revealEls.forEach((el, i) => {
    if (el.getBoundingClientRect().top < triggerBottom) {
      setTimeout(() => el.classList.add('revealed'), i * 50);
    }
  });
}

/* --- ANIMATED COUNTERS --- */
function startCounters() {
  document.querySelectorAll('.stat-num').forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let current  = 0;
    const step   = target / (1800 / 16);
    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(update);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };
    requestAnimationFrame(update);
  });
}

/* --- TESTIMONIAL SLIDER --- */
const track         = document.getElementById('testimonialTrack');
const cards         = track ? track.querySelectorAll('.testimonial-card') : [];
const dotsWrapper   = document.getElementById('tDots');
const totalSlides   = cards.length;
let currentSlide    = 0;
let autoSlideTimer;

function goToSlide(index) {
  currentSlide = (index + totalSlides) % totalSlides;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.t-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

if (dotsWrapper && totalSlides > 0) {
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 't-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => { goToSlide(i); resetAutoSlide(); });
    dotsWrapper.appendChild(dot);
  });

  document.getElementById('tPrev').addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoSlide(); });
  document.getElementById('tNext').addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoSlide(); });
}

function startAutoSlide() { autoSlideTimer = setInterval(() => goToSlide(currentSlide + 1), 5000); }
function resetAutoSlide()  { clearInterval(autoSlideTimer); startAutoSlide(); }
if (totalSlides > 0) startAutoSlide();

/* --- GALLERY LIGHTBOX --- */
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose   = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img     = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption');
    lightboxImg.src             = img.src;
    lightboxImg.alt             = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

/* --- CONTACT FORM --- */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formSubmit  = document.getElementById('formSubmit');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    contactForm.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#e87070';
        valid = false;
        setTimeout(() => field.style.borderColor = '', 2200);
      }
    });
    if (!valid) return;

    formSubmit.querySelector('span').textContent = 'Sending…';
    formSubmit.disabled = true;

    setTimeout(() => {
      contactForm.reset();
      formSubmit.querySelector('span').textContent = 'Send Enquiry';
      formSubmit.disabled = false;
      formSuccess.classList.add('visible');
      setTimeout(() => formSuccess.classList.remove('visible'), 5000);
    }, 1600);
  });

  contactForm.querySelectorAll('input, select, textarea').forEach(f => {
    f.addEventListener('input', () => f.style.borderColor = '');
  });
}

/* --- SMOOTH ANCHOR SCROLL --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});
