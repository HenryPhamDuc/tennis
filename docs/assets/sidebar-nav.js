/*
 * sidebar-nav.js
 *
 * Adds two navigation bars to every page:
 *
 * 1. TOP NAV BAR (in sidebar) — sticky at the top, always visible.
 *    Shows: [⌂ Home] [← Previous: <title>] [Next: <title> →]
 *
 * 2. BOTTOM NAV BAR (after content) — at the end of the article.
 *    Same three buttons, plus a "Back to top" link.
 *
 * The prev/next is determined dynamically by walking the sidebar links in
 * order, so it stays correct as the library grows. No per-page config needed.
 *
 * Edge cases:
 * - Homepage (first page) → no Previous button
 * - Last page (Volley) → no Next button
 * - On the homepage, the Home button is disabled
 */

(function() {
  'use strict';

  // Build a flat list of pages from the sidebar, in the order they appear.
  function buildPageList() {
    var items = document.querySelectorAll(
      '.md-nav--primary .md-nav__link[href]'
    );
    var pages = [];
    var seen = {};
    for (var i = 0; i < items.length; i++) {
      var link = items[i];
      var href = link.getAttribute('href');
      if (!href || href === '#') continue;
      if (/^(https?:|mailto:|tel:)/i.test(href)) continue;
      if (!/(\/|\.html|\.md)/i.test(href)) continue;
      var key = href.replace(/\.\//, '').replace(/\/$/, '').toLowerCase();
      if (seen[key]) continue;
      seen[key] = true;
      var ellipsis = link.querySelector('.md-ellipsis');
      var title = ellipsis ? ellipsis.textContent.trim() : key;
      if (title === 'Home' && pages.length > 0) continue;
      pages.push({ href: href, title: title });
    }
    return pages;
  }

  // Find the current page's index in the list by matching the URL path.
  function findCurrentIndex(pages) {
    var currentPath = window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
    for (var i = 0; i < pages.length; i++) {
      var pageHref = pages[i].href
        .replace(/^\.\//, '')
        .replace(/^\//, '')
        .replace(/index\.html$/, '')
        .replace(/\/$/, '');
      if (!pageHref) continue;
      var currentTail = currentPath.split('/').filter(Boolean).slice(-2).join('/');
      var pageTail = pageHref.split('/').filter(Boolean).slice(-2).join('/');
      if (currentTail && pageTail && currentTail === pageTail) return i;
    }
    return -1;
  }

  // Truncate a title for button display
  function shortTitle(title) {
    var parts = title.split(/\s+[—–-]\s+/);
    return parts[0] || title;
  }

  // Build the HTML for one nav bar
  function buildBar(home, prev, next, position) {
    var bar = document.createElement('div');
    bar.className = 'hh-nav-bar hh-nav-bar--' + position;

    var homeDisabled = position === 'top' && !home.available;
    var prevDisabled = !prev;
    var nextDisabled = !next;

    var homeH = home.href;
    var prevH = prev ? prev.href : '#';
    var nextH = next ? next.href : '#';
    var prevTitle = prev ? 'Previous: ' + prev.title : 'No previous page';
    var nextTitle = next ? 'Next: ' + next.title : 'No next page';
    var prevLabel = prev ? shortTitle(prev.title) : '—';
    var nextLabel = next ? shortTitle(next.title) : '—';

    bar.innerHTML =
      '<a href="' + homeH + '" class="hh-nav-btn hh-nav-home' +
        (homeDisabled ? ' hh-nav-btn--disabled' : '') +
        '" title="Home — Complete Manual v2" aria-label="Home">' +
        '<span class="hh-nav-icon">⌂</span><span class="hh-nav-label">Home</span>' +
      '</a>' +
      '<a href="' + prevH + '" class="hh-nav-btn hh-nav-prev' +
        (prevDisabled ? ' hh-nav-btn--disabled' : '') +
        '" title="' + prevTitle + '"' +
        (prevDisabled ? ' aria-disabled="true"' : '') +
        '><span class="hh-nav-arrow">←</span><span class="hh-nav-content">' +
          '<span class="hh-nav-eyebrow">Previous</span>' +
          '<span class="hh-nav-title">' + prevLabel + '</span>' +
        '</span></a>' +
      '<a href="' + nextH + '" class="hh-nav-btn hh-nav-next' +
        (nextDisabled ? ' hh-nav-btn--disabled' : '') +
        '" title="' + nextTitle + '"' +
        (nextDisabled ? ' aria-disabled="true"' : '') +
        '><span class="hh-nav-content">' +
          '<span class="hh-nav-eyebrow">Next</span>' +
          '<span class="hh-nav-title">' + nextLabel + '</span>' +
        '</span><span class="hh-nav-arrow">→</span></a>';
    return bar;
  }

  function init() {
    var pages = buildPageList();
    if (pages.length === 0) return;
    var idx = findCurrentIndex(pages);
    if (idx < 0) return;

    var home = { href: '.', title: 'Home', available: true };
    var prev = idx > 0 ? pages[idx - 1] : null;
    var next = idx < pages.length - 1 ? pages[idx + 1] : null;

    // Top nav bar — sticky at top of sidebar
    var sidebar = document.querySelector('.md-sidebar--primary .md-sidebar__inner');
    if (sidebar) {
      var topBar = buildBar(home, prev, next, 'top');
      sidebar.insertBefore(topBar, sidebar.firstChild);
    }

    // Bottom nav bar — at the end of the content
    var content = document.querySelector('.md-content__inner');
    if (content) {
      var bottomBar = buildBar(home, prev, next, 'bottom');
      content.appendChild(bottomBar);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
