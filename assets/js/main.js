// Racer Point Off Road — Main JavaScript Interactions

document.addEventListener('DOMContentLoaded', function () {

    // ─── Theme Toggle (Dia / Noite) ────────────────────────────────────────
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Carrega preferência salva (padrão: modo claro)
    const savedTheme = localStorage.getItem('racerpoint-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('racerpoint-theme', isDark ? 'dark' : 'light');

            // Atualiza background do header imediatamente
            updateHeaderBg();
        });
    }

    // ─── Mobile Menu Toggle ────────────────────────────────────────────────
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // ─── Smooth Scroll para Nav Links ─────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                if (navMenu) navMenu.classList.remove('active');
                
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─── Header Background on Scroll ──────────────────────────────────────
    const header = document.querySelector('.header');

    function updateHeaderBg() {
        const isDark = body.classList.contains('dark-mode');
        if (window.scrollY > 50) {
            header.style.boxShadow = isDark
                ? '0 10px 30px rgba(0,0,0,0.8)'
                : '0 4px 20px rgba(0,0,0,0.12)';
            header.style.background = isDark
                ? 'rgba(10, 11, 13, 0.98)'
                : 'rgba(245, 245, 247, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = isDark
                ? 'rgba(10, 11, 13, 0.9)'
                : 'rgba(245, 245, 247, 0.92)';
        }
    }

    window.addEventListener('scroll', updateHeaderBg);
    updateHeaderBg(); // aplica no load

    // ─── Hero Slider Rotativo ──────────────────────────────────────────────
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    let currentSlide = 0;
    let slideTimer = null;
    const SLIDE_INTERVAL = 5500; // 5.5 segundos por slide

    function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        stopAutoSlide();
        slideTimer = setInterval(nextSlide, SLIDE_INTERVAL);
    }

    function stopAutoSlide() {
        if (slideTimer) clearInterval(slideTimer);
    }

    if (slides.length > 0) {
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                nextSlide();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                prevSlide();
                startAutoSlide();
            });
        }

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', function () {
                goToSlide(idx);
                startAutoSlide();
            });
        });

        // Inicia o carrossel automático
        startAutoSlide();
    }

    // ─── Smooll Framework Integration (Animações & Transições) ───────────────
    if (typeof Smooll !== 'undefined') {
        Smooll.init({
            pageTransitions: true,
            revealOnScroll: true
        });
    }
});
