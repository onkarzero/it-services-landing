const CONTACT_EMAIL = 'contacto@tu-dominio.com';
const availableLanguages = ['es', 'en', 'pa'];
const languageSelectors = {
  navServices: 'nav a[href="#servicios"]', navMethod: 'nav a[href="#como-funciona"]', navContact: '.nav-contact', eyebrow: '.hero .eyebrow', heroText: '.hero-text', heroContact: '.button-primary', heroSolutions: '.button-secondary', heroMicrocopy: '.microcopy',
  email: '.node-email b', incoming: '.node-email small', data: '.node-data b', organised: '.node-data small', document: '.node-doc b', ready: '.node-doc small', automate: '.core-face strong', connected: '.core-face small',
  painTitle: '#pain-title', pain1: '.pain-grid article:nth-child(1) h3', pain1Text: '.pain-grid article:nth-child(1) p', pain2: '.pain-grid article:nth-child(2) h3', pain2Text: '.pain-grid article:nth-child(2) p', pain3: '.pain-grid article:nth-child(3) h3', pain3Text: '.pain-grid article:nth-child(3) p',
  servicesTitle: '#services-title', servicesText: '.services .section-intro > p:not(.eyebrow)', service1: '.service-card:nth-child(1) h3', service1Text: '.service-card:nth-child(1) p', service2: '.service-card:nth-child(2) h3', service2Text: '.service-card:nth-child(2) p', service3: '.service-card:nth-child(3) h3', service3Text: '.service-card:nth-child(3) p', service4: '.service-card:nth-child(4) h3', service4Text: '.service-card:nth-child(4) p',
  methodTitle: '#method-title', step1: '.steps li:nth-child(1) h3', step1Text: '.steps li:nth-child(1) p', step2: '.steps li:nth-child(2) h3', step2Text: '.steps li:nth-child(2) p', step3: '.steps li:nth-child(3) h3', step3Text: '.steps li:nth-child(3) p', step4: '.steps li:nth-child(4) h3', step4Text: '.steps li:nth-child(4) p',
  ctaTitle: '.final-cta h2', ctaText: '.final-cta > div > p:not(.eyebrow)', ctaButton: '.button-light', footer: 'footer > span'
};

