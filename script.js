const cursor = document.getElementById('cursor');

// 1. EFEITO DE CARREGAMENTO (FADE-IN INICIAL)
window.addEventListener('load', () => {
    // Adiciona a classe no body que dispara a transição definida no CSS
    document.body.classList.add('site-loaded');
});

// 2. MOVIMENTAÇÃO DO CURSOR CUSTOMIZADO
document.addEventListener('mousemove', (e) => {
    // Usando requestAnimationFrame para o movimento ser mais fluido (60fps)
    requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

// 3. EFEITO DE EXPANSÃO DO CURSOR EM ELEMENTOS INTERATIVOS
document.addEventListener('mouseover', (e) => {
    if (
        e.target.classList.contains('hover-trigger') || 
        e.target.closest('.skill-card') || 
        e.target.closest('.btn-contato') ||
        e.target.tagName === 'A'
    ) {
        cursor.classList.add('active');
    }
});

document.addEventListener('mouseout', (e) => {
    if (
        e.target.classList.contains('hover-trigger') || 
        e.target.closest('.skill-card') || 
        e.target.closest('.btn-contato') ||
        e.target.tagName === 'A'
    ) {
        cursor.classList.remove('active');
    }
});

// 4. CONFIGURAÇÃO DO PARTICLES.JS
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
        "events": { 
            "onhover": { "enable": true, "mode": "grab" },
            "resize": true 
        } 
    },
    "retina_detect": true
});

// 5. SCROLL SUAVE PARA OS LINKS DA NAVBAR
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
