/* Keep complete words together in mobile headings; shrink only when a word cannot fit. */
(function () {
  const selector = 'h1,h2,h3';
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  let pending = false;
  function fit() {
    pending = false;
    document.querySelectorAll('[data-sw7-title-fit]').forEach(title => {
      title.removeAttribute('data-sw7-title-fit');
      title.style.removeProperty('--sw7-title-size');
    });
    if (innerWidth > 640) return;
    document.querySelectorAll(selector).forEach(title => {
      if (!title.getClientRects().length || !title.clientWidth) return;
      const style = getComputedStyle(title);
      if (style.clip !== 'auto' || style.clipPath !== 'none') return;
      const size = parseFloat(style.fontSize);
      const available = title.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      let longest = 0;
      // Measure each text node with its own font, including uppercase transformations.
      const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode, font = getComputedStyle(node.parentElement);
        context.font = font.fontWeight + ' ' + font.fontSize + ' ' + font.fontFamily;
        const spacing = parseFloat(font.letterSpacing) || 0;
        let text = node.textContent;
        if (font.textTransform === 'uppercase') text = text.toUpperCase();
        text.split(/\s+/).filter(Boolean).forEach(word => {
          longest = Math.max(longest, context.measureText(word).width + spacing * word.length);
        });
      }
      if (longest > available && available > 0) {
        title.style.setProperty('--sw7-title-size', Math.floor(size * (available - 2) / longest * 10) / 10 + 'px');
        title.setAttribute('data-sw7-title-fit', '');
      }
    });
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(fit); } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, {once:true});
  else schedule();
  addEventListener('resize', schedule, {passive:true});
  addEventListener('load', schedule, {once:true});
  document.fonts.ready.then(schedule);
})();
