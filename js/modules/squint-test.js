/**
 * js/modules/squint-test.js
 * Squint Test / Blur Filter Mode
 * Applies a blur + brightness filter to a pasted/uploaded image to simulate unfocused view
 */
export function initSquintTest() {
  const dropzone  = document.getElementById('squintDropzone');
  const fileInput = document.getElementById('squintFileInput');
  const preview   = document.getElementById('squintPreview');
  const toggleBtn = document.getElementById('squintToggleBtn');
  const slider    = document.getElementById('squintBlurSlider');
  const sliderVal = document.getElementById('squintBlurVal');
  let isBlurred   = false;

  function loadImage(file) {
    if (!file?.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    preview.src = url;
    preview.classList.remove('hidden');
    document.getElementById('squintPlaceholder').classList.add('hidden');
    document.getElementById('squintControls').classList.remove('hidden');
    isBlurred = false;
    preview.classList.remove('squint-active');
    preview.classList.add('squint-off');
    toggleBtn.textContent = '🫣 Aktifkan Squint Test';
    toggleBtn.classList.remove('bg-indigo-600','text-white');
    toggleBtn.classList.add('bg-gray-100','dark:bg-gray-800','text-gray-700','dark:text-gray-300');
  }

  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('border-indigo-500'); });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('border-indigo-500'));
  dropzone.addEventListener('drop', e => { e.preventDefault(); dropzone.classList.remove('border-indigo-500'); loadImage(e.dataTransfer.files[0]); });
  fileInput.addEventListener('change', e => loadImage(e.target.files[0]));

  // Paste from clipboard
  document.addEventListener('paste', e => {
    const file = Array.from(e.clipboardData?.items || []).find(i => i.type.startsWith('image/'))?.getAsFile();
    if (file) loadImage(file);
  });

  toggleBtn.addEventListener('click', () => {
    isBlurred = !isBlurred;
    const blurPx = slider.value;
    if (isBlurred) {
      preview.style.filter = `blur(${blurPx}px) brightness(0.97)`;
      toggleBtn.textContent = '👁 Tampilkan Normal';
      toggleBtn.classList.add('bg-indigo-600','text-white');
      toggleBtn.classList.remove('bg-gray-100','dark:bg-gray-800','text-gray-700','dark:text-gray-300');
    } else {
      preview.style.filter = 'none';
      toggleBtn.textContent = '🫣 Aktifkan Squint Test';
      toggleBtn.classList.remove('bg-indigo-600','text-white');
      toggleBtn.classList.add('bg-gray-100','dark:bg-gray-800','text-gray-700','dark:text-gray-300');
    }
  });

  slider.addEventListener('input', () => {
    sliderVal.textContent = slider.value + 'px';
    if (isBlurred) preview.style.filter = `blur(${slider.value}px) brightness(0.97)`;
  });
}
