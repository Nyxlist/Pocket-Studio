/**
 * js/modules/bleed-calculator.js
 * Kalkulator Bleed, Margin & Spine
 * Menghitung spine thickness berdasarkan GSM & halaman, bleed area, safety margin
 */

// GSM → mm per sheet (empirical approximation: 1 sheet ≈ 2 pages)
// Typical coated paper: 80gsm ≈ 0.10mm/page, 150gsm ≈ 0.17mm/page, 350gsm cover
function estimateSpine(pages, gsm) {
  // pages = total pages including cover; divide by 2 for leaf count
  const leaves = Math.max(1, Math.floor(pages / 2));
  const mmPerLeaf = gsm <= 90 ? 0.10 : gsm <= 130 ? 0.13 : gsm <= 170 ? 0.17 : gsm <= 250 ? 0.22 : 0.28;
  return (leaves * mmPerLeaf).toFixed(2);
}

export function initBleedCalculator() {
  const ids = ['bleedW','bleedH','bleedAmt','marginAmt','gsmInput','pagesInput'];
  const get = id => document.getElementById(id);

  function update() {
    const w      = parseFloat(get('bleedW').value)   || 0;
    const h      = parseFloat(get('bleedH').value)   || 0;
    const bleed  = parseFloat(get('bleedAmt').value) || 3;
    const margin = parseFloat(get('marginAmt').value)|| 5;
    const gsm    = parseFloat(get('gsmInput').value) || 90;
    const pages  = parseFloat(get('pagesInput').value)|| 32;

    // Bleed box (document + bleed on all sides)
    const bleedW = (w + bleed * 2).toFixed(1);
    const bleedH = (h + bleed * 2).toFixed(1);
    // Safety (live area minus margin from trim)
    const safeW  = Math.max(0, w - margin * 2).toFixed(1);
    const safeH  = Math.max(0, h - margin * 2).toFixed(1);
    // Spine
    const spine  = estimateSpine(pages, gsm);

    get('outBleedBox').textContent   = `${bleedW} × ${bleedH} mm`;
    get('outTrimBox').textContent    = `${w} × ${h} mm`;
    get('outSafeBox').textContent    = `${safeW} × ${safeH} mm`;
    get('outSpine').textContent      = `≈ ${spine} mm`;
    get('outBleedNote').textContent  = `Tambahkan ${bleed}mm di semua sisi pada setup dokumen.`;
    get('outMarginNote').textContent = `Jaga elemen penting dalam area safe ${margin}mm dari tepi potong.`;
    get('outSpineNote').textContent  = pages < 16 ? '⚠ Halaman terlalu sedikit untuk spine terlihat jelas.' : `Spine ${spine}mm cukup untuk judul punggung buku.`;

    // SVG diagram
    renderDiagram(w, h, bleed, margin, +spine);
  }

  function renderDiagram(w, h, bleed, margin, spine) {
    const canvas = get('bleedDiagram');
    if (!canvas) return;
    const maxDim = 200;
    const scale = maxDim / Math.max(w + bleed*2, h + bleed*2, 1);
    const bW = (w + bleed*2) * scale;
    const bH = (h + bleed*2) * scale;
    const tW = w * scale;
    const tH = h * scale;
    const sW = Math.max(0, (w - margin*2)) * scale;
    const sH = Math.max(0, (h - margin*2)) * scale;
    const ox = (220 - bW) / 2;
    const oy = (220 - bH) / 2;

    canvas.innerHTML = `
      <svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
        <!-- Bleed -->
        <rect x="${ox}" y="${oy}" width="${bW}" height="${bH}" fill="#fecaca" stroke="#ef4444" stroke-width="1" rx="1"/>
        <!-- Trim -->
        <rect x="${ox + bleed*scale}" y="${oy + bleed*scale}" width="${tW}" height="${tH}" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,2"/>
        <!-- Safe -->
        <rect x="${ox + bleed*scale + margin*scale}" y="${oy + bleed*scale + margin*scale}" width="${sW}" height="${sH}" fill="rgba(167,243,208,0.6)" stroke="#10b981" stroke-width="1" stroke-dasharray="2,2"/>
        <!-- Labels -->
        <text x="${ox + bW/2}" y="${oy - 5}" text-anchor="middle" font-size="8" fill="#ef4444">Bleed</text>
        <text x="${ox + bleed*scale + tW/2}" y="${oy + bleed*scale - 3}" text-anchor="middle" font-size="8" fill="#3b82f6">Trim (potong)</text>
        <text x="${ox + bleed*scale + margin*scale + sW/2}" y="${oy + bleed*scale + margin*scale + sH/2}" text-anchor="middle" dominant-baseline="middle" font-size="8" fill="#059669">Safe Area</text>
      </svg>`;
  }

  ids.forEach(id => {
    const el = get(id);
    if (el) el.addEventListener('input', update);
  });

  update();
}
