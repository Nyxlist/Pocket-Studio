/**
 * js/modules/contrast.js
 * WCAG 2.1 Contrast Checker — luminance-based ratio, AA/AAA status
 */

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function relativeLuminance(r, g, b) {
  return [r, g, b].map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }).reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
}

function calcRatio(hex1, hex2) {
  const L1 = relativeLuminance(...hexToRgb(hex1));
  const L2 = relativeLuminance(...hexToRgb(hex2));
  const [light, dark] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (light + 0.05) / (dark + 0.05);
}

function badge(pass) {
  return pass
    ? `<span class="text-sm font-semibold text-green-600 dark:text-green-400">✓ PASS</span>`
    : `<span class="text-sm font-semibold text-red-500 dark:text-red-400">✗ FAIL</span>`;
}

export function showToast(msg = '✓ Hex Code disalin!') {
  const t = document.getElementById('copyToast');
  t.textContent = msg;
  t.classList.remove('hidden', 'toast-anim');
  // force reflow so animation re-triggers
  void t.offsetWidth;
  t.classList.add('toast-anim');
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 2500);
}

export function copyHex(inputId) {
  const val = document.getElementById(inputId)?.value;
  if (!val) return;
  navigator.clipboard.writeText(val).then(() => showToast('✓ ' + val + ' disalin!'));
}

function updateContrast() {
  const fg = document.getElementById('fgHex').value;
  const bg = document.getElementById('bgHex').value;
  if (!/^#[0-9a-fA-F]{6}$/.test(fg) || !/^#[0-9a-fA-F]{6}$/.test(bg)) return;

  const ratio = calcRatio(fg, bg);
  document.getElementById('contrastRatio').textContent = ratio.toFixed(2);
  document.getElementById('normalAA').innerHTML  = badge(ratio >= 4.5);
  document.getElementById('normalAAA').innerHTML = badge(ratio >= 7);
  document.getElementById('largeAA').innerHTML   = badge(ratio >= 3);
  document.getElementById('largeAAA').innerHTML  = badge(ratio >= 4.5);

  const box = document.getElementById('contrastPreviewBox');
  box.style.backgroundColor = bg;
  box.style.color = fg;
}

function syncPicker(pickerId, hexId) {
  const picker   = document.getElementById(pickerId);
  const hexInput = document.getElementById(hexId);
  picker.addEventListener('input', () => { hexInput.value = picker.value; updateContrast(); });
  hexInput.addEventListener('input', () => {
    if (/^#[0-9a-fA-F]{6}$/.test(hexInput.value)) {
      picker.value = hexInput.value;
      updateContrast();
    }
  });
}

export function initContrast() {
  syncPicker('fgColor', 'fgHex');
  syncPicker('bgColor', 'bgHex');

  document.querySelectorAll('.quick-pair').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('fgHex').value   = btn.dataset.fg;
      document.getElementById('bgHex').value   = btn.dataset.bg;
      document.getElementById('fgColor').value = btn.dataset.fg;
      document.getElementById('bgColor').value = btn.dataset.bg;
      updateContrast();
    });
  });

  updateContrast();
}
