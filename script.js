/**
 * Blanco Nimai Portfolio - Script Master (Raio-X & Performance)
 */

const cursor = document.getElementById('cursor');

// 1. MOVIMENTAÇÃO DO CURSOR (LERP OTIMIZADO)
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.2; // Velocidade ideal para resposta imediata sem perder a suavidade

const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (!isTouchDevice && cursor) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = "1";
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = "0";
    });

    function updateCursor() {
        // Interpolação para movimento fluido
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        
        // translate3d envia o processamento para a GPU (Placa de Vídeo) eliminando o lag
        cursor.style.transform = `translate3d(${ballX}px, ${ballY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
} else if (cursor) {
    cursor.style.display = 'none'; // Desativa em telas de toque
}

// 2. EFEITO RAIO-X UNIFICADO (EXPANSÃO)
// Seleciona todos os elementos que devem disparar o aumento do círculo
const hoverSelectors = '.hover-trigger, .skill-card, .project-card, .btn-contato, .social-icons-minimal a, .contact-links a, .navbar a, .sobre-foto';

if (!isTouchDevice) {
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest(hoverSelectors);
        if (target) {
            // Ativa a classe unificada de Raio-X definida no CSS
            cursor.classList.add('active');
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest(hoverSelectors);
        if (target) {
            cursor.classList.remove('active');
        }
    });
}

// 3. SCROLL REVEAL (INTERSECTION OBSERVER)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

// 4. INICIALIZAÇÃO E PARTÍCULAS (VISIBILIDADE MÁXIMA)
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa revelação de elementos
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    
    // Configuração de PartículasJS - Fundo Presente e Vibrante
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 90, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#38bdf8" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 2, "random": true },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#38bdf8", 
                    "opacity": 0.3, // Linhas de conexão bem visíveis
                    "width": 1 
                },
                "move": { 
                    "enable": true, 
                    "speed": 1.5, 
                    "direction": "none", 
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": { 
                "detect_on": "canvas",
                "events": { 
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" }
                },
                "modes": {
                    "grab": { "distance": 200, "line_linked": { "opacity": 0.6 } }
                }
            },
            "retina_detect": true
        });
    }
});

// 5. SCROLL SUAVE (FIX PARA OFFSET DE HEADER)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            
            window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: 'smooth'
            });
        }
    });
});
