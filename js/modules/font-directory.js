/**
 * js/modules/font-directory.js
 * Free Commercial Font & Asset Directory
 * Curated list with license labels
 */
const FONTS = [
  // --- Sans-serif ---
  { name:'Inter', cat:'Sans-serif', license:'open', licenseLabel:'100% Bebas Komersial (OFL)',    source:'Google Fonts', url:'https://fonts.google.com/specimen/Inter', notes:'Sangat populer untuk UI/UX dan digital media.' },
  { name:'DM Sans', cat:'Sans-serif', license:'open', licenseLabel:'100% Bebas Komersial (OFL)', source:'Google Fonts', url:'https://fonts.google.com/specimen/DM+Sans', notes:'Cocok untuk branding modern dan clean.' },
  { name:'Space Grotesk', cat:'Sans-serif', license:'open', licenseLabel:'100% Bebas Komersial (OFL)', source:'Google Fonts', url:'https://fonts.google.com/specimen/Space+Grotesk', notes:'Karakter unik dengan soul geometric.' },
  { name:'Poppins', cat:'Sans-serif', license:'open', licenseLabel:'100% Bebas Komersial (OFL)', source:'Google Fonts', url:'https://fonts.google.com/specimen/Poppins', notes:'Favorit poster dan branding muda.' },
  { name:'Nunito', cat:'Sans-serif', license:'open', licenseLabel:'100% Bebas Komersial (OFL)', source:'Google Fonts', url:'https://fonts.google.com/specimen/Nunito', notes:'Playful, cocok untuk anak-anak dan edukasi.' },
  { name:'Raleway', cat:'Sans-serif', license:'open', licenseLabel:'100% Bebas Komersial (OFL)', source:'Google Fonts', url:'https://fonts.google.com/specimen/Raleway', notes:'Elegant, cocok untuk fashion & luxury.' },
  // --- Serif ---
  { name:'Playfair Display', cat:'Serif', license:'open', licenseLabel:'100% Bebas Komersial (OFL)', source:'Google Fonts', url:'https://fonts.google.com/specimen/Playfair+Display', notes:'Klasik editorial, cocok untuk majalah & branding.' },
  { name:'Merriweather', cat:'Serif', license:'open', licenseLabel:'100% Bebas Komersial (OFL)', source:'Google Fonts', url:'https://fonts.google.com/specimen/Merriweather', notes:'Legible, cocok untuk body text panjang.' },
  { name:'Lora', cat:'Serif', license:'open', licenseLabel:'100% Bebas Komersial (OFL)', source:'Google Fonts', url:'https://fonts.google.com/specimen/Lora', notes:'Transitional serif, hangat dan organik.' },
  { name:'EB Garamond', cat:'Serif', license:'open', licenseLabel:'100% Bebas Komersial (OFL)', source:'Google Fonts', url:'https://fonts.google.com/specimen/EB+Garamond', notes:'Klasik Garamond untuk typografi editorial.' },
  // --- Display ---
  { name:'Bebas Neue', cat:'Display', license:'open', licenseLabel:'100% Bebas Komersial (OFL)', source:'Google Fonts', url:'https://fonts.google.com/specimen/Bebas+Neue', notes:'Condensed caps — kuat untuk poster & headline.' },
  { name:'Oswald', cat:'Display', license:'open', licenseLabel:'100% Bebas Komersial (OFL)', source:'Google Fonts', url:'https://fonts.google.com/specimen/Oswald', notes:'Alternative ke Franklin Gothic, bold display.' },
  { name:'Anton', cat:'Display', license:'open', licenseLabel:'100% Bebas Komersial (OFL)', source:'Google Fonts', url:'https://fonts.google.com/specimen/Anton', notes:'Impact-like, sangat tebal dan impactful.' },
  // --- Monospace ---
  { name:'JetBrains Mono', cat:'Monospace', license:'open', licenseLabel:'100% Bebas Komersial (OFL)', source:'Google Fonts', url:'https://fonts.google.com/specimen/JetBrains+Mono', notes:'Ideal untuk UI tech & coding aesthetic.' },
  { name:'Fira Code', cat:'Monospace', license:'open', licenseLabel:'100% Bebas Komersial (OFL)', source:'GitHub', url:'https://github.com/tonsky/FiraCode', notes:'Ligatures untuk gaya tech/developer.' },
  // --- Attribution required ---
  { name:'Abril Fatface', cat:'Display', license:'attr', licenseLabel:'Atribusi Diperlukan (OFL)', source:'Google Fonts', url:'https://fonts.google.com/specimen/Abril+Fatface', notes:'Bold display — cantumkan kredit desainer.' },
  // --- Non-commercial only ---
  { name:'Gilroy (unofficial)', cat:'Sans-serif', license:'nc', licenseLabel:'⚠ Non-Komersial Saja', source:'Radomir Tinkov', url:'#', notes:'Versi bebas hanya untuk tugas non-komersial — beli lisensi untuk pameran/TA.' },
];

