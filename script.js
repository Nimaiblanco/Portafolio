const cursor = document.getElementById('cursor');

// Movimentação do cursor customizado
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Efeito de expansão do cursor em elementos interativos
document.addEventListener('mouseover', (e) => {
    // Adicionei a classe 'skill-card' e 'btn-contato' para o cursor reagir a eles também
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

// Configuração do Particles.js (Fundo Dinâmico)
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
            "onhover": { "enable": true, "mode": "grab" }, // As linhas seguem o mouse levemente
            "resize": true 
        } 
    },
    "retina_detect": true
});

// Scroll Suave para os links da Navbar
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
