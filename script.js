/* ==========================================================================
   Mobile navigation
   ========================================================================== */
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');

function closeMobileNav() {
  mobileNav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function openMobileNav() {
  mobileNav.classList.add('open');
  menuButton.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

menuButton.addEventListener('click', () => {
  const isOpen = mobileNav.classList.contains('open');
  isOpen ? closeMobileNav() : openMobileNav();
});

document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', closeMobileNav);
});

/* ==========================================================================
   Header background on scroll
   ========================================================================== */
const header = document.getElementById('siteHeader');

function updateHeaderState() {
  header.classList.toggle('scrolled', window.scrollY > 12);
}

updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });

/* ==========================================================================
   Scroll reveal animations
   ========================================================================== */
const revealTargets = document.querySelectorAll('.reveal, .btn-reveal');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
} else {
  // Stagger siblings that reveal together (e.g. cards, pillars) for a
  // smoother, more premium feel.
  const groups = new Map();
  revealTargets.forEach((el) => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach((siblings) => {
    siblings.forEach((el, index) => {
      el.style.setProperty('--reveal-delay', `${Math.min(index * 0.12, 0.36)}s`);
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
}

/* ==========================================================================
   Sponsor detail modal
   ========================================================================== */
const sponsorButton = document.getElementById('sponsorDetailButton');
const sponsorModal = document.getElementById('sponsorModal');
const sponsorModalClose = document.getElementById('sponsorModalClose');

if (sponsorButton && sponsorModal) {
  const openSponsorModal = () => {
    sponsorModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    sponsorModalClose.focus();
  };

  const closeSponsorModal = () => {
    sponsorModal.classList.remove('open');
    document.body.style.overflow = '';
    sponsorButton.focus();
  };

  sponsorButton.addEventListener('click', openSponsorModal);
  sponsorModalClose.addEventListener('click', closeSponsorModal);

  sponsorModal.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', closeSponsorModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sponsorModal.classList.contains('open')) {
      closeSponsorModal();
    }
  });
}

/* ==========================================================================
   Active nav link highlighting
   ========================================================================== */
const navLinks = document.querySelectorAll('.nav a[data-nav]');
const sections = Array.from(navLinks)
  .map((link) => document.getElementById(link.dataset.nav))
  .filter(Boolean);

if (sections.length && 'IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = document.querySelector(`.nav a[data-nav="${entry.target.id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
