/**
 * Blanco Nimai Portfolio - Cursor Raio-X Limpo
 */

const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.2; // Aumentado para 0.2 para eliminar sensação de atraso (lag)

const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (!isTouchDevice && cursor) {
    // Seguir o mouse com suavidade (LERP)
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = "1";
    });

    function updateCursor() {
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        cursor.style.transform = `translate3d(${ballX}px, ${ballY}px, 0)`;
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Único efeito: Expansão de Raio-X ao passar em links/cards
    const interactiveElements = '.hover-trigger, a, .skill-card, .project-card, .sobre-foto';
    
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveElements)) {
            cursor.classList.add('active');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveElements)) {
            cursor.classList.remove('active');
        }
    });
} else if (cursor) {
    cursor.style.display = 'none';
}