function setText(selector, value) { const element = document.querySelector(selector); if (element) element.textContent = value; }
function setEyebrow(selector, value) { const element = document.querySelector(selector); if (element) element.innerHTML = '<span></span> ' + value; }
function applyLanguage(language) {
  const copy = translations[language];
  if (!copy) return;
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
  document.title = copy.pageTitle;
  const description = document.querySelector('meta[name="description"]'); if (description) description.content = copy.descriptionMeta;
  Object.entries(languageSelectors).forEach(([key, selector]) => setText(selector, copy[key]));
  setEyebrow('.hero .eyebrow', copy.eyebrow);
  setEyebrow('.pain-points .eyebrow', copy.painEyebrow);
  setEyebrow('.services .eyebrow', copy.servicesEyebrow);
  setEyebrow('.method .eyebrow', copy.methodEyebrow);
  setEyebrow('.final-cta .eyebrow', copy.ctaEyebrow);
  const h1 = document.querySelector('.hero h1'); if (h1) h1.innerHTML = copy.heroTitle;
  const stage = document.querySelector('.automation-stage'); if (stage) stage.setAttribute('aria-label', copy.stageAria);
  document.querySelectorAll('[data-contact-link]').forEach((link) => {
    link.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(copy.subject)}`;
  });
  const current = document.querySelector('[data-language-current]'); if (current) current.textContent = language.toUpperCase();
  const toggle = document.querySelector('.language-toggle'); if (toggle) toggle.setAttribute('aria-label', copy.language || 'Language');
  document.querySelectorAll('[data-language-option]').forEach((button) => button.classList.toggle('is-selected', button.dataset.languageOption === language));
  localStorage.setItem('site-language', language);
}

const picker = document.createElement('div');
picker.className = 'language-picker';
picker.setAttribute('role', 'dialog');
picker.setAttribute('aria-modal', 'true');
picker.innerHTML = `<div class="language-picker__panel"><p class="language-picker__eyebrow">SOLUCIONES <span>IT</span></p><h2></h2><p class="language-picker__description"></p><div class="language-picker__options">${availableLanguages.map((code) => [code, translations[code]]).map(([code, copy]) => `<button type="button" data-language-option="${code}">${copy.name}</button>`).join('')}</div></div>`;
document.body.prepend(picker);
const styles = document.createElement('style');
styles.textContent = `.language-toggle{margin-left:14px;border:1px solid var(--line);background:#fff;color:var(--ink);border-radius:99px;padding:8px 12px;font:700 .78rem "DM Sans",sans-serif;cursor:pointer}.language-picker{position:fixed;inset:0;z-index:20;display:grid;place-items:center;padding:24px;background:#061c35eF}.language-picker[hidden]{display:none}.language-picker__panel{width:min(480px,100%);padding:42px;border-radius:22px;background:#fff;color:var(--ink);text-align:center}.language-picker__eyebrow{margin:0 0 25px;font:700 1rem "Space Grotesk",sans-serif;letter-spacing:.08em}.language-picker__eyebrow span{color:var(--blue)}.language-picker h2{margin:0;font:700 clamp(2rem,6vw,3rem) "Space Grotesk",sans-serif;letter-spacing:-.04em}.language-picker__description{color:var(--muted);margin:12px 0 28px}.language-picker__options{display:grid;gap:10px}.language-picker button{border:1px solid var(--line);border-radius:12px;background:#fff;padding:15px;color:var(--ink);font:600 1rem "DM Sans",sans-serif;cursor:pointer}.language-picker button:hover,.language-picker button.is-selected{border-color:var(--blue);background:#edf7ff;color:var(--blue)}html[lang="pa"] body{font-family:"Noto Sans Gurmukhi","DM Sans",sans-serif}html[lang="pa"] h1,html[lang="pa"] h2,html[lang="pa"] h3{font-family:"Noto Sans Gurmukhi","Space Grotesk",sans-serif}html[lang="ur"] body{font-family:"Noto Nastaliq Urdu",serif;line-height:1.85}html[lang="ur"] h1,html[lang="ur"] h2,html[lang="ur"] h3{font-family:"Noto Nastaliq Urdu",serif;line-height:1.55}html[dir="rtl"] .language-picker__panel{text-align:right}html[dir="rtl"] .language-picker__options{text-align:center}@media(max-width:570px){.language-toggle{margin-left:8px;padding:7px 9px}.language-picker__panel{padding:32px 22px}}`;
document.head.append(styles);
function updatePickerCopy(language) { const copy = translations[language]; picker.querySelector('h2').textContent = copy.prompt; picker.querySelector('.language-picker__description').textContent = copy.description; }
function chooseLanguage(language) { applyLanguage(language); updatePickerCopy(language); picker.hidden = true; }
picker.addEventListener('click', (event) => { const button = event.target.closest('[data-language-option]'); if (button) chooseLanguage(button.dataset.languageOption); });
const toggle = document.createElement('button');
toggle.className = 'language-toggle'; toggle.type = 'button'; toggle.setAttribute('aria-label', 'Change language'); toggle.innerHTML = '<span aria-hidden="true">◎</span> <span data-language-current>ES</span>';
document.querySelector('.site-header').append(toggle);
toggle.addEventListener('click', () => { const active = availableLanguages.includes(localStorage.getItem('site-language')) ? localStorage.getItem('site-language') : 'es'; updatePickerCopy(active); picker.hidden = false; });
const savedLanguage = localStorage.getItem('site-language');
const activeLanguage = availableLanguages.includes(savedLanguage) ? savedLanguage : null;
if (activeLanguage) { applyLanguage(activeLanguage); picker.hidden = true; } else { updatePickerCopy('es'); }
if (activeLanguage) applyLanguage(activeLanguage);

const stage = document.querySelector('.automation-stage');
if (stage && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  stage.addEventListener('pointermove', (event) => { const rect = stage.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width - 0.5; const y = (event.clientY - rect.top) / rect.height - 0.5; stage.style.transform = `rotateY(${x * 7}deg) rotateX(${y * -5}deg)`; });
  stage.addEventListener('pointerleave', () => { stage.style.transform = ''; });
}
