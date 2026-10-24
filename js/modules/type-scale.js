/**
 * js/modules/type-scale.js
 * Typography Scale & Hierarchy Calculator
 * Generates type scale ratios (Golden Ratio, Major Third, Perfect Fourth, etc.)
 */

const RATIOS = {
  'Minor Second (1.067)':  1.067,
  'Major Second (1.125)':  1.125,
  'Minor Third (1.200)':   1.200,
  'Major Third (1.250)':   1.250,
  'Perfect Fourth (1.333)':1.333,
  'Augmented Fourth (1.414)':1.414,
  'Perfect Fifth (1.500)': 1.500,
  'Golden Ratio (1.618)':  1.618,
  'Major Sixth (1.667)':   1.667,
  'Major Seventh (1.875)': 1.875,
  'Double Octave (2.000)': 2.000,
};

const LABELS = ['Caption','Keterangan','Body','Subjudul Kecil','Subjudul','H3','H2','H1','Hero'];

export function initTypeScale() {
  const ratioSel  = document.getElementById('tsRatio');
  const baseSize  = document.getElementById('tsBaseSize');
  const baseSizeV = document.getElementById('tsBaseSizeVal');
  const unitSel   = document.getElementById('tsUnit');
  const tbody     = document.getElementById('tsTableBody');

  // Populate ratio dropdown
  if (ratioSel) {
    Object.keys(RATIOS).forEach(name => {
      const opt = document.createElement('option');
      opt.value = name; opt.textContent = name;
      if (name.includes('Perfect Fourth')) opt.selected = true;
      ratioSel.appendChild(opt);
    });
  }

  function update() {
    const base  = parseFloat(baseSize.value) || 16;
    const ratio = RATIOS[ratioSel.value] || 1.333;
    const unit  = unitSel.value || 'px';
    baseSizeV.textContent = base + 'px';

    // Generate 9 levels: -2 to +6 steps from base
    const steps = [-2,-1,0,1,2,3,4,5,6];
    const sizes = steps.map(s => {
      const px = base * Math.pow(ratio, s);
      if (unit === 'px') return Math.round(px * 10) / 10;
      if (unit === 'rem') return Math.round((px/16)*100)/100;
      if (unit === 'pt') return Math.round((px * 0.75) * 10) / 10;
      return Math.round(px * 10) / 10;
    });

    tbody.innerHTML = sizes.map((size, i) => {
      const label = LABELS[i] ?? `Level ${i}`;
      const isBase = steps[i] === 0;
      const px = steps[i] >= 0 ? base * Math.pow(ratio, steps[i]) : base * Math.pow(ratio, steps[i]);
      const lineH = steps[i] <= 0 ? 1.6 : steps[i] <= 2 ? 1.4 : 1.2;
      return `
        <tr class="type-scale-row border-b border-gray-100 dark:border-gray-800 ${isBase ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}">
          <td class="py-2 pr-3 text-xs text-gray-400 font-mono whitespace-nowrap">${steps[i] >= 0 ? '+'+steps[i] : steps[i]}</td>
          <td class="py-2 pr-3 text-xs font-medium">${label}${isBase ? ' <span class="text-indigo-500 text-xs">(base)</span>':''}</td>
          <td class="py-2 pr-3 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">${size}${unit}</td>
          <td class="py-2 pr-3 text-xs text-gray-400">${lineH}</td>
          <td class="py-2"><span style="font-size:${Math.min(px,48)}px;line-height:1.2;font-family:inherit" class="block truncate max-w-xs">Aa</span></td>
        </tr>`;
    }).join('');
  }

  [ratioSel, baseSize, unitSel].forEach(el => el?.addEventListener('input', () => {
    if (el === baseSize) baseSizeV.textContent = baseSize.value + 'px';
    update();
  }));

  update();
}
