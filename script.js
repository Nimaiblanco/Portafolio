const cursor = document.getElementById('cursor');
const cursorZoom = document.getElementById('cursor-zoom');
const mainWrapper = document.getElementById('main-wrapper');

let mouseX = 0;
let mouseY = 0;

// Sincronizar contenido
const syncContent = () => {
    if (mainWrapper && cursorZoom) {
        cursorZoom.innerHTML = mainWrapper.innerHTML;
    }
};

// Función principal de movimiento
const updateLupa = () => {
    const scrollY = window.scrollY;
    const zoom = 1.4;

    // Posición del cursor
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    // Posición del contenido interno (Zoom)
    // Calculamos el desfase exacto compensando el scroll y el punto central
    const moveX = -mouseX * zoom + (cursor.offsetWidth / 2);
    const moveY = -(mouseY + scrollY) * zoom + (cursor.offsetHeight / 2);

    if (cursorZoom) {
        cursorZoom.style.transform = `translate(${moveX}px, ${moveY}px) scale(${zoom})`;
    }
    
    requestAnimationFrame(updateLupa);
};

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Detectar hover en elementos
const initHovers = () => {
    document.querySelectorAll('.hover-trigger').forEach(item => {
        item.addEventListener('mouseenter', () => cursor.classList.add('active'));
        item.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
};

window.onload = () => {
    syncContent();
    initHovers();
    updateLupa(); // Inicia el loop de renderizado suave
};

// Partículas
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 80 },
        "color": { "value": "#38bdf8" },
        "size": { "value": 4 },
        "line_linked": { "enable": true, "opacity": 0.3 },
        "move": { "enable": true, "speed": 1 }
    }
});
