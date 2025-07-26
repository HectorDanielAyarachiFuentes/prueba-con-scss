// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Efecto de Brillo que sigue al cursor por toda la página ---
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', e => {
        // Usamos requestAnimationFrame para un rendimiento más suave
        requestAnimationFrame(() => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    });

    // --- Efecto de brillo dentro de cada tarjeta ---
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // --- Animaciones al hacer scroll (Intersection Observer) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.dataset.delay) || 0;
                entry.target.style.transitionDelay = `${delay}s`;
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Para que la animación ocurra solo una vez
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
});