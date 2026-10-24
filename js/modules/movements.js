/**
 * js/modules/movements.js
 * Design Movements Cheat Sheet — 9 cards with search + filter
 */
const MOVEMENTS = [
  {
    name: 'Swiss / International Typographic Style', era: '1950-an – 1970-an', category: 'modern', badge: 'Modern',
    colors: ['#e30613','#000000','#ffffff','#f5f5f5'], colorLabels: ['Red','Black','White','Off-white'],
    traits: ['Grid ketat dan matematis','Tipografi sans-serif (Helvetica)','Foto hitam-putih halftone','Asimetri yang teratur','Fungsionalitas di atas dekorasi'],
    fonts: 'Helvetica, Akzidenz-Grotesk, Univers', colorNote: 'Merah murni, hitam, putih'
  },
  {
    name: 'Bauhaus', era: '1919 – 1933', category: 'retro', badge: 'Retro',
    colors: ['#e63b2e','#f5c518','#1a5fb4','#ffffff'], colorLabels: ['Red','Yellow','Blue','White'],
    traits: ['Bentuk geometris primer','Warna primer murni','Form follows function','Tipografi bold & ekspresif','Harmoni seni & industri'],
    fonts: 'Futura, Universal, Renner', colorNote: 'Merah, kuning, biru primer'
  },
  {
    name: 'Brutalism', era: '2010-an – kini', category: 'contemporary', badge: 'Kontemporer',
    colors: ['#000000','#ffffff','#ff0000','#0000ff'], colorLabels: ['Black','White','Red','Blue'],
    traits: ['Elemen UI mentah & terbuka','Border tebal dan bayangan kotak','Tipografi oversized berani','Anti-estetika konvensional','Struktur terekspos'],
    fonts: 'Arial Black, Times New Roman, Courier', colorNote: 'Hitam-putih + aksen neon'
  },
  {
    name: 'Y2K Aesthetic', era: '1998 – 2004 (Revival 2020-an)', category: 'retro', badge: 'Retro',
    colors: ['#c0c0c0','#add8e6','#ff69b4','#9900ff'], colorLabels: ['Silver','Baby Blue','Hot Pink','Purple'],
    traits: ['Tekstur chrome dan plastik','Gradien metalik krom/biru','Motif 3D glossy berkilap','Bubble & gel elements','Futurisme naif era internet awal'],
    fonts: 'Impact, Arial, pixel fonts', colorNote: 'Silver metalik, baby blue, hot pink'
  },
  {
    name: 'Art Nouveau', era: '1890 – 1910', category: 'retro', badge: 'Retro',
    colors: ['#5d7a3e','#c8a96e','#7b4f9e','#d4a017'], colorLabels: ['Sage Green','Golden','Mauve','Amber'],
    traits: ['Garis organik dan melengkung','Motif flora dan fauna','Dekorasi simbolis dan ornamental','Warna earthy dan pastel muted','Seni & kerajinan menyatu'],
    fonts: 'Uncial, Morris Troy, Old Style serif', colorNote: 'Hijau sage, emas, ungu pastel'
  },
  {
    name: 'Flat Design', era: '2013 – kini', category: 'modern', badge: 'Modern',
    colors: ['#3498db','#2ecc71','#e74c3c','#f39c12'], colorLabels: ['Blue','Green','Red','Orange'],
    traits: ['Tanpa gradien dan bayangan','Ikon sederhana 2D','Warna solid cerah','Ruang putih berlimpah','Antarmuka bersih & intuitif'],
    fonts: 'Roboto, Open Sans, Source Sans Pro', colorNote: 'Biru, hijau, merah, oranye flat'
  },
  {
    name: 'Psychedelic', era: '1960-an – 1970-an', category: 'retro', badge: 'Retro',
    colors: ['#ff6ec7','#7fff00','#ff4500','#9400d3'], colorLabels: ['Pink','Chartreuse','Red-Orange','Violet'],
    traits: ['Warna kontras ekstrem dan vibran','Tipografi melengkung dan cair','Ilusi optis dan pola berulang','Motif surealistik','Pengaruh kontra-budaya'],
    fonts: 'Groovy, Cooper Black, hand-lettered', colorNote: 'Neon pink, hijau chartreuse, ungu'
  },
  {
    name: 'Minimalism', era: '1960-an – kini', category: 'contemporary', badge: 'Kontemporer',
    colors: ['#ffffff','#f5f5f5','#1a1a1a','#888888'], colorLabels: ['White','Off-white','Near Black','Gray'],
    traits: ['Ruang negatif dominan','Tipografi tipis dan elegan','Palet warna sangat terbatas','"Less is more"','Setiap elemen punya fungsi'],
    fonts: 'Garamond, Didot, Gill Sans (thin)', colorNote: 'Hitam, putih, abu — monokromatik'
  },
  {
    name: 'Memphis Style', era: '1980 – 1988 (Revival 2010-an)', category: 'retro', badge: 'Retro',
    colors: ['#ff4500','#ffd700','#1e90ff','#ff69b4'], colorLabels: ['Red-Orange','Yellow','Blue','Pink'],
    traits: ['Bentuk geometris acak dan playful','Pola berulang berani','Warna cerah saling bertabrakan','Anti-fungsionalis','Zigzag, polkadot, garis tebal'],
    fonts: 'Futura Bold, geometric sans display', colorNote: 'Merah-oranye, kuning, biru, pink'
  }
];

