// Image Editor Script
const dropArea = document.getElementById('drop-area');
const image = document.getElementById('image');
const download = document.getElementById('download');
const grayscale = document.getElementById('grayscale');
const sepia = document.getElementById('sepia');
const brightness = document.getElementById('brightness');
const contrast = document.getElementById('contrast');
const blur = document.getElementById('blur');
const dropMessage = document.getElementById('drop-message');

function updateFilters() {
    const filter = `grayscale(${grayscale.value}%) sepia(${sepia.value}%) brightness(${brightness.value}%) contrast(${contrast.value}%) blur(${blur.value}px)`;
    image.style.filter = filter;
}

grayscale.addEventListener('input', updateFilters);
sepia.addEventListener('input', updateFilters);
brightness.addEventListener('input', updateFilters);
contrast.addEventListener('input', updateFilters);
blur.addEventListener('input', updateFilters);

function handleFile(file) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        image.src = evt.target.result;
        image.classList.remove('hidden-image');
        dropMessage.style.display = 'none';
        download.disabled = false;
        updateFilters();
    };
    reader.readAsDataURL(file);
}

dropArea.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };
    input.click();
});

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('dragover');
});
dropArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropArea.classList.remove('dragover');
});
dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
    }
});

download.addEventListener('click', function() {
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.filter = `grayscale(${grayscale.value}%) sepia(${sepia.value}%) brightness(${brightness.value}%) contrast(${contrast.value}%) blur(${blur.value}px)`;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
