/**
 * js/modules/mockup.js
 * Interactive CSS/SVG Mockup Generator
 * Renders poster frame, smartphone, tote bag, and packaging box previews
 */
export function initMockup() {
  const fileInput  = document.getElementById('mockupFileInput');
  const dropzone   = document.getElementById('mockupDropzone');
  const typeBtns   = document.querySelectorAll('.mockup-type-btn');
  const stage      = document.getElementById('mockupStage');
  const bgColorEl  = document.getElementById('mockupBgColor');

  let currentImage = null;
  let currentType  = 'poster';

  function loadImage(file) {
    if (!file?.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => {
      currentImage = e.target.result;
      render();
    };
    reader.readAsDataURL(file);
  }

  function render() {
    const bg = bgColorEl?.value ?? '#f0f0f0';
    if (!currentImage) {
      stage.innerHTML = `<p class="text-sm text-gray-400 text-center">Upload gambar desainmu untuk melihat mockup</p>`;
      return;
    }
    const renderers = { poster, smartphone, totebag, box };
    stage.innerHTML = (renderers[currentType] ?? poster)(currentImage, bg);
  }

  function poster(img) {
    return `
      <div style="position:relative;width:240px;margin:auto;">
        <div style="background:#e8e0d0;border-radius:4px;padding:12px;box-shadow:0 20px 60px rgba(0,0,0,.35),0 8px 20px rgba(0,0,0,.2);">
          <img src="${img}" style="width:100%;display:block;border-radius:2px;" alt="mockup"/>
        </div>
        <div style="background:#d4cfc5;height:8px;width:80%;margin:0 auto;border-radius:0 0 4px 4px;box-shadow:0 4px 8px rgba(0,0,0,.15)"></div>
        <div style="background:#bbb;height:4px;width:60%;margin:0 auto;border-radius:0 0 4px 4px;"></div>
      </div>`;
  }

  function smartphone(img) {
    return `
      <div style="position:relative;width:180px;margin:auto;">
        <div style="background:#1a1a1a;border-radius:28px;padding:12px 8px;box-shadow:0 24px 64px rgba(0,0,0,.5);position:relative;">
          <div style="background:#111;border-radius:20px;overflow:hidden;position:relative;">
            <div style="position:absolute;top:8px;left:50%;transform:translateX(-50%);width:60px;height:6px;background:#1a1a1a;border-radius:4px;z-index:2;"></div>
            <img src="${img}" style="width:100%;display:block;aspect-ratio:9/19.5;object-fit:cover;" alt="mockup"/>
          </div>
        </div>
        <div style="width:40px;height:4px;background:#333;border-radius:4px;margin:6px auto 0;"></div>
      </div>`;
  }

  function totebag(img) {
    return `
      <svg width="220" height="260" viewBox="0 0 220 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin:auto;display:block;">
        <!-- handles -->
        <path d="M75 55 Q75 20 95 18 Q110 16 125 18 Q145 20 145 55" stroke="#8B6914" stroke-width="6" fill="none" stroke-linecap="round"/>
        <!-- bag body -->
        <rect x="40" y="55" width="140" height="165" rx="8" fill="#e8d5a3" stroke="#c9b67a" stroke-width="2"/>
        <!-- design area -->
        <image href="${img}" x="60" y="80" width="100" height="100" preserveAspectRatio="xMidYMid meet" clip-path="url(#bagClip)"/>
        <defs><clipPath id="bagClip"><rect x="60" y="80" width="100" height="100" rx="4"/></clipPath></defs>
        <!-- stitch lines -->
        <rect x="46" y="61" width="128" height="153" rx="6" fill="none" stroke="#c9b67a" stroke-width="1" stroke-dasharray="4,3" opacity="0.6"/>
        <!-- shadow bottom -->
        <ellipse cx="110" cy="225" rx="60" ry="8" fill="rgba(0,0,0,.1)"/>
      </svg>`;
  }

  function box(img) {
    return `
      <svg width="260" height="220" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin:auto;display:block;">
        <!-- front face -->
        <polygon points="20,80 140,80 140,200 20,200" fill="#d4e4f7" stroke="#a0bcd8" stroke-width="1.5"/>
        <image href="${img}" x="28" y="88" width="104" height="104" preserveAspectRatio="xMidYMid meet" clip-path="url(#boxFront)"/>
        <defs><clipPath id="boxFront"><rect x="28" y="88" width="104" height="104"/></clipPath></defs>
        <!-- top face -->
        <polygon points="20,80 80,30 200,30 140,80" fill="#b8ceea" stroke="#a0bcd8" stroke-width="1.5"/>
        <!-- right face -->
        <polygon points="140,80 200,30 200,150 140,200" fill="#a0b8d4" stroke="#8aaac4" stroke-width="1.5"/>
        <!-- edges -->
        <line x1="140" y1="80" x2="140" y2="200" stroke="#8aaac4" stroke-width="1"/>
        <line x1="20" y1="80" x2="80" y2="30" stroke="#8aaac4" stroke-width="1"/>
        <line x1="140" y1="80" x2="80" y2="30" stroke="#8aaac4" stroke-width="1"/>
        <!-- shadow -->
        <ellipse cx="110" cy="210" rx="90" ry="10" fill="rgba(0,0,0,.1)"/>
      </svg>`;
  }

  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('border-indigo-500'); });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('border-indigo-500'));
  dropzone.addEventListener('drop', e => { e.preventDefault(); dropzone.classList.remove('border-indigo-500'); loadImage(e.dataTransfer.files[0]); });
  fileInput.addEventListener('change', e => loadImage(e.target.files[0]));
  bgColorEl?.addEventListener('input', render);

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active','border-indigo-500','bg-indigo-50','text-indigo-700'));
      btn.classList.add('active','border-indigo-500','bg-indigo-50','text-indigo-700');
      currentType = btn.dataset.type;
      render();
    });
  });

  render();
}
