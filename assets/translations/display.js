/* Apply saved copy without replacing elements, handlers, URLs or menu labels. */
(() => {
  const page = location.pathname.split('/').pop() || 'index.html';
  if (!['index.html', 'blog.html'].includes(page)) return;
  const locale = new URLSearchParams(location.search).get('lang') || 'en';
  const dictionary = window.STARTWEB7_TRANSLATIONS?.locales?.[locale];
  if (!dictionary || locale === 'en') return;
  const skip = 'head,script,style,noscript,svg,nav,footer,form,input,textarea,select,button,[hidden],[aria-hidden="true"],[role="dialog"],.sw7-universal-header,.sw7-mobile-overlay,.sw7-compact-overlay,.topbar,.rights-footer,[data-sw7-no-translate]';
  const eligible = parent => parent && !parent.closest(skip) &&
    parent.closest('h1,h2,h3,h4,h5,h6,p,li,time') &&
    (!parent.closest('a') || parent.closest('h1,h2,h3,h4,h5,h6'));
  function render() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) if (eligible(walker.currentNode.parentElement)) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const source = node.nodeValue.replace(/\s+/g, ' ').trim();
      if (Object.hasOwn(dictionary, source) && typeof dictionary[source] === 'string' && dictionary[source].trim()) {
        const before = node.nodeValue.match(/^\s*/)[0], after = node.nodeValue.match(/\s*$/)[0];
        const value = before + dictionary[source] + after;
        if (node.nodeValue !== value) node.nodeValue = value;
      }
    }
  }
  function start() {
    document.documentElement.lang = locale;
    render();
    let queued = false;
    new MutationObserver(() => {
      if (queued) return;
      queued = true;
      queueMicrotask(() => { queued = false; render(); });
    }).observe(document.body, {subtree: true, childList: true, characterData: true});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once: true});
  else start();
})();
