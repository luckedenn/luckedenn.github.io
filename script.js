// Script untuk Mobile Menu
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Script untuk Animasi Canvas
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Fungsi untuk mengatur ukuran canvas agar sesuai dengan jendela
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();

// Kelas untuk membuat objek partikel
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = 'rgba(192, 132, 252, 0.8)'; // Warna ungu (purple-400)
    }
    // Metode untuk memperbarui posisi partikel
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mengurangi ukuran partikel secara perlahan
        if (this.size > 0.2) this.size -= 0.02;
        // Jika partikel terlalu kecil, reset posisinya
        if (this.size <= 0.2) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
        }
    }
    // Metode untuk menggambar partikel di canvas
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Fungsi untuk menginisialisasi partikel
function init() {
    particlesArray = [];
    // Menentukan jumlah partikel berdasarkan ukuran layar
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}
init();

// Fungsi untuk loop animasi
function animate() {
    // Membersihkan canvas sebelum menggambar frame baru
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Memperbarui dan menggambar setiap partikel
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    // Meminta frame animasi berikutnya
    requestAnimationFrame(animate);
}
animate();

// Event listener untuk menangani perubahan ukuran jendela
window.addEventListener('resize', () => {
    setCanvasSize();
    init();
});
