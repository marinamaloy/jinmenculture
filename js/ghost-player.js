/* The Bilibili player is created only after a visitor activates the poster. */
document.querySelectorAll('.ghost-video-play[data-player-src]').forEach(button => {
  button.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = button.dataset.playerSrc;
    frame.title = document.documentElement.lang === 'en'
      ? 'Ghost of the Circus trailer' : '《马戏团的幽魂》预告片';
    frame.allowFullscreen = true;
    frame.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
    frame.setAttribute('sandbox', 'allow-top-navigation allow-same-origin allow-forms allow-scripts');
    frame.setAttribute('scrolling', 'no');
    frame.setAttribute('frameborder', '0');
    frame.tabIndex = 0;
    button.replaceWith(frame);
    frame.focus();
  }, { once: true });
});
