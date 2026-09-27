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
  if (preference.addEventListener) preference.addEventListener('change', updateThemeButton);
  else if (preference.addListener) preference.addListener(updateThemeButton);

  var controls = document.querySelector('.research-controls');
  var buttons = Array.from(controls.querySelectorAll('[data-filter]'));
  var works = Array.from(document.querySelectorAll('.work'));
  var status = document.querySelector('.research-status');
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
  }
  controls.hidden = false;
  buttons.forEach(function (button) {
    button.addEventListener('click', function () { setFilter(button.dataset.filter); });
  });
  setFilter(filter);

  // One archive, shown near the footer unless the top disclosure is open.
  var news = document.getElementById('news');
  var archive = document.getElementById('updates-archive');
  var newsList = news.querySelector('.news-list');
  function placeNews() {
    (news.open ? news : archive).appendChild(newsList);
    archive.hidden = news.open;
  }
  news.addEventListener('toggle', placeNews);
  placeNews();

  // Auto-advance while visible; vertical page scrolling must not stop playback.
  var gallery = document.querySelector('.photo-gallery');
  var galleryControls = document.querySelector('.gallery-controls');
  var galleryButtons = Array.from(galleryControls.querySelectorAll('[data-gallery-step]'));
  var playback = galleryControls.querySelector('.gallery-playback');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var playing = !reducedMotion.matches;
  var galleryVisible = !('IntersectionObserver' in window);
  var focused = false;
  var galleryTimer;
  galleryControls.hidden = false;
  function scheduleGallery() {
    clearTimeout(galleryTimer);
    if (playing && galleryVisible && !focused && !document.hidden) {
      galleryTimer = setTimeout(function () { advanceGallery(1); scheduleGallery(); }, 4000);
    }
  }
  function updatePlayback() {
    playback.textContent = playing ? 'Pause' : 'Play';
    playback.setAttribute('aria-label', (playing ? 'Pause' : 'Play') + ' photo carousel');
    scheduleGallery();
  }
  function advanceGallery(direction) {
    var step = gallery.querySelector('figure').getBoundingClientRect().width + 18;
    var end = gallery.scrollWidth - gallery.clientWidth;
    var position = gallery.scrollLeft + direction * step;
    if (direction > 0 && gallery.scrollLeft >= end - 2) position = 0;
    if (direction < 0 && gallery.scrollLeft <= 2) position = end;
    gallery.scrollTo({ left: position, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }
  galleryButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      playing = false;
      updatePlayback();
      advanceGallery(Number(button.dataset.galleryStep));
    });
  });
  playback.addEventListener('click', function () { playing = !playing; updatePlayback(); });
  gallery.addEventListener('focusin', function () { focused = true; scheduleGallery(); });
  gallery.addEventListener('focusout', function (event) {
    focused = gallery.contains(event.relatedTarget); scheduleGallery();
  });
  gallery.addEventListener('wheel', function (event) {
    // Only deliberate horizontal browsing pauses the carousel, never page scroll.
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) { playing = false; updatePlayback(); }
  }, { passive: true });
  document.addEventListener('visibilitychange', scheduleGallery);
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', function () {
    if (reducedMotion.matches) { playing = false; updatePlayback(); }
  });
  if ('IntersectionObserver' in window) {
    var galleryObserver = new IntersectionObserver(function (entries) {
      galleryVisible = entries[0].isIntersecting; scheduleGallery();
    }, { threshold: 0.25 });
    galleryObserver.observe(gallery);
  }
  updatePlayback();

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
    ['about', 'research', 'talks', 'blogs', 'background'].forEach(function (id) { observer.observe(document.getElementById(id)); });
  }
})();
