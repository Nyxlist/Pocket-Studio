/**
 * js/modules/checklist.js
 * Pre-flight Checklist — interactive checklist with progress bar
 */
const ITEMS = [
  { id:'c1',  label:'Mode warna sudah sesuai (CMYK untuk cetak, RGB untuk digital)',       group:'Warna' },
  { id:'c2',  label:'Resolusi minimal 300 DPI untuk materi cetak',                          group:'Resolusi' },
  { id:'c3',  label:'Bleed area 3mm sudah ditambahkan di semua sisi',                       group:'Layout' },
  { id:'c4',  label:'Safety margin sudah diterapkan (5mm dari tepi potong)',                group:'Layout' },
  { id:'c5',  label:'Semua font sudah di-convert ke outline/curves',                        group:'Tipografi' },
  { id:'c6',  label:'Semua gambar sudah embed (bukan link eksternal)',                      group:'Aset' },
  { id:'c7',  label:'Kontras warna teks sudah melewati uji WCAG AA',                       group:'Aksesibilitas' },
  { id:'c8',  label:'Ejaan dan teks sudah diproofread',                                    group:'Konten' },
  { id:'c9',  label:'Layer/artboard sudah terorganisir dengan nama yang jelas',             group:'Organisasi' },
  { id:'c10', label:'File sumber asli sudah disimpan dan dibackup',                        group:'Manajemen' },
  { id:'c11', label:'Preview hasil akhir sudah dicek di berbagai ukuran',                  group:'Review' },
  { id:'c12', label:'Nama file sudah sesuai konvensi + versi final',                       group:'Manajemen' },
];

const checked = new Set();

function updateProgress() {
  const pct = Math.round(checked.size / ITEMS.length * 100);
  document.getElementById('checkPercent').textContent = pct + '%';
  document.getElementById('checkProgress').style.width = pct + '%';
  const bar = document.getElementById('checkProgress');
  const pctEl = document.getElementById('checkPercent');
  const status = document.getElementById('checkStatus');
  if (pct >= 100) {
    bar.classList.replace('bg-indigo-600','bg-green-500');
    pctEl.className = 'text-sm font-bold text-green-600 dark:text-green-400';
    status.textContent = '🎉 Semua item selesai! Proyekmu siap untuk export.';
  } else {
    bar.classList.replace('bg-green-500','bg-indigo-600');
    pctEl.className = 'text-sm font-bold text-indigo-600 dark:text-indigo-400';
    status.textContent = pct === 0
      ? 'Mulai centang item di bawah.'
      : pct < 50
        ? `${checked.size} dari ${ITEMS.length} item selesai — terus lanjutkan! 💪`
        : `Hampir selesai! ${ITEMS.length - checked.size} item tersisa.`;
  }
}

function toggle(id) {
  const box   = document.getElementById('box-'   + id);
  const tick  = document.getElementById('tick-'  + id);
  const item  = document.getElementById('item-'  + id);
  if (checked.has(id)) {
    checked.delete(id);
    box.classList.remove('bg-indigo-600','border-indigo-600');
    box.classList.add('border-gray-300','dark:border-gray-600');
    tick.classList.add('hidden');
    item.classList.remove('checked');
  } else {
    checked.add(id);
    box.classList.add('bg-indigo-600','border-indigo-600');
    box.classList.remove('border-gray-300');
    tick.classList.remove('hidden');
    item.classList.add('checked');
  }
  updateProgress();
}

export function initChecklist() {
  const container = document.getElementById('checklistItems');
  container.innerHTML = ITEMS.map(item => `
    <div class="check-item flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
         id="item-${item.id}" onclick="window._toggleCheck('${item.id}')">
      <div class="w-5 h-5 mt-0.5 rounded border-2 border-gray-300 dark:border-gray-600 flex-shrink-0 flex items-center justify-center transition-colors"
           id="box-${item.id}">
        <svg class="w-3 h-3 text-white hidden" id="tick-${item.id}" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="check-label text-sm cursor-pointer select-none" id="label-${item.id}">${item.label}</p>
        <span class="text-xs text-gray-400">${item.group}</span>
      </div>
    </div>`).join('');

  // expose to global scope for inline onclick
  window._toggleCheck = toggle;
  window.checkAll     = () => ITEMS.forEach(i => { if (!checked.has(i.id)) toggle(i.id); });
  window.resetChecklist = () => [...checked].forEach(id => toggle(id));
  updateProgress();
}
