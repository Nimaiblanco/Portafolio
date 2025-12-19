const cursor = document.getElementById('cursor');

// 1. EFEITO DE CARREGAMENTO (FADE-IN INICIAL)
window.addEventListener('load', () => {
    document.body.classList.add('site-loaded');
});

// 2. MOVIMENTAÇÃO DO CURSOR CUSTOMIZADO
document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

// 3. EFEITO DE EXPANSÃO DO CURSOR EM ELEMENTOS INTERATIVOS
document.addEventListener('mouseover', (e) => {
    const target = e.target;
    // Adicionado .social-icon e melhorado o uso de .closest() para ícones internos
    if (
        target.classList.contains('hover-trigger') || 
        target.classList.contains('mail-link') || 
        target.closest('.social-icon') || 
        target.closest('.skill-card') || 
        target.closest('.btn-contato') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
    ) {
        cursor.classList.add('active');
    }
});

document.addEventListener('mouseout', (e) => {
    const target = e.target;
    if (
        target.classList.contains('hover-trigger') || 
        target.classList.contains('mail-link') ||
        target.closest('.social-icon') || 
        target.closest('.skill-card') || 
        target.closest('.btn-contato') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
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

// 5. SCROLL SUAVE PARA OS LINKS (NAVBAR E BOTÕES)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
