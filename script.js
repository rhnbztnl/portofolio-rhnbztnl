const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    const revealTargets = document.querySelectorAll('.reveal, .reveal-item, .reveal-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
    });

    revealTargets.forEach((target) => observer.observe(target));

    document.querySelectorAll('.stagger-group').forEach((group) => {
        const items = group.querySelectorAll('.reveal-card');
        items.forEach((item, index) => {
            item.style.setProperty('--reveal-delay', `${Math.min(index * 0.09, 0.54)}s`);
        });
    });

    const parallaxElements = document.querySelectorAll('[data-parallax]');
    let ticking = false;
    let currentY = window.scrollY;
    let targetY = window.scrollY;

    const updateParallax = () => {
        currentY += (targetY - currentY) * 0.12;

        parallaxElements.forEach((element) => {
            const speed = Number(element.dataset.parallax) || 0;
            const y = -(currentY * speed);
            element.style.setProperty('--parallax-y', `${y.toFixed(2)}px`);
        });

        if (Math.abs(targetY - currentY) > 0.2) {
            window.requestAnimationFrame(updateParallax);
        } else {
            ticking = false;
        }
    };

    window.addEventListener('scroll', () => {
        targetY = window.scrollY;
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(updateParallax);
        }
    }, { passive: true });

    updateParallax();
} else {
    document.querySelectorAll('.reveal, .reveal-item, .reveal-card').forEach((el) => {
        el.classList.add('is-visible');
    });
}

const projectDetails = {
    inventori: {
        title: 'Dashboard Inventori',
        stack: 'Stack: React, Node.js, PostgreSQL',
        challenge: 'Data stok sering tidak sinkron karena input dari banyak cabang dan proses pelaporan masih manual.',
        solution: 'Membangun dashboard real-time dengan validasi input, filter laporan, dan notifikasi restock otomatis.',
        image: 'linear-gradient(135deg, #163c5a, #2f7ec0)',
    },
    landing: {
        title: 'Landing Page Bisnis',
        stack: 'Stack: HTML, CSS, JavaScript',
        challenge: 'Halaman lama lambat, struktur konten tidak fokus, dan CTA kurang jelas untuk pengguna baru.',
        solution: 'Merancang ulang informasi dan layout hero-to-CTA agar pesan utama lebih jelas dengan loading lebih cepat.',
        image: 'linear-gradient(135deg, #25547f, #5a9bd2)',
    },
    ecommerce: {
        title: 'Catalog & Checkout',
        stack: 'Stack: Next.js, Express, Midtrans API',
        challenge: 'Proses checkout sering drop karena alur pembayaran terlalu panjang dan tidak konsisten di mobile.',
        solution: 'Menyederhanakan checkout menjadi 3 langkah, menambah validasi alamat, dan integrasi payment gateway yang stabil.',
        image: 'linear-gradient(135deg, #1f4f78, #4ca1d9)',
    },
    cms: {
        title: 'Manajemen Konten',
        stack: 'Stack: Vue, Laravel, MySQL',
        challenge: 'Tim konten kesulitan mengelola role dan approval artikel karena alur kerja belum terstruktur.',
        solution: 'Membangun panel admin dengan role-based access, workflow approval, dan manajemen media terpusat.',
        image: 'linear-gradient(135deg, #193e61, #3f8cca)',
    },
};

const modal = document.getElementById('project-modal');
const modalCloseBtn = document.getElementById('modal-close');
const modalTitle = document.getElementById('project-modal-title');
const modalStack = document.getElementById('modal-stack');
const modalChallenge = document.getElementById('modal-challenge');
const modalSolution = document.getElementById('modal-solution');
const modalImage = document.getElementById('modal-image');

const openModal = (projectKey) => {
    const detail = projectDetails[projectKey];
    if (!detail || !modal) return;

    modalTitle.textContent = detail.title;
    modalStack.textContent = detail.stack;
    modalChallenge.textContent = detail.challenge;
    modalSolution.textContent = detail.solution;
    modalImage.style.background = detail.image;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
};

const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
};

document.querySelectorAll('.project-detail-trigger').forEach((button) => {
    button.addEventListener('click', () => {
        openModal(button.dataset.project);
    });
});

modalCloseBtn?.addEventListener('click', closeModal);

modal?.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.closeModal === 'true') {
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});
