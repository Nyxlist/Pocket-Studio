/**
 * js/modules/references.js
 * Referensi Desain — kurasi link website eksternal untuk mahasiswa DKV
 */

const REFS = [
  // ── Inspirasi & Kurasi ──────────────────────────────────────
  { name: 'Behance',          emoji: '🎨', url: 'https://behance.net',          cat: 'inspirasi',  catLabel: 'Inspirasi',  desc: 'Portofolio & karya desainer dari seluruh dunia — terbesar dan terlengkap.', tag: 'Portofolio', tagClr: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { name: 'Dribbble',         emoji: '🏀', url: 'https://dribbble.com',         cat: 'inspirasi',  catLabel: 'Inspirasi',  desc: 'Shot-shot desain UI, branding, dan ilustrasi berkualitas tinggi.', tag: 'UI/UX', tagClr: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' },
  { name: 'Pinterest',        emoji: '📌', url: 'https://pinterest.com',        cat: 'inspirasi',  catLabel: 'Inspirasi',  desc: 'Moodboard visual tak terbatas — sempurna untuk referensi warna dan gaya.', tag: 'Moodboard', tagClr: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
  { name: 'Awwwards',         emoji: '🏆', url: 'https://awwwards.com',         cat: 'inspirasi',  catLabel: 'Inspirasi',  desc: 'Kurasi website terbaik dunia. Belajar dari desain web yang memenangkan award.', tag: 'Web Design', tagClr: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' },
  { name: 'Muzli',            emoji: '🧠', url: 'https://muz.li',              cat: 'inspirasi',  catLabel: 'Inspirasi',  desc: 'Agregator inspirasi desain harian — UI, tipografi, ilustrasi terkini.', tag: 'Agregator', tagClr: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  { name: 'Mobbin',           emoji: '📱', url: 'https://mobbin.com',           cat: 'inspirasi',  catLabel: 'Inspirasi',  desc: 'Referensi UI pattern dari aplikasi nyata — iOS, Android, dan web.', tag: 'Mobile UI', tagClr: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },

  // ── Tipografi ───────────────────────────────────────────────
  { name: 'Google Fonts',     emoji: '🔡', url: 'https://fonts.google.com',     cat: 'tipografi',  catLabel: 'Tipografi',  desc: 'Ribuan font bebas komersial. Gunakan untuk semua proyek desain dan web.', tag: 'Gratis', tagClr: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  { name: 'Font Squirrel',    emoji: '🐿️', url: 'https://fontsquirrel.com',     cat: 'tipografi',  catLabel: 'Tipografi',  desc: 'Kurasi font 100% bebas komersial yang sudah diverifikasi lisensinya.', tag: 'Komersial', tagClr: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  { name: 'Typescale',        emoji: '📐', url: 'https://typescale.com',        cat: 'tipografi',  catLabel: 'Tipografi',  desc: 'Kalkulator skala tipografi online — lihat preview real-time rasio heading.', tag: 'Tool', tagClr: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { name: 'Font Pair',        emoji: '💑', url: 'https://fontpair.co',          cat: 'tipografi',  catLabel: 'Tipografi',  desc: 'Kurasi kombinasi font Google Fonts yang harmonis untuk heading & body.', tag: 'Pairing', tagClr: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  { name: 'Fonts In Use',     emoji: '🔍', url: 'https://fontsinuse.com',       cat: 'tipografi',  catLabel: 'Tipografi',  desc: 'Arsip penggunaan tipografi nyata di poster, majalah, kemasan, dan media cetak.', tag: 'Arsip', tagClr: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },

  // ── Warna ───────────────────────────────────────────────────
  { name: 'Coolors',          emoji: '🌈', url: 'https://coolors.co',           cat: 'warna',      catLabel: 'Warna',      desc: 'Generator palet warna paling populer. Generate, eksplorasi, dan simpan palet.', tag: 'Generator', tagClr: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  { name: 'Adobe Color',      emoji: '🎨', url: 'https://color.adobe.com',      cat: 'warna',      catLabel: 'Warna',      desc: 'Wheel warna, harmony rules, dan tren palet dari komunitas Adobe.', tag: 'Adobe', tagClr: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
  { name: 'Paletton',         emoji: '🔵', url: 'https://paletton.com',         cat: 'warna',      catLabel: 'Warna',      desc: 'Tool klasik untuk membangun palet harmonis — analog, komplementer, triadic.', tag: 'Harmony', tagClr: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { name: 'Realtime Colors',  emoji: '⚡', url: 'https://realtimecolors.com',   cat: 'warna',      catLabel: 'Warna',      desc: 'Preview warna di UI nyata secara real-time. Ideal untuk cek apakah palet cocok dipakai.', tag: 'Preview', tagClr: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },

  // ── Aset Gratis ─────────────────────────────────────────────
  { name: 'Unsplash',         emoji: '📷', url: 'https://unsplash.com',         cat: 'aset',       catLabel: 'Aset Gratis',desc: 'Foto resolusi tinggi bebas komersial dari fotografer seluruh dunia.', tag: 'Foto', tagClr: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
  { name: 'Undraw',           emoji: '🖼️', url: 'https://undraw.co',            cat: 'aset',       catLabel: 'Aset Gratis',desc: 'Ilustrasi SVG flat gratis, warna dapat dikustomisasi sesuai brand.', tag: 'Ilustrasi', tagClr: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
  { name: 'Phosphor Icons',   emoji: '⚛️', url: 'https://phosphoricons.com',    cat: 'aset',       catLabel: 'Aset Gratis',desc: '1400+ ikon SVG konsisten, 6 varian style, bebas komersial (MIT).', tag: 'Ikon', tagClr: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' },
  { name: 'Storyset',         emoji: '📖', url: 'https://storyset.com',         cat: 'aset',       catLabel: 'Aset Gratis',desc: 'Ilustrasi editable dan animatable — catumkan kredit Freepik.', tag: 'Ilustrasi', tagClr: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' },

  // ── Belajar Desain ──────────────────────────────────────────
  { name: 'Canva Design School',emoji: '🏫', url: 'https://www.canva.com/learn/', cat: 'belajar',  catLabel: 'Belajar',    desc: 'Artikel dan tutorial desain gratis dari dasar — komposisi, tipografi, warna.', tag: 'Artikel', tagClr: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' },
  { name: 'Designspiration',  emoji: '💡', url: 'https://www.designspiration.com', cat: 'belajar', catLabel: 'Belajar',    desc: 'Koleksi inspirasi desain grafis — branding, packaging, editorial, poster.', tag: 'Kurasi', tagClr: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' },
  { name: 'Smashing Magazine', emoji: '📰', url: 'https://smashingmagazine.com', cat: 'belajar',  catLabel: 'Belajar',    desc: 'Artikel mendalam tentang UX, tipografi, aksesibilitas, dan front-end design.', tag: 'Artikel', tagClr: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' },
  { name: 'Design Systems',   emoji: '🧩', url: 'https://designsystems.surf',   cat: 'belajar',  catLabel: 'Belajar',    desc: 'Kurasi design system dari perusahaan besar — IBM, Atlassian, Google, dll.', tag: 'Referensi', tagClr: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },

  // ── Tools Online ────────────────────────────────────────────
  { name: 'Figma (Free)',     emoji: '✏️', url: 'https://figma.com',            cat: 'tools',      catLabel: 'Tools',      desc: 'Alat desain UI/UX berbasis browser — gratis untuk pelajar dan proyek pribadi.', tag: 'Design Tool', tagClr: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { name: 'Remove.bg',        emoji: '✂️', url: 'https://remove.bg',            cat: 'tools',      catLabel: 'Tools',      desc: 'Hapus background foto secara otomatis menggunakan AI — gratis.', tag: 'AI Tool', tagClr: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { name: 'Squoosh',          emoji: '🗜️', url: 'https://squoosh.app',          cat: 'tools',      catLabel: 'Tools',      desc: 'Kompres gambar tanpa kehilangan kualitas signifikan — langsung di browser.', tag: 'Optimasi', tagClr: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' },
  { name: 'Shots.so',         emoji: '🎯', url: 'https://shots.so',             cat: 'tools',      catLabel: 'Tools',      desc: 'Buat mockup screenshot produk keren untuk portofolio dan presentasi.', tag: 'Mockup', tagClr: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' },
];

const CATS = [
  { id: 'all',      label: 'Semua' },
  { id: 'inspirasi',label: '🎨 Inspirasi' },
  { id: 'tipografi',label: '🔡 Tipografi' },
  { id: 'warna',    label: '🌈 Warna' },
  { id: 'aset',     label: '🖼️ Aset' },
  { id: 'belajar',  label: '📚 Belajar' },
  { id: 'tools',    label: '⚒️ Tools' },
];

export function initReferences() {
  const grid       = document.getElementById('refGrid');
  const searchEl   = document.getElementById('refSearch');
  const filterBtns = document.getElementById('refFilterBtns');

  if (!grid || !filterBtns) return;

  // Build filter buttons
  filterBtns.innerHTML = CATS.map(c =>
    `<button class="ref-filter-btn text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors
      ${c.id === 'all' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300'}"
      data-cat="${c.id}">${c.label}</button>`
  ).join('');

  filterBtns.querySelectorAll('.ref-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.querySelectorAll('.ref-filter-btn').forEach(b => {
        b.className = b.className.replace('border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300', '');
        b.classList.add('border-gray-200','dark:border-gray-700','text-gray-500','dark:text-gray-400');
      });
      btn.classList.remove('border-gray-200','text-gray-500');
      btn.classList.add('border-indigo-500','bg-indigo-50','text-indigo-700');
      render(btn.dataset.cat, searchEl.value);
    });
  });

  searchEl.addEventListener('input', () => {
    const active = filterBtns.querySelector('.ref-filter-btn.border-indigo-500')?.dataset.cat ?? 'all';
    render(active, searchEl.value);
  });

  function render(cat, q) {
    const list = REFS.filter(r =>
      (cat === 'all' || r.cat === cat) &&
      (!q || r.name.toLowerCase().includes(q.toLowerCase()) || r.desc.toLowerCase().includes(q.toLowerCase()))
    );

    if (!list.length) {
      grid.innerHTML = `<p class="text-sm text-gray-400 col-span-full py-8 text-center">Tidak ada referensi ditemukan.</p>`;
      return;
    }

    grid.innerHTML = list.map(r => `
      <a href="${r.url}" target="_blank" rel="noopener noreferrer"
        class="group flex items-center gap-3 p-3 pr-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl no-underline transition-all duration-150 hover:shadow-md hover:-translate-y-px hover:border-indigo-400 dark:hover:border-indigo-500">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0 bg-gray-100 dark:bg-gray-800">${r.emoji}</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <p class="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">${r.name}</p>
            <span class="inline-block text-[10px] font-semibold px-1.5 py-px rounded-full tracking-wide flex-shrink-0 ${r.tagClr}">${r.tag}</span>
          </div>
          <p class="text-xs text-gray-400 dark:text-gray-500 leading-snug line-clamp-2">${r.desc}</p>
        </div>
        <svg class="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-indigo-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
      </a>`).join('');
  }

  render('all', '');
}
