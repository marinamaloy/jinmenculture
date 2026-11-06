/**
 * Existing counters run only on the live domain.
 * Preview events remain in the local dataLayer for QA and are never sent by these counters.
 */
(function () {
  var live = ['www.jinmenculture.com', 'jinmenculture.com'].includes(window.location.hostname);
  var environment = live ? 'production' : 'preview';
  document.documentElement.dataset.analyticsEnvironment = environment;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  // Accept only fixed categorical values; never send contact details or form contents.
  var allowedEvents = ['jm_contact_click', 'jm_form_attempt', 'generate_lead', 'jm_form_error'];
  var allowedParams = {
    form_name: ['contact', 'engineering', 'weixunxiu'],
    contact_method: ['email_copy', 'wechat_copy', 'phone'],
    contact_location: ['footer', 'cta', 'page'],
    error_type: ['server', 'network']
  };
  window.jmTrack = function (eventName, details) {
    if (!allowedEvents.includes(eventName)) return;
    var params = {
      site_environment: environment,
      site_language: document.documentElement.lang === 'en' ? 'en' : 'zh-CN',
      page_path: window.location.pathname
    };
    Object.keys(allowedParams).forEach(function (key) {
      if (details && allowedParams[key].includes(details[key])) params[key] = details[key];
    });
    window.gtag('event', eventName, params);
  };

  if (!live) return;
  function loadScript(src) {
    var script = document.createElement('script');
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }
  window.gtag('js', new Date());
  window.gtag('config', 'G-780TPBQQY2');
  loadScript('https://www.googletagmanager.com/gtag/js?id=G-780TPBQQY2');

  // Preserve the site's existing Baidu and homepage Aizhan counters on the live domain.
  window._hmt = window._hmt || [];
  loadScript('https://hm.baidu.com/hm.js?05115fa95834850c3d2f5c7b97722d35');
  if (['/', '/index.html'].includes(window.location.pathname)) {
    window._mtj = window._mtj || [];
    loadScript('https://node91.aizhantj.com:21233/tjjs/?k=538lbo8wcfg');
  }
})();
