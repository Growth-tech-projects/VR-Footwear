'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initScrollReveal();
  initCounters();
  initActiveNavLinks();
  initBackToTop();
  initSmoothScrollLinks();
  initTypingAnimation();
  initParallax();
  initTilt();
  initOfferStagger();
  initWaTooltip();
  initScrollProgress();
  initPageLoadAnimation();
});

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
    document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
  });

  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      btn.classList.remove('open');
      links.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  elements.forEach(el => observer.observe(el));
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const isDecimal = target % 1 !== 0;
    const duration = 1800;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      let currentValue = easeOutExpo(progress) * target;
      el.textContent = isDecimal ? currentValue.toFixed(1) : Math.floor(currentValue).toLocaleString('en-IN');

      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActive = () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
}

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
      }
    });
  });
}

function initTypingAnimation() {
  const typing = document.querySelector('.msg.typing');
  if (!typing) return;
  setInterval(() => {
    typing.style.opacity = '0.4';
    setTimeout(() => { typing.style.opacity = '1'; }, 600);
  }, 3000);
}

function initParallax() {
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const x = (e.clientX - left) / width  - 0.5;
      const y = (e.clientY - top)  / height - 0.5;

      hero.querySelectorAll('.shape').forEach((shape, i) => {
        shape.style.transform = `translate(${x * (i+1) * 12}px, ${y * (i+1) * 12}px)`;
      });
      const heroImg = hero.querySelector('.hero-img-wrap');
      if (heroImg) heroImg.style.transform = `translate(${x * -8}px, ${y * -8}px)`;
    });

    hero.addEventListener('mouseleave', () => {
      hero.querySelectorAll('.shape').forEach(s => s.style.transform = '');
      const heroImg = hero.querySelector('.hero-img-wrap');
      if (heroImg) heroImg.style.transform = '';
    });
  }
}

function initTilt() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
      card.style.transform = `translateY(-8px) rotateX(${-y}deg) rotateY(${x}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.35s cubic-bezier(0.4,0,0.2,1)';
    });
  });
}

function initOfferStagger() {
  const offerCards = document.querySelectorAll('.offer-card');
  const offerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 100);
        offerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  offerCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    offerObserver.observe(card);
  });
}

function initWaTooltip() {
  const floatWa = document.querySelector('.float-wa');
  if (floatWa && !sessionStorage.getItem('wa_tooltip_shown')) {
    const tooltip = document.createElement('div');
    tooltip.textContent = '💬 Order on WhatsApp!';
    Object.assign(tooltip.style, {
      position: 'absolute', right: '72px', top: '50%', transform: 'translateY(-50%)',
      background: '#fff', color: '#111', padding: '8px 14px', borderRadius: '8px',
      fontSize: '0.78rem', fontWeight: '700', fontFamily: "'Montserrat', sans-serif",
      whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', pointerEvents: 'none'
    });

    floatWa.appendChild(tooltip);

    setTimeout(() => {
      tooltip.style.transition = 'opacity 0.4s ease';
      tooltip.style.opacity = '0';
      setTimeout(() => tooltip.remove(), 400);
    }, 4000);

    sessionStorage.setItem('wa_tooltip_shown', '1');
  }
}

function initScrollProgress() {
  const progressBar = document.createElement('div');
  Object.assign(progressBar.style, {
    position: 'fixed', top: '0', left: '0', height: '3px',
    background: 'linear-gradient(to right, #e01a2f, #ff6b7a)',
    width: '0%', zIndex: '9999', transition: 'width 0.1s linear', pointerEvents: 'none'
  });

  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${docHeight > 0 ? (scrollTop / docHeight) * 100 : 0}%`;
  }, { passive: true });
}

function initPageLoadAnimation() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  }));
}

function sendWhatsApp() {
  const name    = (document.getElementById('name')?.value || '').trim();
  const phone   = (document.getElementById('phone')?.value || '').trim();
  const product = (document.getElementById('product')?.value || '').trim();
  const message = (document.getElementById('message')?.value || '').trim();

  if (!name) {
    showToast('Please enter your name.', 'error');
    return;
  }

  if (phone) {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
      showToast('Please enter a valid 10-digit phone number.', 'error');
      return;
    }
  } else if (!message && !product) {
    showToast('Please provide a phone number, message, or select a product.', 'error');
    return;
  }

  let text = `Hello V. R. Footwear! 👋\n\n`;
  if (name)    text += `Name: ${name}\n`;
  if (phone)   text += `Phone: ${phone}\n`;
  if (product) text += `Looking for: ${product}\n`;
  if (message) text += `Message: ${message}\n`;
  text += `\nPlease help me find the right footwear. Thank you!`;

  window.open(`https://wa.me/919916290383?text=${encodeURIComponent(text)}`, '_blank');
  showToast("Opening WhatsApp... We'll get back to you shortly! 😊", 'success');

  ['name', 'phone', 'product', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function showToast(msg, type = 'success') {
  const existing = document.querySelector('.vr-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'vr-toast';
  toast.textContent = msg;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '96px', left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: type === 'success' ? '#25D366' : '#e01a2f',
    color: '#fff', padding: '14px 28px', borderRadius: '50px',
    fontFamily: "'Montserrat', sans-serif", fontWeight: '700', fontSize: '0.88rem',
    boxShadow: '0 8px 28px rgba(0,0,0,0.25)', zIndex: '9999',
    opacity: '0', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
    whiteSpace: 'nowrap', maxWidth: '90vw', textAlign: 'center'
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  }));

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}