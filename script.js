const cursor = document.getElementById('cursor');

// Movimiento ultra fluido
document.addEventListener('mousemove', (e) => {
    // Usamos requestAnimationFrame para que el cursor no tenga lag al aumentar
    window.requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
});

// Configurar el aumento en los elementos con clase .hover-trigger
const setupMagnifier = () => {
    const interactiveElements = document.querySelectorAll('.hover-trigger');
    
    interactiveElements.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
};

window.onload = () => {
    setupMagnifier();
};

// Partículas de fondo (sin cambios, mantienen la estética profesional)
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 80 },
        "color": { "value": "#38bdf8" },
        "size": { "value": 5, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.3, "width": 1.5 },
        "move": { "enable": true, "speed": 1.2 }
    }
});
