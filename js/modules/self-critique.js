/**
 * js/modules/self-critique.js
 * Rubrik Self-Asistensi Dosen
 * Detailed interactive rubric before submitting work
 */
const RUBRIC = [
  {
    category: 'Grid & Komposisi', icon: '⊞',
    items: [
      { id:'r1', label:'Elemen visual mengikuti sistem grid yang konsisten' },
      { id:'r2', label:'Margin dan padding antar elemen proporsional' },
      { id:'r3', label:'Alignment visual terjaga (kiri, tengah, atau kanan konsisten)' },
    ]
  },
  {
    category: 'Hierarki Tipografi', icon: '🔤',
    items: [
      { id:'r4', label:'Perbedaan ukuran H1/H2/Body/Caption jelas dan terasa berjenjang' },
      { id:'r5', label:'Kontras bobot font (bold vs regular) digunakan dengan tujuan' },
      { id:'r6', label:'Legibilitas teks terjaga di semua ukuran yang ditampilkan' },
    ]
  },
  {
    category: 'Warna & Kontras', icon: '🎨',
    items: [
      { id:'r7', label:'Palet warna konsisten (maksimal 3–4 warna utama)' },
      { id:'r8', label:'Kontras teks-background memenuhi standar WCAG AA' },
      { id:'r9', label:'Warna mendukung emosi/pesan yang ingin disampaikan' },
    ]
  },
  {
    category: 'Focal Point & Visual Flow', icon: '👁',
    items: [
      { id:'r10', label:'Ada satu elemen yang menjadi titik perhatian utama' },
      { id:'r11', label:'Mata pembaca terarah secara natural mengikuti urutan konten' },
      { id:'r12', label:'Ruang negatif (whitespace) dimanfaatkan, tidak terasa "penuh sesak"' },
    ]
  },
  {
    category: 'Kerapian File Kerja', icon: '📁',
    items: [
      { id:'r13', label:'Layer/grup diberi nama deskriptif (bukan "Layer 1", "Group 2")' },
      { id:'r14', label:'Aset terhubung/embed dengan benar, tidak ada missing link' },
      { id:'r15', label:'Artboard/canvas bersih dari objek tersembunyi di luar area kerja' },
    ]
  },
  {
    category: 'Kesesuaian Brief', icon: '📋',
    items: [
      { id:'r16', label:'Semua deliverable yang diminta brief sudah terpenuhi' },
      { id:'r17', label:'Solusi visual relevan dengan target audiens yang dituju' },
      { id:'r18', label:'Gaya visual selaras dengan tone dan vibe yang diminta klien' },
    ]
  },
];

const critChecked = new Set();

export function initSelfCritique() {
  const container = document.getElementById('rubricContainer');
  if (!container) return;

  container.innerHTML = RUBRIC.map(cat => `
    <div class="mb-5">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-base">${cat.icon}</span>
        <h4 class="font-semibold text-sm">${cat.category}</h4>
      </div>
      <div class="space-y-2 pl-6">
        ${cat.items.map(item => `
          <div class="crit-item flex items-start gap-3 cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
               id="crit-${item.id}" onclick="window._critToggle('${item.id}')">
            <div class="w-5 h-5 mt-0.5 rounded border-2 border-gray-300 dark:border-gray-600 flex-shrink-0 flex items-center justify-center"
                 id="critbox-${item.id}">
              <svg class="w-3 h-3 text-white hidden" id="crittick-${item.id}" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <p class="text-sm text-gray-700 dark:text-gray-300 select-none">${item.label}</p>
          </div>`).join('')}
      </div>
    </div>`).join('');

  const total = RUBRIC.reduce((s,c) => s + c.items.length, 0);

  function updateCritProgress() {
    const pct = Math.round(critChecked.size / total * 100);
    document.getElementById('critPercent').textContent = pct + '%';
    document.getElementById('critBar').style.width = pct + '%';
    document.getElementById('critScore').textContent = `${critChecked.size} / ${total}`;

    const status = document.getElementById('critStatus');
    if (pct < 50)       { status.textContent = 'Masih banyak yang perlu diperiksa.'; status.className = 'text-xs text-red-500'; }
    else if (pct < 80)  { status.textContent = 'Cukup baik — perhatikan area yang belum dicentang.'; status.className = 'text-xs text-amber-500'; }
    else if (pct < 100) { status.textContent = 'Hampir sempurna! Sedikit lagi.'; status.className = 'text-xs text-blue-500'; }
    else                { status.textContent = '✓ Karya siap dipresentasikan!'; status.className = 'text-xs text-green-600'; }
  }

  window._critToggle = function(id) {
    const box  = document.getElementById('critbox-' + id);
    const tick = document.getElementById('crittick-' + id);
    if (critChecked.has(id)) {
      critChecked.delete(id);
      box.classList.remove('bg-indigo-600','border-indigo-600');
      box.classList.add('border-gray-300');
      tick.classList.add('hidden');
    } else {
      critChecked.add(id);
      box.classList.add('bg-indigo-600','border-indigo-600');
      box.classList.remove('border-gray-300');
      tick.classList.remove('hidden');
    }
    updateCritProgress();
  };

  window.resetCritique = () => { [...critChecked].forEach(id => window._critToggle(id)); };
  updateCritProgress();
}
