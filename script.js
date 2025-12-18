const cursor = document.getElementById('cursor');
const cursorZoom = document.getElementById('cursor-zoom');
const mainWrapper = document.getElementById('main-wrapper');

let mouseX = 0;
let mouseY = 0;

// 1. Sincronizar contenido para la lupa de forma segura
const syncContent = () => {
    if (mainWrapper && cursorZoom) {
        // Clonamos el nodo completo para mantener estilos exactos
        cursorZoom.innerHTML = ''; 
        const clone = mainWrapper.cloneNode(true);
        cursorZoom.appendChild(clone);
    }
};

window.addEventListener('load', () => {
    syncContent();
    fixMenuLinks();
    updateLupa();
});

// Re-sincronizar si el usuario cambia el tamaño de la ventana para evitar desfases
window.addEventListener('resize', syncContent);

// 2. FUNCIÓN DE NAVEGACIÓN (Corregida para mayor precisión)
function fixMenuLinks() {
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// 3. Movimiento de Lupa con cálculo matemático preciso
const updateLupa = () => {
    const scrollY = window.scrollY;
    const zoom = 1.4; // Nivel de aumento

    // Posicionamiento suave del cursor circular
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    // Cálculo inverso para que el clon coincida con el fondo
    // moveX = (CentroLupa) - (PosicionMouse * Zoom)
    const moveX = (cursor.offsetWidth / 2) - (mouseX * zoom);
    const moveY = (cursor.offsetHeight / 2) - ((mouseY + scrollY) * zoom);

    if (cursorZoom) {
        cursorZoom.style.transform = `translate(${moveX}px, ${moveY}px) scale(${zoom})`;
    }
    
    requestAnimationFrame(updateLupa);
};

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 4. Efectos de Hover (Delegación de eventos para eficiencia)
document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('hover-trigger')) {
        cursor.classList.add('active');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('hover-trigger')) {
        cursor.classList.remove('active');
    }
});

// Configuración de Partículas
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 70 },
            "color": { "value": "#38bdf8" },
            "size": { "value": 4 },
            "line_linked": { "enable": true, "opacity": 0.2 },
            "move": { "enable": true, "speed": 1 }
        }
    });
}
