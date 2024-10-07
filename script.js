const colorPickerContainer = document.getElementById('colorPickerContainer');
const addColorBtn = document.getElementById('addColorBtn');
const combineBtn = document.getElementById('combineBtn');
const combinedColorDiv = document.getElementById('combinedColor');

// Fungsi untuk menambahkan color picker baru
addColorBtn.addEventListener('click', function() {
    const colorPickers = document.querySelectorAll('.color-picker');
    const newIndex = colorPickers.length + 1;

    // Buat elemen HTML untuk color picker baru
    const newColorPicker = document.createElement('div');
    newColorPicker.classList.add('color-picker');
    newColorPicker.innerHTML = `
        <label for="color${newIndex}">Warna ${newIndex}:</label>
        <input type="color" class="color-input" value="#000000">
    `;
    
    // Tambahkan color picker ke dalam container
    colorPickerContainer.appendChild(newColorPicker);
});

// Fungsi untuk menggabungkan beberapa warna
function combineMultipleColors(colors) {
    let totalR = 0, totalG = 0, totalB = 0;

    // Loop melalui setiap warna dan konversi ke RGB
    colors.forEach(color => {
        const rgb = hexToRgb(color);
        totalR += rgb.r;
        totalG += rgb.g;
        totalB += rgb.b;
    });

    // Hitung rata-rata RGB
    const combinedR = Math.floor(totalR / colors.length);
    const combinedG = Math.floor(totalG / colors.length);
    const combinedB = Math.floor(totalB / colors.length);

    // Kembalikan hasil warna kombinasi dalam format hex
    return rgbToHex(combinedR, combinedG, combinedB);
}

// Fungsi untuk mengubah warna Hex ke RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

// Fungsi untuk mengubah warna RGB ke Hex
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Ketika tombol 'Gabungkan Warna' diklik
combineBtn.addEventListener('click', function() {
    // Ambil semua warna dari input color
    const colorInputs = document.querySelectorAll('.color-input');
    const colors = Array.from(colorInputs).map(input => input.value);

    // Gabungkan semua warna
    const combinedColor = combineMultipleColors(colors);

    // Tampilkan warna hasil kombinasi
    combinedColorDiv.style.backgroundColor = combinedColor;
});

