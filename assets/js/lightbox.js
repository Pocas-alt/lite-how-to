// Minimal lightbox for all images inside .content
(function () {
  function ensureBackdrop() {
    let el = document.querySelector('.lb-backdrop');
    if (el) return el;
    el = document.createElement('div');
    el.className = 'lb-backdrop';
    el.innerHTML = '<img class="lb-image" alt="" /><button class="lb-close" aria-label="Uždaryti">×</button>';
    document.body.appendChild(el);
    el.addEventListener('click', (e) => {
      if (e.target === el || e.target.classList.contains('lb-close')) close();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    return el;
  }
  function open(src, alt) {
    const el = ensureBackdrop();
    const img = el.querySelector('.lb-image');
    img.src = src; img.alt = alt || '';
    el.classList.add('open');
  }
  function close() {
    const el = document.querySelector('.lb-backdrop');
    if (el) el.classList.remove('open');
  }
  function isImage(el) { return el && el.tagName === 'IMG'; }
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!isImage(t)) return;
    // Avoid zooming logos
    if (t.closest('header')) return;
    // If image is a link, prefer its href
    const link = t.closest('a');
    const src = link && link.href ? link.href : t.currentSrc || t.src;
    if (!src) return;
    e.preventDefault();
    open(src, t.alt);
  });
})();

