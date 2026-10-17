// ============ GENERATE 22 FOTO GALLERY ============
const galleryGrid = document.getElementById('galleryGrid');
const photoTitles = [
    "Momen Kebersamaan", "Tawa Ceria", "Belajar Bersama", "Istirahat Santai",
    "Upacara Bendera", "Kerja Kelompok", "Pesta Kelas", "Study Tour",
    "Foto Bareng Guru", "Olahraga Bersama", "Pentas Seni", "Piknik Kelas",
    "Lomba Kelas", "Wisuda Mini", "Perpisahan", "Kebersamaan 9I",
    "Canda Tawa", "Solidaritas", "Persahabatan", "Cerita Indah",
    "Kenangan Abadi", "Selamanya 9I"
];

if (galleryGrid) {
    for (let i = 1; i <= 22; i++) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="assets/photos/foto${i}.jpg" alt="${photoTitles[i-1]}" loading="lazy" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%2314141f%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 font-size=%2214%22 fill=%22%23a855f7%22 text-anchor=%22middle%22>Foto ${i}</text></svg>'">
        `;
        galleryGrid.appendChild(item);
    }
}

// ============ REVEAL ANIMATION ============
const items = document.querySelectorAll('.gallery-item');
const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('active'), idx * 50);
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
items.forEach(item => io.observe(item));

// ============ LIGHTBOX ============
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounter = document.getElementById('lightboxCounter');
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = `assets/photos/foto${index + 1}.jpg`;
    lightboxCounter.textContent = `${index + 1} / 22`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showNext() {
    currentIndex = (currentIndex + 1) % 22;
    openLightbox(currentIndex);
}

function showPrev() {
    currentIndex = (currentIndex - 1 + 22) % 22;
    openLightbox(currentIndex);
}

items.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
});

if (document.getElementById('lightboxClose')) {
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxNext').addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    document.getElementById('lightboxPrev').addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
}

// ============ PARTICLES ============
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 15 + 10) + 's';
        p.style.animationDelay = Math.random() * 10 + 's';
        p.style.background = Math.random() > 0.5 ? '#a855f7' : '#ec4899';
        p.style.width = p.style.height = (Math.random() * 3 + 2) + 'px';
        particlesContainer.appendChild(p);
    }
}

// ============ BACKSOUND (MODE DIAM, NYALA SAAT KLIK) ============
const backsound = document.getElementById('backsound');
const musicToggle = document.getElementById('musicToggle');
const isMusicOff = localStorage.getItem('musicOff') === 'true';

if (backsound) {
    backsound.volume = 0.5;
    
    if(musicToggle) musicToggle.classList.remove('playing');

    const playOnClick = (e) => {
        if (e.target === musicToggle || (musicToggle && musicToggle.contains(e.target))) {
            return; 
        }

        if (backsound.paused && !isMusicOff) {
            backsound.play().then(() => {
                if(musicToggle) musicToggle.classList.add('playing');
            }).catch(err => console.log("Gagal play:", err));
        }
        document.removeEventListener('click', playOnClick);
    };

    document.addEventListener('click', playOnClick);

    if (musicToggle) {
        musicToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (backsound.paused) {
                backsound.play();
                musicToggle.classList.add('playing');
                localStorage.setItem('musicOff', 'false');
            } else {
                backsound.pause();
                musicToggle.classList.remove('playing');
                localStorage.setItem('musicOff', 'true');
            }
        });
    }
}