const ASSETS = [
  { name:'Undraw.co', type:'Ilustrasi SVG', license:'open', licenseLabel:'Bebas Komersial (MIT)', url:'https://undraw.co', notes:'Ilustrasi flat vector ribuan tema, customizable warna.' },
  { name:'Lucide Icons', type:'Ikon SVG', license:'open', licenseLabel:'Bebas Komersial (ISC)', url:'https://lucide.dev', notes:'1000+ ikon konsisten, format SVG/React/PNG.' },
  { name:'Heroicons', type:'Ikon SVG', license:'open', licenseLabel:'Bebas Komersial (MIT)', url:'https://heroicons.com', notes:'Outline & solid, dibuat oleh tim Tailwind CSS.' },
  { name:'Storyset', type:'Ilustrasi', license:'attr', licenseLabel:'Atribusi (Freepik)', url:'https://storyset.com', notes:'Ilustrasi animatable, cantumkan "Freepik" di karya.' },
  { name:'Pexels', type:'Foto', license:'open', licenseLabel:'Bebas Komersial (Pexels License)', url:'https://pexels.com', notes:'Foto kualitas tinggi, bebas tanpa atribusi.' },
  { name:'Unsplash', type:'Foto', license:'open', licenseLabel:'Bebas Komersial (Unsplash License)', url:'https://unsplash.com', notes:'Komunitas fotografer, bebas untuk komersial.' },
  { name:'Freepik (berbayar)', type:'Vector/PSD', license:'nc', licenseLabel:'⚠ Atribusi atau Langganan', source:'Freepik', url:'https://freepik.com', notes:'Gratis dengan atribusi — berbayar untuk pameran/TA.' },
  { name:'Font Awesome (Free)', type:'Ikon', license:'open', licenseLabel:'Bebas (CC BY 4.0)', url:'https://fontawesome.com', notes:'Ikon bebas, cukup include kredit kecil.' },
];

const licColors = { open:'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', attr:'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300', nc:'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' };

export function initFontDirectory() {
  const search   = document.getElementById('fdSearch');
  const filterEl = document.getElementById('fdLicFilter');
  const grid     = document.getElementById('fdGrid');
  const aGrid    = document.getElementById('fdAssetGrid');

  function renderFonts() {
    const q   = search?.value.toLowerCase() ?? '';
    const lic = filterEl?.value ?? 'all';
    const list = FONTS.filter(f =>
      (lic === 'all' || f.license === lic) &&
      (!q || f.name.toLowerCase().includes(q) || f.cat.toLowerCase().includes(q))
    );
    grid.innerHTML = list.map(f => `
      <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
        <div class="flex items-start justify-between mb-2">
          <div><p class="font-semibold text-sm">${f.name}</p><p class="text-xs text-gray-400">${f.cat} · ${f.source}</p></div>
          <span class="text-xs px-2 py-0.5 rounded-full ${licColors[f.license]} font-medium whitespace-nowrap ml-2">${f.licenseLabel}</span>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">${f.notes}</p>
        <a href="${f.url}" target="_blank" rel="noopener" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">→ Unduh Font</a>
      </div>`).join('');
  }

  // Assets
  aGrid.innerHTML = ASSETS.map(a => `
    <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <div class="flex items-start justify-between mb-2">
        <div><p class="font-semibold text-sm">${a.name}</p><p class="text-xs text-gray-400">${a.type}</p></div>
        <span class="text-xs px-2 py-0.5 rounded-full ${licColors[a.license]} font-medium whitespace-nowrap ml-2">${a.licenseLabel}</span>
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">${a.notes}</p>
      <a href="${a.url}" target="_blank" rel="noopener" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">→ Kunjungi Situs</a>
    </div>`).join('');

  search?.addEventListener('input', renderFonts);
  filterEl?.addEventListener('change', renderFonts);
  renderFonts();
}
