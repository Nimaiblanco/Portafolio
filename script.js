const cursor = document.getElementById('cursor');

// 1. CARREGAMENTO INICIAL
window.addEventListener('load', () => {
    document.body.classList.add('site-loaded');
    // Força uma verificação de reveal logo após o carregamento
    checkReveal();
});

// 2. MOVIMENTAÇÃO DO CURSOR
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }
    requestAnimationFrame(updateCursor);
}
requestAnimationFrame(updateCursor);

// 3. EFEITOS DE HOVER
const hoverSelectors = '.hover-trigger, .social-icon, .skill-card, .btn-contato, a, button';
document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSelectors)) cursor.classList.add('active');
});
document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSelectors)) cursor.classList.remove('active');
});

// 4. SCROLL REVEAL (MELHORADO)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.1, // Dispara com apenas 10% de visibilidade
    rootMargin: "0px 0px -50px 0px" 
});

function checkReveal() {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => {
        // Se o elemento já estiver na parte visível da tela, ativa agora
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
        }
        revealObserver.observe(el);
    });
}

// 5. PARTICLES.JS (Com verificação de existência)
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

// 6. SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    });
});
