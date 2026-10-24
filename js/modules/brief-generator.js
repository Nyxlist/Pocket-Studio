/**
 * js/modules/brief-generator.js
 * Design Brief Generator & Randomizer
 * Generates random fictional design briefs with difficulty levels
 */

const DATA = {
  clients: ['Koperasi Petani Muda Jawa Tengah','Studio Rekaman Indie Lokal','Start-up Fintech Pelajar','Rumah Makan Padang Premium','Yayasan Lingkungan Hidup','Event Organizer Festival Seni','Brand Fashion Streetwear Lokal','Klinik Gigi Modern','Toko Buku & Café','NGO Literasi Digital','Perusahaan Logistik UMKM','Museum Sejarah Kota'],
  industries: ['F&B / Kuliner','Fashion & Apparel','Teknologi & Startup','Kesehatan & Wellness','Seni & Budaya','Lingkungan & Sosial','Pendidikan','Keuangan & Fintech','Hiburan & Musik','Pariwisata & Hospitality'],
  audiences: ['Remaja 16–24 tahun, urban, tech-savvy','Profesional muda 25–35 tahun','Ibu rumah tangga 30–45 tahun, middle class','Pelajar SMA/SMK seluruh Indonesia','Pelancong domestik 20–40 tahun','Komunitas seni & kreator konten','Pengusaha UMKM 35–55 tahun','Gen Z yang peduli isu lingkungan'],
  deliverables: {
    easy:   ['Logo (1 konsep)','Kartu nama','Poster A3 (1 halaman)'],
    medium: ['Logo (3 konsep)','Brand guideline dasar (5 halaman)','Poster seri (3 varian)','Konten media sosial (Feed + Story)'],
    hard:   ['Brand identity sistem lengkap','Packaging primer & sekunder','Annual report 24 halaman','Campaign visual multi-platform','Mockup presentasi klien'],
  },
  constraints: ['Warna maksimal 2 warna spot','Hanya tipografi bebas komersial','Tidak menggunakan foto — ilustrasi vektor saja','Harus dapat dicetak hitam-putih','File akhir dalam format PDF/X-1a','Ukuran file output maksimal 10MB'],
  vibes: ['Minimalis & modern','Bold & berani','Hangat & organik','Tech & futuristik','Retro & nostalgia','Playful & colorful','Luxury & premium','Sustainable & earthy'],
};

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN(arr, n) {
  const shuffled = [...arr].sort(() => .5 - Math.random());
  return shuffled.slice(0, n);
}
function randomDays(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export function initBriefGenerator() {
  const btn = document.getElementById('generateBriefBtn');
  const out = document.getElementById('briefOutput');
  const diff = document.getElementById('briefDifficulty');

  function generate() {
    const level = diff?.value ?? 'medium';
    const days  = level === 'easy' ? randomDays(3,7) : level === 'medium' ? randomDays(7,14) : randomDays(14,30);
    const client      = pick(DATA.clients);
    const industry    = pick(DATA.industries);
    const audience    = pick(DATA.audiences);
    const delivs      = pickN(DATA.deliverables[level], level === 'easy' ? 2 : level === 'medium' ? 3 : 4);
    const constraints = pickN(DATA.constraints, 2);
    const vibe        = pick(DATA.vibes);
    const deadline    = new Date(Date.now() + days*24*3600*1000).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});

    const diffBadge = level === 'easy'
      ? '<span class="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">⭐ Easy</span>'
      : level === 'medium'
        ? '<span class="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold">⭐⭐ Medium</span>'
        : '<span class="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold">⭐⭐⭐ Hard</span>';

    out.classList.remove('hidden');
    out.innerHTML = `
      <div class="border-l-4 border-indigo-500 dark:border-indigo-400 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="font-display font-bold text-lg">${client}</h3>
            <p class="text-sm text-gray-400 mt-0.5">${industry}</p>
          </div>
          <div class="flex gap-2 items-center">${diffBadge}</div>
        </div>
        <div class="grid sm:grid-cols-2 gap-4 text-sm">
          <div><p class="text-xs font-semibold uppercase text-gray-400 mb-1">Target Audiens</p><p class="text-gray-700 dark:text-gray-300">${audience}</p></div>
          <div><p class="text-xs font-semibold uppercase text-gray-400 mb-1">Vibe / Feel</p><p class="text-gray-700 dark:text-gray-300 font-medium">${vibe}</p></div>
          <div><p class="text-xs font-semibold uppercase text-gray-400 mb-1">Deadline</p><p class="text-gray-700 dark:text-gray-300">${deadline} <span class="text-gray-400">(${days} hari)</span></p></div>
          <div><p class="text-xs font-semibold uppercase text-gray-400 mb-1">Constraints</p><ul class="space-y-0.5">${constraints.map(c=>`<li class="text-gray-700 dark:text-gray-300 flex gap-1"><span class="text-red-400 mt-0.5">!</span>${c}</li>`).join('')}</ul></div>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <p class="text-xs font-semibold uppercase text-gray-400 mb-2">Deliverables yang Diminta</p>
          <ul class="flex flex-wrap gap-2">${delivs.map(d=>`<li class="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 px-2.5 py-1 rounded-full">${d}</li>`).join('')}</ul>
        </div>
      </div>`;
  }

  btn?.addEventListener('click', generate);
}
