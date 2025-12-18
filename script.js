const cursor = document.getElementById('cursor');
const cursorZoom = document.getElementById('cursor-zoom');
const mainWrapper = document.getElementById('main-wrapper');

// Sincronizar contenido para la lupa al cargar
window.onload = () => {
    if (mainWrapper && cursorZoom) {
        cursorZoom.innerHTML = mainWrapper.innerHTML;
    }
};

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const scrollY = window.scrollY;

    // Mover el contenedor del cursor
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;

    // Calcular el efecto de aumento (1.25x es el zoom ideal)
    const zoom = 1.25;
    const moveX = -x * zoom + (cursor.offsetWidth / 2);
    const moveY = -(y + scrollY) * zoom + (cursor.offsetHeight / 2);

    if (cursorZoom) {
        cursorZoom.style.transform = `translate(${moveX}px, ${moveY}px) scale(${zoom})`;
    }
});

// Activar lupa en elementos con clase .hover-trigger
document.querySelectorAll('.hover-trigger').forEach(item => {
    item.addEventListener('mouseenter', () => cursor.classList.add('active'));
    item.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// Partículas
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 80 },
        "color": { "value": "#38bdf8" },
        "size": { "value": 6, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.3, "width": 1.5 },
        "move": { "enable": true, "speed": 1 }
    }
});
