const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;

// Seguir mouse com suavidade (LERP)
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    ballX += (mouseX - ballX) * 0.15;
    ballY += (mouseY - ballY) * 0.15;
    
    if(cursor) {
        cursor.style.transform = `translate3d(${ballX}px, ${ballY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(animate);
}
animate();

// Efeito de Hover
const triggers = document.querySelectorAll('a, .skill-card, .project-card, .sobre-foto');
triggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => cursor.classList.add('active'));
    trigger.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// Reveal on Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Particles.js
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 50 },
            "color": { "value": "#38bdf8" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.2 },
            "size": { "value": 2 },
            "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.1, "width": 1 },
            "move": { "enable": true, "speed": 1 }
        },
        "retina_detect": true
    });
}