const catColors = {
  modern: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  retro: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  contemporary: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
};

function renderCards(filter = 'all', search = '') {
  const grid = document.getElementById('movementsGrid');
  const list = MOVEMENTS.filter(m =>
    (filter === 'all' || m.category === filter) &&
    (!search || m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.traits.some(t => t.toLowerCase().includes(search.toLowerCase())))
  );

  if (!list.length) {
    grid.innerHTML = `<p class="text-gray-400 text-sm col-span-3 py-10 text-center">Tidak ada hasil ditemukan.</p>`;
    return;
  }

  grid.innerHTML = list.map(m => `
    <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
      <div class="flex items-start justify-between mb-3">
        <div><h3 class="font-display font-bold text-base leading-snug">${m.name}</h3>
          <p class="text-xs text-gray-400 mt-0.5">${m.era}</p></div>
        <span class="text-xs px-2 py-0.5 rounded-full ${catColors[m.category]} font-medium whitespace-nowrap ml-2">${m.badge}</span>
      </div>
      <div class="flex gap-1.5 mb-3 items-center">
        ${m.colors.map((c,i) => `<div class="cursor-crosshair w-7 h-7 rounded-md border border-black/10 flex-shrink-0 hover:scale-110 transition-transform" style="background:${c}" title="${m.colorLabels[i]}: ${c}"></div>`).join('')}
        <p class="text-xs text-gray-400 ml-1 leading-snug">${m.colorNote}</p>
      </div>
      <ul class="space-y-1 mb-3">${m.traits.map(t=>`<li class="text-xs text-gray-600 dark:text-gray-300 flex gap-1.5"><span class="text-indigo-400 mt-0.5 flex-shrink-0">›</span>${t}</li>`).join('')}</ul>
      <div class="border-t border-gray-100 dark:border-gray-800 pt-2.5">
        <p class="text-xs text-gray-400"><span class="font-medium text-gray-500 dark:text-gray-400">Tipografi:</span> ${m.fonts}</p>
      </div>
    </div>`).join('');
}

export function initMovements() {
  document.getElementById('movementSearch').addEventListener('input', e => {
    const f = document.querySelector('.filter-btn.active')?.dataset.filter ?? 'all';
    renderCards(f, e.target.value);
  });
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(btn.dataset.filter, document.getElementById('movementSearch').value);
    });
  });
  renderCards();
}
