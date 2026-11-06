/**
 * JINMEN CULTURE V3 — Shared JavaScript
 * Language toggle, nav, scroll animations, copy-to-clipboard
 */

// ---- Shared language helpers ----
function jmText(cn, en) {
  return document.documentElement.lang === 'en' ? en : cn;
}

function jmSetMessage(element, cn, en) {
  element.dataset.cn = cn;
  element.dataset.en = en;
  element.textContent = jmText(cn, en);
}

function jmApplyLanguageContent(lang) {
  document.querySelectorAll('[data-en]').forEach(element => {
    if (!element.hasAttribute('data-cn')) element.dataset.cn = element.textContent;
    element.textContent = lang === 'en' ? element.dataset.en : element.dataset.cn;
  });
  ['placeholder', 'aria-label', 'alt', 'content'].forEach(attribute => {
    document.querySelectorAll('[data-' + attribute + '-en]').forEach(element => {
      const originalKey = 'data-' + attribute + '-cn';
      if (!element.hasAttribute(originalKey)) {
        element.setAttribute(originalKey, element.getAttribute(attribute) || '');
      }
      element.setAttribute(attribute, element.getAttribute(
        'data-' + attribute + (lang === 'en' ? '-en' : '-cn')
      ));
    });
  });
}

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
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
  document.body.classList.toggle('show-en', lang === 'en');
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    const isActive = btn.dataset.langBtn === lang;
    btn.classList.toggle('active', isActive);
  });
  jmApplyLanguageContent(lang);
  requestAnimationFrame(revealActiveMobileTab);
  const lightbox = document.getElementById('lightbox');
  if (lightbox && lightbox.style.display === 'flex') renderLightbox();
}

// ---- Navigation Injection ----
function injectNav() {
  const navHTML = `
    <header class="site-nav" id="siteNav">
      <a href="/" class="logo">
        <img
  src="images/jinmen-logo.png"
  alt="浸门文化" data-alt-en="Jinmen Culture"
  width="182"
  height="256"
>
        <div class="logo-text">
          <span class="cn">浸门文化</span>
          <span class="en">JINMEN CULTURE</span>
        </div>
      </a>

      <nav aria-label="Main navigation">
        <ul class="nav-links">
          <li><a href="/" data-nav="index"><span class="lang-cn">首页</span><span class="lang-en">Home</span></a></li>
          <li><a href="/ip" data-nav="ip"><span class="lang-cn">原创IP</span><span class="lang-en">Original IP</span></a></li>
          <li><a href="/engineering" data-nav="engineering"><span class="lang-cn">幻觉工程</span><span class="lang-en">Engineering</span></a></li>
          <li><a href="/shows" data-nav="shows"><span class="lang-cn">品牌演出</span><span class="lang-en">Brand Shows</span></a></li>
          <li><a href="/direction" data-nav="direction"><span class="lang-cn">演艺创意</span><span class="lang-en">Creative Direction</span></a></li>
          <li><a href="/about" data-nav="about"><span class="lang-cn">关于我们</span><span class="lang-en">About</span></a></li>
          <li><a href="/contact" data-nav="contact"><span class="lang-cn">联系我们</span><span class="lang-en">Contact</span></a></li>
        </ul>
      </nav>

      <div style="display:flex;align-items:center;gap:16px;">
        <div class="lang-toggle">
          <button data-lang-btn="cn" class="active">CN</button>
          <span style="color:#4A4438;">|</span>
          <button data-lang-btn="en">EN</button>
        </div>
        <button
  class="nav-mobile-btn"
  type="button"
  onclick="toggleMobileMenu()"
  aria-label="打开导航菜单 / Open navigation menu" data-aria-label-en="Open navigation menu"
  aria-controls="mobileMenu"
  aria-expanded="false"
>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    aria-hidden="true"
    focusable="false"
  >
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
</button>
      </div>
    </header>

    <div class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="网站导航" data-aria-label-en="Site navigation" aria-hidden="true" inert>
      <button
  class="close"
  type="button"
  onclick="toggleMobileMenu()"
  aria-label="关闭导航菜单 / Close navigation menu" data-aria-label-en="Close navigation menu"
>
  &times;
</button>
      <a href="/"><span class="lang-cn">首页</span><span class="lang-en">Home</span></a>
      <a href="/ip"><span class="lang-cn">原创IP</span><span class="lang-en">Original IP</span></a>
      <a href="/engineering"><span class="lang-cn">幻觉工程</span><span class="lang-en">Engineering</span></a>
      <a href="/shows"><span class="lang-cn">品牌演出</span><span class="lang-en">Brand Shows</span></a>
      <a href="/direction"><span class="lang-cn">演艺创意</span><span class="lang-en">Creative Direction</span></a>
      <a href="/about"><span class="lang-cn">关于我们</span><span class="lang-en">About</span></a>
      <a href="/contact"><span class="lang-cn">联系我们</span><span class="lang-en">Contact</span></a>
    </div>
  `;

  const placeholder = document.getElementById('nav-placeholder');
  if (placeholder) {
    placeholder.innerHTML = navHTML;
    injectMobileTabs();
    initLangToggle();
    initMobileMenu();
  }
}

