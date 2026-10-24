/**
 * js/modules/canvas-ratio.js
 * Canvas Aspect Ratio & Grid Guide
 */
export function initCanvasRatio() {
  function updateRatioBox(w, h, label, unit) {
    const maxW = 220, maxH = 240;
    let dw, dh;
    if (w / h > maxW / maxH) { dw = maxW; dh = Math.round(maxW * h / w); }
    else                     { dh = maxH; dw = Math.round(maxH * w / h); }

    const box = document.getElementById('ratioBox');
    box.style.width  = dw + 'px';
    box.style.height = dh + 'px';
    document.getElementById('ratioLabel').textContent = label;
    document.getElementById('ratioDimInfo').innerHTML = `
      <p class="text-2xl font-display font-bold text-indigo-600 dark:text-indigo-400">${w.toLocaleString()} × ${h.toLocaleString()}</p>
      <p class="text-sm text-gray-400">${unit}</p>
      <p class="text-xs text-gray-400 mt-1">Rasio: ${(w/h).toFixed(2)} : 1</p>
    `;
  }

  document.querySelectorAll('.format-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateRatioBox(+btn.dataset.w, +btn.dataset.h, btn.dataset.label, btn.dataset.unit);
    });
  });

  window.applyCustomRatio = function () {
    const w = parseInt(document.getElementById('customW').value);
    const h = parseInt(document.getElementById('customH').value);
    if (!w || !h || w <= 0 || h <= 0) return;
    document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
    updateRatioBox(w, h, 'Custom', 'px');
  };

  // Init with first active button
  const first = document.querySelector('.format-btn.active');
  if (first) updateRatioBox(+first.dataset.w, +first.dataset.h, first.dataset.label, first.dataset.unit);
}
