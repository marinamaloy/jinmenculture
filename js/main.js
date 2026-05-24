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

      <ul class="nav-links">
        <li><a href="index.html" data-nav="index">首页</a></li>
        <li><a href="ip.html" data-nav="ip">原创IP</a></li>
        <li><a href="engineering.html" data-nav="engineering">幻觉工程</a></li>
        <li><a href="shows.html" data-nav="shows">品牌演出</a></li>
        <li><a href="direction.html" data-nav="direction">演艺创意</a></li>
        <li><a href="about.html" data-nav="about">关于我们</a></li>
        <li><a href="contact.html" data-nav="contact">联系我们</a></li>
      </ul>

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
      <a href="index.html">首页 / Home</a>
      <a href="ip.html">原创IP / Original IP</a>
      <a href="engineering.html">幻觉工程 / Engineering</a>
      <a href="shows.html">品牌演出 / Brand Shows</a>
      <a href="direction.html">演艺创意 / Direction</a>
      <a href="about.html">关于我们 / About</a>
      <a href="contact.html">联系我们 / Contact</a>
    </div>
  `;

  const placeholder = document.getElementById('nav-placeholder');
  if (placeholder) placeholder.innerHTML = navHTML;
  
  // Inject mobile scrollable tabs
  injectMobileTabs();
}

// Separate function - NOT inside injectNav()
function injectMobileTabs() {
  const tabsHTML = `
    <div class="mobile-page-tabs" id="mobilePageTabs">
      <a href="index.html" data-tab="index">首页</a>
      <a href="ip.html" data-tab="ip">原创IP</a>
      <a href="engineering.html" data-tab="engineering">幻觉工程</a>
      <a href="shows.html" data-tab="shows">品牌演出</a>
      <a href="direction.html" data-tab="direction">演艺创意</a>
      <a href="about.html" data-tab="about">关于我们</a>
      <a href="contact.html" data-tab="contact">联系我们</a>
    </div>
  `;
  
  // Insert after site-nav
  const nav = document.querySelector('.site-nav');
  if (nav) nav.insertAdjacentHTML('afterend', tabsHTML);
  
  // Highlight active tab
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('#mobilePageTabs a').forEach(tab => {
    if (tab.dataset.tab === currentPage) tab.classList.add('active');
  });
}

function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
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
  currentLightboxImages = images;
  currentLightboxIndex = index;
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
  initLangToggle();
  setActiveNav();
  scrollToTop();
  initHeroParallax();
  initScrollAnimations();
});
