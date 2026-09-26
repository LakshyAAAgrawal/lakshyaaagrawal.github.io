/* Progressive enhancement: static content remains usable without JavaScript. */
(function () {
  'use strict';
  var root = document.documentElement;
  var themeButton = document.querySelector('.theme-toggle');
  var preference = window.matchMedia('(prefers-color-scheme: dark)');
  function currentTheme() {
    return root.getAttribute('data-theme') || (preference.matches ? 'dark' : 'light');
  }
  function updateThemeButton() {
    var dark = currentTheme() === 'dark';
    themeButton.setAttribute('aria-label', 'Switch to ' + (dark ? 'light' : 'dark') + ' theme');
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.title = dark ? 'Switch to light theme' : 'Switch to dark theme';
  }
  themeButton.hidden = false;
  updateThemeButton();
  themeButton.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (error) { /* Device preference is optional. */ }
    updateThemeButton();
  });
  preference.addEventListener('change', updateThemeButton);

  var controls = document.querySelector('.research-controls');
  var buttons = Array.from(controls.querySelectorAll('[data-filter]'));
  var works = Array.from(document.querySelectorAll('.work'));
  var status = document.querySelector('.research-status');
  var showAll = document.querySelector('.show-all');
  var filter = 'selected';
  var labels = { selected: 'Selected work', all: 'All work', harness: 'Harness optimization', training: 'Model training & RL', evaluation: 'Evaluation', code: 'AI for code', systems: 'Programming languages & systems' };

  function setFilter(value) {
    filter = value;
    var visible = 0;
    works.forEach(function (work) {
      var matches = value === 'all' || (value === 'selected' ? work.dataset.selected === 'true' : work.dataset.topics.split(' ').includes(value));
      work.hidden = !matches;
      if (matches) visible++;
    });
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.filter === value));
    });
    status.textContent = labels[value] + ' · ' + visible + ' of ' + works.length + ' papers & projects';
    showAll.hidden = value === 'all';
  }
  controls.hidden = false;
  buttons.forEach(function (button) {
    button.addEventListener('click', function () { setFilter(button.dataset.filter); });
  });
  showAll.addEventListener('click', function () {
    setFilter('all');
    buttons.find(function (button) { return button.dataset.filter === 'all'; }).focus({ preventScroll: true });
    document.getElementById('research').scrollIntoView({ behavior: 'instant' });
  });
  setFilter(filter);

  // Preserve old section links and reveal a project when linking directly to it.
  var topicAnchors = { harness: 'harness', 'post-training': 'training', evaluation: 'evaluation', ai4code: 'code', pl: 'systems', publications: 'all', software: 'all' };
  function revealHash() {
    var id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (error) { return; }
    if (!id) return;
    var target = document.getElementById(id);
    if (topicAnchors[id]) {
      setFilter(topicAnchors[id]);
      if (!target) target = document.getElementById('research');
    }
    if (target && target.classList.contains('work') && target.hidden) setFilter('all');
    if (target) {
      var parent = target.parentElement;
      while (parent) {
        if (parent.tagName === 'DETAILS') parent.open = true;
        parent = parent.parentElement;
      }
      requestAnimationFrame(function () { target.scrollIntoView({ behavior: 'instant', block: 'start' }); });
    }
  }
  window.addEventListener('hashchange', revealHash);
  revealHash();

  if ('IntersectionObserver' in window) {
    var navLinks = Array.from(document.querySelectorAll('nav a'));
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -65% 0px' });
    ['about', 'research', 'talks', 'background'].forEach(function (id) { observer.observe(document.getElementById(id)); });
  }
})();