function injectMobileTabs() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  if (document.getElementById('mobilePageTabs')) return;

  const tabsHTML = `
    <nav class="mobile-page-tabs" id="mobilePageTabs" aria-label="网站栏目" data-aria-label-en="Site sections">
      <div class="mobile-tabs-scroll">
      <a href="/" data-tab="index"><span class="lang-cn">首页</span><span class="lang-en">Home</span></a>
      <a href="/ip" data-tab="ip"><span class="lang-cn">原创IP</span><span class="lang-en">Original IP</span></a>
      <a href="/engineering" data-tab="engineering"><span class="lang-cn">幻觉工程</span><span class="lang-en">Engineering</span></a>
      <a href="/shows" data-tab="shows"><span class="lang-cn">品牌演出</span><span class="lang-en">Brand Shows</span></a>
      <a href="/direction" data-tab="direction"><span class="lang-cn">演艺创意</span><span class="lang-en">Creative Direction</span></a>
      <a href="/about" data-tab="about"><span class="lang-cn">关于我们</span><span class="lang-en">About</span></a>
      </div>
      <a href="/contact" data-tab="contact" class="mobile-contact-link"><span class="lang-cn">联系</span><span class="lang-en">Contact</span></a>
    </nav>
  `;
  nav.insertAdjacentHTML('afterend', tabsHTML);

  const currentPage = getCurrentNavPage();
  document.querySelectorAll('#mobilePageTabs a').forEach(tab => {
    if (tab.dataset.tab === currentPage) {
      tab.classList.add('active');
      tab.setAttribute('aria-current', 'page');
    }
  });
}

function getCurrentNavPage() {
  const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  return ({ ghost: 'ip', weixunxiu: 'shows' })[page] || page;
}

function revealActiveMobileTab() {
  const scroller = document.querySelector('.mobile-tabs-scroll');
  const active = scroller && scroller.querySelector('.active');
  if (!active || !scroller.clientWidth) return;
  const item = active.getBoundingClientRect();
  const rail = scroller.getBoundingClientRect();
  scroller.scrollLeft += item.left - rail.left - (rail.width - item.width) / 2;
}

let mobileMenuRestore = [];
let mobileMenuOverflow = '';
let mobileMenuReturnFocus = null;

