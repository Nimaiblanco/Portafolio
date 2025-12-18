// Manejo del cursor simplificado
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Detectar elementos para agrandar el cursor
document.querySelectorAll('.hover-trigger').forEach(item => {
    item.addEventListener('mouseenter', () => cursor.classList.add('active'));
    item.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// Partículas Profesionales
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 80 },
        "color": { "value": "#38bdf8" },
        "size": { "value": 6, "random": true },
        "line_linked": { 
            "enable": true, 
            "distance": 150, 
            "color": "#38bdf8", 
            "opacity": 0.4, 
            "width": 2 
        },
        "move": { "enable": true, "speed": 1 }
    }
});
