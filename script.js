/**
 * Blanco Nimai Portfolio - Script Corrigido e Otimizado
 * Ajustes: Partículas mais visíveis, brilho aumentado e interatividade melhorada.
 */

const cursor = document.getElementById('cursor');

// 1. MOVIMENTAÇÃO DO CURSOR (LERP)
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.15; 

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
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        
        cursor.style.transform = `translate3d(${ballX}px, ${ballY}px, 0) translate(-50%, -50%)`;
        
        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);
} else if (cursor) {
    cursor.style.display = 'none'; 
}

// 2. EFEITOS DE HOVER (Corrigido para Rayos X)
const hoverSelectors = '.hover-trigger, .skill-card, .project-card, .btn-contato, .social-icons-minimal a, .contact-links a, .navbar a, .sobre-foto';

if (!isTouchDevice) {
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest(hoverSelectors);
        
        if (target) {
            cursor.classList.add('active');
            if (target.classList.contains('sobre-foto')) {
                cursor.classList.add('cursor-large');
            }
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest(hoverSelectors);
        if (target) {
            cursor.classList.remove('active');
            cursor.classList.remove('cursor-large');
        }
    });
}

// 3. SCROLL REVEAL (Intersection Observer)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.15, 
    rootMargin: "0px 0px -50px 0px" 
});

// 4. INICIALIZAÇÃO E PARTÍCULAS (Configuración de Alta Visibilidad)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { 
                    "value": 80, // Más cantidad para llenar el espacio
                    "density": { "enable": true, "value_area": 800 } 
                },
                "color": { "value": "#38bdf8" }, // Tu color acento
                "opacity": { 
                    "value": 0.8, // ¡MUCHO MÁS FUERTE! (Antes 0.2/0.5)
                    "random": false,
                    "anim": { 
                        "enable": true, 
                        "speed": 1, 
                        "opacity_min": 0.4, 
                        "sync": false 
                    }
                },
                "size": { 
                    "value": 3, // Partículas más grandes y notables
                    "random": true,
                    "anim": { "enable": true, "speed": 2, "size_min": 1, "sync": false }
                },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#38bdf8", 
                    "opacity": 0.5, // Líneas mucho más visibles (Antes 0.05)
                    "width": 1.5 // Líneas un poco más gruesas
                },
                "move": { 
                    "enable": true, 
                    "speed": 2, // Movimiento más dinámico
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": { 
                "detect_on": "canvas",
                "events": { 
                    "onhover": { 
                        "enable": !isTouchDevice, 
                        "mode": "grab" 
                    },
                    "onclick": { "enable": true, "mode": "push" }
                },
                "modes": {
                    "grab": { 
                        "distance": 250, 
                        "line_linked": { "opacity": 1 } // Al tocar el mouse, la línea brilla al 100%
                    },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }
});
// 5. SCROLL SUAVE (Melhorado com Offset dinâmico)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            
            window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: 'smooth'
            });
        }
    });
});
