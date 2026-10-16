/* Shared behavior for every page: theme toggle, mobile nav, scroll state,
   scroll-spy and scroll reveals. Loaded with `defer`. */
(function () {
  var root = document.documentElement;

  /* Reveals are registered first so content is never left hidden if later
     logic throws. `.reveal` is only hidden while <html> has the `js` class
     (added by the inline head script), so no-JS visitors see everything. */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    var reveal = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      reveal.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  var toggle = document.getElementById('theme-toggle');
  var meta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#1a1a1a' : '#f8fafc');
    if (toggle) {
      toggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
    }
  }

  applyTheme(root.getAttribute('data-theme') || 'light');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
    });
  }

  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav');
  if (navToggle && nav) {
    var closeNav = function () {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation menu');
    };
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute(
        'aria-label',
        open ? 'Close navigation menu' : 'Open navigation menu'
      );
    });
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeNav();
    });
  }

  var navbar = document.getElementById('navbar');
  var onScroll = function () {
    if (navbar) navbar.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* Scroll-spy: only for same-page anchors (links to other pages are ignored). */
  var links = Array.prototype.slice
    .call(document.querySelectorAll('.nav__link'))
    .filter(function (link) {
      return (link.getAttribute('href') || '').charAt(0) === '#';
    });
  var sections = links
    .map(function (link) {
      return document.querySelector(link.getAttribute('href'));
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(function (section) {
      spy.observe(section);
    });
  }

  /* Pipeline section (main page): switch pipelines, then stages within each.
     Progressive enhancement — without JS every panel and detail stays visible. */
  var pipeTabs = Array.prototype.slice.call(document.querySelectorAll('.pipe-tab'));
  if (pipeTabs.length) {
    var panels = Array.prototype.slice.call(document.querySelectorAll('.pipe-panel'));

    var selectPipe = function (key) {
      pipeTabs.forEach(function (tab) {
        var on = tab.getAttribute('data-pipe') === key;
        tab.setAttribute('aria-selected', String(on));
        tab.setAttribute('tabindex', on ? '0' : '-1');
      });
      panels.forEach(function (panel) {
        panel.classList.toggle('is-active', panel.getAttribute('data-pipe') === key);
      });
    };

    pipeTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        selectPipe(tab.getAttribute('data-pipe'));
      });
      tab.addEventListener('keydown', function (event) {
        var index = pipeTabs.indexOf(tab);
        var next = null;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          next = (index + 1) % pipeTabs.length;
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          next = (index - 1 + pipeTabs.length) % pipeTabs.length;
        } else if (event.key === 'Home') {
          next = 0;
        } else if (event.key === 'End') {
          next = pipeTabs.length - 1;
        }
        if (next !== null) {
          event.preventDefault();
          selectPipe(pipeTabs[next].getAttribute('data-pipe'));
          pipeTabs[next].focus();
        }
      });
    });

    selectPipe(pipeTabs[0].getAttribute('data-pipe'));

    Array.prototype.slice.call(document.querySelectorAll('.method')).forEach(function (method) {
      var stages = Array.prototype.slice.call(method.querySelectorAll('.stage'));
      var details = Array.prototype.slice.call(method.querySelectorAll('.detail'));
      if (!stages.length) return;

      var selectStage = function (index) {
        stages.forEach(function (stage, i) {
          stage.setAttribute('aria-selected', String(i === index));
          stage.setAttribute('tabindex', i === index ? '0' : '-1');
        });
        details.forEach(function (detail, i) {
          detail.classList.toggle('is-active', i === index);
        });
      };

      stages.forEach(function (stage, index) {
        stage.addEventListener('click', function () {
          selectStage(index);
        });
        stage.addEventListener('keydown', function (event) {
          var next = null;
          if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            next = (index + 1) % stages.length;
          } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            next = (index - 1 + stages.length) % stages.length;
          } else if (event.key === 'Home') {
            next = 0;
          } else if (event.key === 'End') {
            next = stages.length - 1;
          }
          if (next !== null) {
            event.preventDefault();
            selectStage(next);
            stages[next].focus();
          }
        });
      });

      selectStage(0);
    });
  }
})();