function setMobileMenu(open, restoreFocus = true) {
  const menu = document.getElementById('mobileMenu');
  const button = document.querySelector('.nav-mobile-btn');
  if (!menu || menu.classList.contains('open') === open) return;

  if (open) {
    mobileMenuReturnFocus = document.activeElement;
    mobileMenuOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menu.inert = false;
    menu.setAttribute('aria-hidden', 'false');
    menu.classList.add('open');
    button.setAttribute('aria-expanded', 'true');
    menu.querySelector('.close').focus();
    // Disable every background branch, even when the menu is nested in a placeholder.
    for (let node = menu; node.parentElement && node !== document.body; node = node.parentElement) {
      [...node.parentElement.children].filter(sibling => sibling !== node).forEach(sibling => {
        mobileMenuRestore.push([sibling, sibling.inert]);
        sibling.inert = true;
      });
    }
  } else {
    mobileMenuRestore.forEach(([element, inert]) => { element.inert = inert; });
    mobileMenuRestore = [];
    menu.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = mobileMenuOverflow;
    if (restoreFocus && mobileMenuReturnFocus?.isConnected) mobileMenuReturnFocus.focus();
    else if (menu.contains(document.activeElement)) document.activeElement.blur();
    menu.inert = true;
    menu.setAttribute('aria-hidden', 'true');
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) setMobileMenu(!menu.classList.contains('open'));
}

function initMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMobileMenu(false)));
  document.addEventListener('keydown', event => {
    if (!menu.classList.contains('open')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setMobileMenu(false);
    } else if (event.key === 'Tab') {
      const controls = [...menu.querySelectorAll('button, a[href]')];
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  });
  const currentPage = getCurrentNavPage();
  menu.querySelectorAll('a').forEach(link => {
    if (link.getAttribute('href') === (currentPage === 'index' ? '/' : '/' + currentPage)) {
      link.setAttribute('aria-current', 'page');
    }
  });
  const desktop = window.matchMedia('(min-width: 901px)');
  desktop.addEventListener('change', event => {
    if (event.matches) setMobileMenu(false, false);
    else revealActiveMobileTab();
  });
  window.addEventListener('resize', revealActiveMobileTab);
}

// ---- Active Nav Link ----

