/**
 * JINMEN CULTURE V3 — Shared JavaScript
 * Language toggle, nav, scroll animations, copy-to-clipboard
 */

// ---- Language Toggle ----
function initLangToggle() {
  const saved = localStorage.getItem('jm-lang') || 'cn';
  applyLang(saved);

  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.langBtn;
      applyLang(lang);
      localStorage.setItem('jm-lang', lang);
    });
  });
}

function applyLang(lang) {
  document.body.classList.toggle('show-en', lang === 'en');
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    const isActive = btn.dataset.langBtn === lang;
    btn.classList.toggle('active', isActive);
  });
}

// ---- Navigation Injection ----
function injectNav() {
  const navHTML = `
    <header class="site-nav" id="siteNav">
      <a href="index.html" class="logo">
        <img src="images/jinmen-logo.png" alt="浸门文化">
        <div class="logo-text">
          <span class="cn">浸门文化</span>
          <span class="en">JINMEN CULTURE</span>
        </div>
      </a>

      <nav aria-label="Main navigation">
        <ul class="nav-links">
          <li><a href="index.html" data-nav="index"><span class="lang-cn">首页</span><span class="lang-en">Home</span></a></li>
          <li><a href="ip.html" data-nav="ip"><span class="lang-cn">原创IP</span><span class="lang-en">Original IP</span></a></li>
          <li><a href="engineering.html" data-nav="engineering"><span class="lang-cn">幻觉工程</span><span class="lang-en">Engineering</span></a></li>
          <li><a href="shows.html" data-nav="shows"><span class="lang-cn">品牌演出</span><span class="lang-en">Brand Shows</span></a></li>
          <li><a href="direction.html" data-nav="direction"><span class="lang-cn">演艺创意</span><span class="lang-en">Creative Direction</span></a></li>
          <li><a href="about.html" data-nav="about"><span class="lang-cn">关于我们</span><span class="lang-en">About</span></a></li>
          <li><a href="contact.html" data-nav="contact"><span class="lang-cn">联系我们</span><span class="lang-en">Contact</span></a></li>
        </ul>
      </nav>

      <div style="display:flex;align-items:center;gap:16px;">
        <div class="lang-toggle">
          <button data-lang-btn="cn" class="active">CN</button>
          <span style="color:#4A4438;">|</span>
          <button data-lang-btn="en">EN</button>
        </div>
        <button class="nav-mobile-btn" onclick="toggleMobileMenu()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </header>

    <div class="mobile-menu" id="mobileMenu">
      <button class="close" onclick="toggleMobileMenu()">&times;</button>
      <a href="index.html"><span class="lang-cn">首页</span><span class="lang-en">Home</span></a>
      <a href="ip.html"><span class="lang-cn">原创IP</span><span class="lang-en">Original IP</span></a>
      <a href="engineering.html"><span class="lang-cn">幻觉工程</span><span class="lang-en">Engineering</span></a>
      <a href="shows.html"><span class="lang-cn">品牌演出</span><span class="lang-en">Brand Shows</span></a>
      <a href="direction.html"><span class="lang-cn">演艺创意</span><span class="lang-en">Creative Direction</span></a>
      <a href="about.html"><span class="lang-cn">关于我们</span><span class="lang-en">About</span></a>
      <a href="contact.html"><span class="lang-cn">联系我们</span><span class="lang-en">Contact</span></a>
    </div>
  `;

  const placeholder = document.getElementById('nav-placeholder');
  if (placeholder) {
    placeholder.innerHTML = navHTML;
    injectMobileTabs();
    initLangToggle();
  }
}

function injectMobileTabs() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  if (document.getElementById('mobilePageTabs')) return;

  const tabsHTML = `
    <div class="mobile-page-tabs" id="mobilePageTabs">
      <a href="index.html" data-tab="index"><span class="lang-cn">首页</span><span class="lang-en">Home</span></a>
      <a href="ip.html" data-tab="ip"><span class="lang-cn">原创IP</span><span class="lang-en">Original IP</span></a>
      <a href="engineering.html" data-tab="engineering"><span class="lang-cn">幻觉工程</span><span class="lang-en">Engineering</span></a>
      <a href="shows.html" data-tab="shows"><span class="lang-cn">品牌演出</span><span class="lang-en">Brand Shows</span></a>
      <a href="direction.html" data-tab="direction"><span class="lang-cn">演艺创意</span><span class="lang-en">Creative Direction</span></a>
      <a href="about.html" data-tab="about"><span class="lang-cn">关于我们</span><span class="lang-en">About</span></a>
      <a href="contact.html" data-tab="contact"><span class="lang-cn">联系我们</span><span class="lang-en">Contact</span></a>
    </div>
  `;
  nav.insertAdjacentHTML('afterend', tabsHTML);

  const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('#mobilePageTabs a').forEach(tab => {
    if (tab.dataset.tab === currentPage) tab.classList.add('active');
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

// ---- Active Nav Link ----
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === currentPage) link.classList.add('active');
  });
}

// ---- Scroll to top on page load ----
function scrollToTop() {
  window.scrollTo(0, 0);
}

// ---- Hero background parallax switch ----
function initHeroParallax() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      document.body.classList.toggle('scrolled-past-hero', !entry.isIntersecting);
    },
    { threshold: 0 }
  );
  observer.observe(hero);
}

// ---- Fade-up on scroll ----
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// ---- Copy to Clipboard ----
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(showToast);
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast();
  }
}

function showToast() {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = '已复制到剪贴板 / Copied to clipboard';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// ---- Lightbox ----
let currentLightboxImages = [];
let currentLightboxIndex = 0;

function openLightbox(images, index) {
  if (!images || images.length === 0) return;
  currentLightboxImages = images;
  currentLightboxIndex = Math.min(index, images.length - 1);
  renderLightbox();
}

function renderLightbox() {
  let lb = document.getElementById('lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.className = 'lightbox';
    lb.onclick = (e) => { if (e.target === lb) closeLightbox(); };
    document.body.appendChild(lb);
  }

  const img = currentLightboxImages[currentLightboxIndex];
  lb.innerHTML = `
    <button class="lb-close" onclick="closeLightbox()">&times;</button>
    <button class="lb-prev" onclick="lightboxPrev()">&#8249;</button>
    <img src="${img.src}" alt="${img.caption || ''}" onclick="event.stopPropagation()">
    <button class="lb-next" onclick="lightboxNext()">&#8250;</button>
    <div style="position:absolute;bottom:20px;left:50%;transform:translateX(-50%);color:#8A8070;font-size:12px;">
      ${currentLightboxIndex + 1} / ${currentLightboxImages.length}
    </div>
  `;
  lb.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.style.display = 'none';
  document.body.style.overflow = '';
}

function lightboxPrev() {
  currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
  renderLightbox();
}

function lightboxNext() {
  currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
  renderLightbox();
}

// ---- Initialize everything ----
document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  setActiveNav();
  initHeroParallax();
  initScrollAnimations();
});
