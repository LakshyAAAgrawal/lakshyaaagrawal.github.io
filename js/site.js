/* Minimal progressive enhancement: theme toggle + external-link hygiene. */
(function () {
  'use strict';

  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t === 'dark' || t === 'light') return t;
    return systemPrefersDark() ? 'dark' : 'light';
  }
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
    if (btn) btn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
  }

  if (btn) {
    btn.setAttribute('aria-pressed', currentTheme() === 'dark' ? 'true' : 'false');
    btn.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  // Open off-site links in a new tab, safely.
  var here = location.hostname;
  Array.prototype.forEach.call(document.querySelectorAll('a[href^="http"]'), function (a) {
    if (a.hostname && a.hostname !== here) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
  });
})();

// Match portrait width to h1 text width on mobile
function matchPortraitToH1() {
  const portrait = document.querySelector('.portrait-wrap');
  const h1 = document.querySelector('.hero h1');
  if (!portrait || !h1) return;
  
  if (window.innerWidth <= 820) {
    // Set portrait width to match h1 text width
    portrait.style.width = `${h1.offsetWidth}px`;
  } else {
    // Reset to default for desktop
    portrait.style.width = '';
  }
}

// Run on load and resize
window.addEventListener('DOMContentLoaded', matchPortraitToH1);
window.addEventListener('resize', matchPortraitToH1);