function setActiveNav() {
  const currentPage = getCurrentNavPage();
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
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
    navigator.clipboard.writeText(text).then(function () {
      jmTrackCopiedContact(text);
      showToast();
    });
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(ta);
    if (copied) { jmTrackCopiedContact(text); showToast(); }
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
  jmSetMessage(toast, '已复制到剪贴板', 'Copied to clipboard');
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
    <button class="lb-close" onclick="closeLightbox()" aria-label="${jmText('关闭图片', 'Close image')}">&times;</button>
    <button class="lb-prev" onclick="lightboxPrev()" aria-label="${jmText('上一张', 'Previous image')}">&#8249;</button>
    <img src="${img.src}" alt="${jmText(img.caption || '', img.captionEn || img.caption || '')}" onclick="event.stopPropagation()">
    <button class="lb-next" onclick="lightboxNext()" aria-label="${jmText('下一张', 'Next image')}">&#8250;</button>
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



// ---- Enquiry measurement and submission ----
function jmTrackEvent(name, parameters) {
  // A blocked analytics script must never stop a customer from contacting us.
  try { if (typeof window.jmTrack === 'function') window.jmTrack(name, parameters); } catch (_) {}
}

function jmTrackCopiedContact(value) {
  const method = value === '1379197706@qq.com' ? 'email_copy' : value === 'Alex-lives' ? 'wechat_copy' : null;
  if (!method) return; // Do not treat copied social links as enquiries.
  const active = document.activeElement;
  const location = active?.closest('.site-footer') ? 'footer' : active?.closest('.cta-section, .cta-row') ? 'cta' : 'page';
  jmTrackEvent('jm_contact_click', { contact_method: method, contact_location: location });
}

async function jmSubmitInquiry(event, formName) {
  event.preventDefault();
  const form = event.target;
  const labels = {
    contact: ['发送', 'Send'],
    engineering: ['提交询价', 'Submit Enquiry'],
    weixunxiu: ['提交预约', 'Submit Booking']
  };
  if (!labels[formName] || ['sending', 'success'].includes(form.dataset.submitState)) return;
  if (!form.reportValidity()) return;
  const button = form.querySelector('button[type="submit"]');
  form.querySelector('.inquiry-feedback')?.remove();
  form.dataset.submitState = 'sending';
  button.disabled = true;
  jmSetMessage(button, '发送中...', 'Sending...');

  const reference = form.dataset.submissionId || ('JM-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 8).toUpperCase());
  form.dataset.submissionId = reference;
  const payload = new FormData(form);
  payload.set('submission_id', reference);
  payload.set('source_page', window.location.origin + window.location.pathname);
  payload.set('site_language', document.documentElement.lang === 'en' ? 'en' : 'zh-CN');
  const live = ['www.jinmenculture.com', 'jinmenculture.com'].includes(window.location.hostname);
  payload.set('site_environment', live ? 'production' : 'preview');
  payload.set('_subject', (live ? '' : '[PREVIEW] ') + 'Jinmen ' + formName + ' enquiry — ' + reference);
  jmTrackEvent('jm_form_attempt', { form_name: formName });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetch(form.action, {
      method: 'POST', body: payload, headers: { Accept: 'application/json' }, signal: controller.signal
    });
    if (!response.ok) {
      const error = new Error('Submission not accepted');
      error.isServerError = true;
      throw error;
    }
    form.dataset.submitState = 'success';
    jmTrackEvent('generate_lead', { form_name: formName });
    const status = document.createElement('div');
    status.className = 'inquiry-feedback';
    status.setAttribute('role', 'status');
    status.setAttribute('tabindex', '-1');
    status.style.cssText = 'text-align:center;color:var(--text-primary);padding:36px 0;line-height:1.8;';
    status.innerHTML = '<p style="color:var(--gold-text);font-size:20px;">✓ <span class="lang-cn">您的咨询已提交</span><span class="lang-en">Your enquiry has been submitted</span></p><p><span class="lang-cn">我们会尽快与您联系。请保留咨询编号：</span><span class="lang-en">We will contact you soon. Please keep your enquiry reference:</span></p>';
    const code = document.createElement('p');
    code.textContent = reference;
    status.appendChild(code);
    form.replaceChildren(status);
    status.focus({ preventScroll: true });
  } catch (error) {
    form.dataset.submitState = 'error';
    jmTrackEvent('jm_form_error', { form_name: formName, error_type: error.isServerError ? 'server' : 'network' });
    button.disabled = false;
    jmSetMessage(button, labels[formName][0], labels[formName][1]);
    const status = document.createElement('p');
    status.className = 'inquiry-feedback';
    status.setAttribute('role', 'alert');
    status.setAttribute('tabindex', '-1');
    status.style.cssText = 'margin-top:16px;color:var(--text-primary);line-height:1.7;';
    status.innerHTML = '<span class="lang-cn">暂时无法确认提交结果。您的填写内容已保留，请重试，或复制邮箱／微信联系我们，并提供咨询编号：</span><span class="lang-en">We could not confirm submission. Your entries are preserved. Please retry, or contact us by email or WeChat and share this reference:</span> ';
    status.appendChild(document.createTextNode(reference));
    form.appendChild(status);
    status.focus({ preventScroll: true });
  } finally {
    clearTimeout(timeout);
  }
}

function jmInitContactMeasurement() {
  document.addEventListener('click', event => {
    const phone = event.target.closest('a[href^="tel:"]');
    if (!phone) return;
    jmTrackEvent('jm_contact_click', {
      contact_method: 'phone',
      contact_location: phone.closest('.site-footer') ? 'footer' : phone.closest('.cta-section, .cta-row') ? 'cta' : 'page'
    });
  });
}

// ---- Initialize everything ----
document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  setActiveNav();
  initHeroParallax();
  initScrollAnimations();
  jmInitContactMeasurement();
});
