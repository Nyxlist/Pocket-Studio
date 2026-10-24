/**
 * js/modules/font-pairing.js
 * Font Pairing Playground — live preview with Google Fonts lazy loading
 */
const loadedFonts = new Set(['Inter', 'Space Grotesk']);

function loadGoogleFont(family) {
  if (loadedFonts.has(family)) return;
  loadedFonts.add(family);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;700&display=swap`;
  document.head.appendChild(link);
}

export function initFontPairing() {
  const ids = ['headingFont','bodyFont','headingSize','bodySize','lineHeight','letterSpacing'];
  const els = Object.fromEntries(ids.map(id => [id, document.getElementById(id)]));
  const pHead  = document.getElementById('previewHeading');
  const pBody  = document.getElementById('previewBody');
  const pBody2 = document.getElementById('previewBody2');

  function update() {
    const hFont = els.headingFont.value;
    const bFont = els.bodyFont.value;
    loadGoogleFont(hFont);
    loadGoogleFont(bFont);

    pHead.style.fontFamily  = `'${hFont}', serif`;
    pHead.style.fontSize    = els.headingSize.value + 'px';
    [pBody, pBody2].forEach(el => {
      el.style.fontFamily    = `'${bFont}', sans-serif`;
      el.style.fontSize      = els.bodySize.value + 'px';
      el.style.lineHeight    = els.lineHeight.value;
      el.style.letterSpacing = els.letterSpacing.value + 'px';
    });

    document.getElementById('hSizeVal').textContent = els.headingSize.value;
    document.getElementById('bSizeVal').textContent = els.bodySize.value;
    document.getElementById('lhVal').textContent    = parseFloat(els.lineHeight.value).toFixed(2);
    document.getElementById('lsVal').textContent    = els.letterSpacing.value;
  }

  ids.forEach(id => els[id].addEventListener('input', update));
  update();
}
