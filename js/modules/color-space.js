/**
 * js/modules/color-space.js
 * Color Space & Gamut Simulator
 * Estimates RGB → CMYK perceptual shift using ICC-like approximation
 */

// Simple RGB → CMYK formula (device-dependent approximation for preview)
function rgbToCmyk(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return [0, 0, 0, 100];
  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);
  return [Math.round(c*100), Math.round(m*100), Math.round(y*100), Math.round(k*100)];
}

// Reconstruct what CMYK would look like back on screen (sRGB simulation)
function cmykToRgb(c, m, y, k) {
  c /= 100; m /= 100; y /= 100; k /= 100;
  return [
    Math.round(255 * (1 - c) * (1 - k)),
    Math.round(255 * (1 - m) * (1 - k)),
    Math.round(255 * (1 - y) * (1 - k))
  ];
}

function hexToRgb(hex) {
  hex = hex.replace('#','');
  if (hex.length===3) hex = hex.split('').map(c=>c+c).join('');
  const n = parseInt(hex, 16);
  return [(n>>16)&255, (n>>8)&255, n&255];
}

function rgbToHex(r,g,b) {
  return '#' + [r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
}

function colorDelta(r1,g1,b1,r2,g2,b2) {
  // Simple Euclidean distance in sRGB space (0–441 range)
  return Math.round(Math.sqrt(Math.pow(r1-r2,2)+Math.pow(g1-g2,2)+Math.pow(b1-b2,2)));
}

export function initColorSpace() {
  const picker = document.getElementById('csColorPicker');
  const hexIn  = document.getElementById('csHexInput');

  function update() {
    const hex = hexIn.value;
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;
    const [r,g,b] = hexToRgb(hex);
    const [c,m,y,k] = rgbToCmyk(r,g,b);
    const [sr,sg,sb] = cmykToRgb(c,m,y,k);
    const simHex = rgbToHex(sr,sg,sb);
    const delta = colorDelta(r,g,b,sr,sg,sb);

    document.getElementById('csRgbBox').style.background = hex;
    document.getElementById('csCmykBox').style.background = simHex;
    document.getElementById('csRgbVal').textContent  = `RGB(${r}, ${g}, ${b})`;
    document.getElementById('csCmykVal').textContent = `C:${c}% M:${m}% Y:${y}% K:${k}%`;
    document.getElementById('csSimHex').textContent = simHex;
    document.getElementById('csDelta').textContent = delta;

    const risk = document.getElementById('csRisk');
    if (delta < 15) {
      risk.className = 'text-sm font-semibold text-green-600 dark:text-green-400';
      risk.textContent = '✓ Pergeseran minimal — warna aman untuk cetak';
    } else if (delta < 40) {
      risk.className = 'text-sm font-semibold text-amber-600 dark:text-amber-400';
      risk.textContent = '⚠ Pergeseran sedang — cek proof sebelum cetak massal';
    } else {
      risk.className = 'text-sm font-semibold text-red-600 dark:text-red-400';
      risk.textContent = '✗ Pergeseran tinggi — warna neon/vibrant tidak direproduksi akurat';
    }

    // Gamut warning for out-of-gamut hues
    const isNeon = (r > 200 && g > 200) || (r > 200 && b > 200) || (g > 200 && b > 200) || (r < 30 || g < 30 || b < 30);
    document.getElementById('csGamutWarn').classList.toggle('hidden', !isNeon);
  }

  picker.addEventListener('input', () => { hexIn.value = picker.value; update(); });
  hexIn.addEventListener('input', () => {
    if (/^#[0-9a-fA-F]{6}$/.test(hexIn.value)) { picker.value = hexIn.value; update(); }
  });

  // swatch quick picks
  document.querySelectorAll('.cs-swatch').forEach(s => {
    s.addEventListener('click', () => {
      hexIn.value = s.dataset.color;
      picker.value = s.dataset.color;
      update();
    });
  });

  update();
}
