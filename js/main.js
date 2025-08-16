// ========== THEME TOGGLE ==========
const root = document.documentElement;
const btnTheme = document.getElementById('theme-toggle');
const saved = localStorage.getItem('theme');
if (saved === 'theme-dark' || saved === 'theme-light') {
  root.className = saved;
  if (btnTheme) btnTheme.textContent = saved === 'theme-dark' ? '☀️' : '🌙';
} else {
  // Follow system initially
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.className = prefersDark ? 'theme-dark' : 'theme-light';
  if (btnTheme) btnTheme.textContent = prefersDark ? '☀️' : '🌙';
}
if (btnTheme) {
  btnTheme.addEventListener('click', () => {
    const toDark = !root.classList.contains('theme-dark');
    root.className = toDark ? 'theme-dark' : 'theme-light';
    localStorage.setItem('theme', root.className);
    btnTheme.textContent = toDark ? '☀️' : '🌙';
    btnTheme.setAttribute('aria-pressed', String(toDark));
  });
}

// ========== MOBILE NAV ==========
const toggle = document.querySelector('.nav-toggle');
const list = document.querySelector('#nav-list');
if (toggle) {
  toggle.addEventListener('click', () => {
    const ex = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!ex));
    list.classList.toggle('open');
  });
}

// ========== REVEAL ON SCROLL ==========
const revealables = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  }
}, { threshold: .12 });
revealables.forEach(el => io.observe(el));

// ========== HERO PARALLAX (Home only) ==========
const hero = document.querySelector('.hero');
const heroTitle = document.querySelector('.hero-title');
const heroSub = document.querySelector('.hero-sub');
const orbs = document.querySelectorAll('.hero-orb');
let lastY = 0;
let ticking = false;

function heroParallax(y) {
  if (!hero) return;
  const h = hero.offsetHeight;
  const prog = Math.min(1, y / (h * 0.9));
  const ease = prog * (2 - prog); // easeOutQuad

  if (heroTitle) {
    heroTitle.style.transform = `translateY(${ease * -10}px) scale(${1 - ease * 0.03})`;
    heroTitle.style.opacity = String(1 - ease * 0.25);
  }
  if (heroSub) {
    heroSub.style.transform = `translateY(${ease * -6}px)`;
    heroSub.style.opacity = String(1 - ease * 0.35);
  }
  orbs.forEach((o, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    o.style.transform = `translateY(${ease * dir * 20}px) scale(${1 + ease * 0.04})`;
  });
}

if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    lastY = window.scrollY || window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        heroParallax(lastY);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  heroParallax(0);
}

// ========== TILT EFFECT (cards with .tilt) ==========
const tilts = document.querySelectorAll('.tilt');
tilts.forEach(card => {
  let rect;
  function setTransform(x, y){
    const rx = ((y - rect.top) / rect.height - 0.5) * -10;
    const ry = ((x - rect.left) / rect.width - 0.5) * 10;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  }
  card.addEventListener('mouseenter', () => { rect = card.getBoundingClientRect(); });
  card.addEventListener('mousemove', e => setTransform(e.clientX, e.clientY));
  card.addEventListener('mouseleave', () => { card.style.transform = 'rotateX(0) rotateY(0)'; });
});

// ========== CONTACT FORM (Formspree or mailto) ==========
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const status = document.getElementById('form-status');
    const formData = new FormData(form);
    const endpoint = form.querySelector('input[name="_formspree"]').value.trim();
    const data = Object.fromEntries(formData.entries());

    if (endpoint) {
      try {
        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });
        if (resp.ok) {
          status.textContent = 'Teşekkürler! Mesajınız alındı.';
          form.reset();
        } else {
          status.textContent = 'Gönderim başarısız oldu. Lütfen tekrar deneyin.';
        }
      } catch (e) {
        status.textContent = 'Bağlantı hatası. Lütfen tekrar deneyin.';
      }
    } else {
      const body = [
        `Ad Soyad: ${data.name || ''}`,
        `E-posta: ${data.email || ''}`,
        `Telefon: ${data.phone || ''}`,
        `Talep Türü: ${data.requestType || ''}`,
        `Hizmet: ${data.service || ''}`,
        '',
        `Mesaj: ${data.message || ''}`
      ].join('\n');
      const mailto = `mailto:karaco.tr@gmail.com?subject=Web%20Form&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      status.textContent = 'E-posta istemciniz açılıyor...';
    }
  });
}
