// ============ TYPING ANIMATION ============
const typingTexts = [
    "Kenangan Kelas 9I",
    "Kisah Kita Bersama",
    "Tawa & Cerita Indah",
    "Persahabatan Selamanya"
];
let textIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById('typing');

if (typingEl) {
    function type() {
        const current = typingTexts[textIndex];
        if (isDeleting) {
            typingEl.textContent = current.substring(0, charIndex--);
        } else {
            typingEl.textContent = current.substring(0, charIndex++);
        }
        let speed = isDeleting ? 50 : 120;
        if (!isDeleting && charIndex === current.length + 1) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            speed = 500;
        }
        setTimeout(type, speed);
    }
    type();
}

// ============ HAMBURGER MENU ============
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if(hamburger) hamburger.classList.remove('active');
        if(navMenu) navMenu.classList.remove('active');
    });
});

// ============ COUNTER ANIMATION ============
function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const update = () => {
        current += step;
        if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
        }
    };
    update();
}

// ============ SCROLL REVEAL & SKILLS & COUNTERS ============
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Animate Skill Bars
            if (entry.target.classList.contains('skills-grid')) {
                entry.target.querySelectorAll('.skill-fill').forEach(fill => {
                    fill.style.width = fill.dataset.width + '%';
                });
            }
            
            // Animate Counters
            if (entry.target.classList.contains('stats-grid')) {
                entry.target.querySelectorAll('.stat-number').forEach(num => {
                    if (!num.dataset.animated) {
                        animateCounter(num);
                        num.dataset.animated = 'true';
                    }
                });
            }
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.about-card, .stat-card, .skill-item, .video-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

if (document.querySelector('.stats-grid')) observer.observe(document.querySelector('.stats-grid'));
if (document.querySelector('.skills-grid')) observer.observe(document.querySelector('.skills-grid'));

// ============ GENERATE VIDEO GRID ============
const videoTitles = [
    "Momen Kebersamaan", "Tawa Bersama", "Perjalanan Kita",
    "Kegiatan Kelas", "Wisuda Mini", "Selamanya 9I"
];
const videoGrid = document.getElementById('videoGrid');

if (videoGrid) {
    for (let i = 1; i <= 6; i++) {
        const card = document.createElement('div');
        card.className = 'video-card reveal';
        
        // PERUBAHAN: Atribut poster dihapus agar tampilan awal hitam bersih
        card.innerHTML = `
            <video controls preload="metadata">
                <source src="assets/videos/video${i}.mp4" type="video/mp4">
            </video>
            <div class="video-info">
                <h4>🎥 ${videoTitles[i-1]}</h4>
                <p>Kenangan kelas 9I</p>
            </div>
        `;
        videoGrid.appendChild(card);
        observer.observe(card);
    }
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

// ============ BACKSOUND (AUTO-PLAY ON INTERACTION) ============
const backsound = document.getElementById('backsound');
const musicToggle = document.getElementById('musicToggle');
const isMusicOff = localStorage.getItem('musicOff') === 'true';

if (backsound) {
    backsound.volume = 0.5;
    
    // Coba putar langsung saat halaman dimuat
    if (!isMusicOff) {
        backsound.play().then(() => {
            if(musicToggle) musicToggle.classList.add('playing');
        }).catch(() => {
            // Browser memblokir (normal), tunggu interaksi user
            if(musicToggle) musicToggle.classList.remove('playing');
        });
    }

    // Fungsi memutar musik saat ada interaksi (scroll/klik)
    const playOnInteract = () => {
        if (backsound.paused && !isMusicOff) {
            backsound.play().then(() => {
                if(musicToggle) musicToggle.classList.add('playing');
            }).catch(e => console.log("Gagal play:", e));
        }
        // Hapus event setelah musik berhasil diputar agar tidak membebani browser
        document.removeEventListener('click', playOnInteract);
        document.removeEventListener('scroll', playOnInteract);
        document.removeEventListener('touchstart', playOnInteract);
        document.removeEventListener('keydown', playOnInteract);
    };

    // Daftarkan event listener
    document.addEventListener('click', playOnInteract);
    document.addEventListener('scroll', playOnInteract);
    document.addEventListener('touchstart', playOnInteract);
    document.addEventListener('keydown', playOnInteract);

    // Tombol Toggle Musik Manual
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
        
        if(!backsound.paused) musicToggle.classList.add('playing');
    }
}
