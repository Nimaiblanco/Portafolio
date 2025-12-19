const cursor = document.getElementById('cursor');

// 1. MOVIMENTAÇÃO DO CURSOR (Suavizado com RequestAnimationFrame)
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.2; // Ajuste para mais ou menos suavidade (0.1 a 1.0)

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    if (cursor) {
        // Interpolação para um movimento mais fluido (o cursor persegue o mouse)
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        
        cursor.style.transform = `translate(calc(${ballX}px - 50%), calc(${ballY}px - 50%))`;
    }
    requestAnimationFrame(updateCursor);
}
requestAnimationFrame(updateCursor);

// 2. EFEITOS DE HOVER
const hoverSelectors = '.hover-trigger, .social-icon, .skill-card, .project-card, .btn-contato, a, button';
document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSelectors)) cursor.classList.add('active');
});
document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSelectors)) cursor.classList.remove('active');
});

// 3. SCROLL REVEAL (Otimizado com Intersection Observer)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target); // Para de observar após animar
        }
    });
}, { 
    threshold: 0.15, // Ativa quando 15% do elemento aparece
    rootMargin: "0px 0px -50px 0px" 
});

// Inicializa o Reveal
function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => revealObserver.observe(el));
}

// 4. CARREGAMENTO INICIAL
window.addEventListener('load', () => {
    document.body.classList.add('site-loaded');
    initReveal();
});

// 5. CONFIGURAÇÃO PARTICLES.JS
if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#38bdf8" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5 },
            "size": { "value": 3 },
            "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.3, "width": 1 },
            "move": { "enable": true, "speed": 1.5 }
        },
        "interactivity": { 
            "detect_on": "canvas", 
            "events": { "onhover": { "enable": true, "mode": "grab" }, "resize": true } 
        },
        "retina_detect": true
    });
}

// 6. SCROLL SUAVE PARA LINKS INTERNOS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offset = 20;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = targetElement.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
