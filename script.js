/* Replace this value once the dedicated email account has been created. */
const CONTACT_EMAIL = 'contacto@tu-dominio.com';

document.querySelectorAll('[data-contact-link]').forEach((link) => {
  const subject = link.href.includes('?') ? link.href.substring(link.href.indexOf('?')) : '';
  link.href = `mailto:${CONTACT_EMAIL}${subject}`;
  if (link.textContent.trim() === 'contacto@tu-dominio.com') link.textContent = CONTACT_EMAIL;
});

const stage = document.querySelector('.automation-stage');
if (stage && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  stage.addEventListener('pointermove', (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stage.style.transform = `rotateY(${x * 7}deg) rotateX(${y * -5}deg)`;
  });
  stage.addEventListener('pointerleave', () => { stage.style.transform = ''; });
}