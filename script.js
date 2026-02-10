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
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
    });

    revealTargets.forEach((target) => observer.observe(target));

    document.querySelectorAll('.stagger-group').forEach((group) => {
        const items = group.querySelectorAll('.reveal-card');
        items.forEach((item, index) => {
            item.style.setProperty('--reveal-delay', `${Math.min(index * 0.08, 0.48)}s`);
        });
    });

    const parallaxElements = document.querySelectorAll('[data-parallax]');
    let ticking = false;

    const updateParallax = () => {
        const scrollY = window.scrollY;
        parallaxElements.forEach((element) => {
            const speed = Number(element.dataset.parallax) || 0;
            const y = -(scrollY * speed);
            element.style.setProperty('--parallax-y', `${y.toFixed(2)}px`);
        });
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    updateParallax();
} else {
    document.querySelectorAll('.reveal, .reveal-item, .reveal-card').forEach((el) => {
        el.classList.add('is-visible');
    });
}
