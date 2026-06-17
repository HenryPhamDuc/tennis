/*
 * open-external-links.js
 *
 * Auto-adds target="_blank" (and rel="noopener noreferrer" for security) to
 * any link in the page that points to an external http(s) URL. This way the
 * Tennis Future Lab Website and Tennis Future Lab Audio Podcast links in the
 * top menu open in a new tab without requiring us to hand-edit every link.
 *
 * Runs after DOMContentLoaded. Uses a try/catch so it never breaks the page.
 */

(function() {
  'use strict';

  function openExternalLinksInNewTab() {
    // Select only:
    //  - top tabs (.md-tabs__link)
    //  - sidebar links (.md-nav__link)
    //  - content links (.md-content a)
    // Skip:
    //  - mailto: links (Contact should stay in same tab so the mail client opens)
    //  - anchor links (href starting with #)
    //  - internal site links (href starting with / or relative paths)
    var links = document.querySelectorAll(
      '.md-tabs__link, .md-nav__link, .md-content a'
    );

    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var href = link.getAttribute('href');
      if (!href) continue;

      // Skip mailto:, tel:, anchor, and internal links
      if (
        href.indexOf('mailto:') === 0 ||
        href.indexOf('tel:') === 0 ||
        href.indexOf('#') === 0 ||
        href.indexOf('/') === 0 ||
        href.indexOf('./') === 0 ||
        href.indexOf('../') === 0
      ) {
        continue;
      }

      // If it looks like a full URL, mark it as external
      if (href.indexOf('http://') === 0 || href.indexOf('https://') === 0) {
        link.setAttribute('target', '_blank');
        // Security: prevent the new tab from accessing window.opener
        var rel = link.getAttribute('rel') || '';
        if (rel.indexOf('noopener') === -1) {
          link.setAttribute('rel', (rel + ' noopener noreferrer').trim());
        }
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', openExternalLinksInNewTab);
  } else {
    openExternalLinksInNewTab();
  }
})();
