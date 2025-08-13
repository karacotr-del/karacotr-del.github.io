// KARA Co. site interactions
const navToggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  menu.classList.toggle('open');
});

// Dynamic year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Reduce motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.shape').forEach(el => el.style.animation = 'none');
}
