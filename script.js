const contentOriginal = document.getElementById('content-to-copy');
const lupaContent = document.getElementById('lupa-content');
const lupaWrapper = document.getElementById('lupa-wrapper');

lupaContent.innerHTML = contentOriginal.innerHTML;

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const scrollY = window.scrollY;

    lupaWrapper.style.opacity = '1';
    lupaWrapper.style.left = `${x}px`;
    lupaWrapper.style.top = `${y}px`;

    const zoom = 1.05; 
    const currentRadius = lupaWrapper.offsetWidth / 2; 

    const moveX = -(x * zoom) + currentRadius;
    const moveY = -((y + scrollY) * zoom) + currentRadius;

    lupaContent.style.transform = `translate(${moveX}px, ${moveY}px) scale(${zoom})`;
});

const hoverItems = document.querySelectorAll('.hover-trigger');
hoverItems.forEach(item => {
    item.addEventListener('mouseenter', () => lupaWrapper.classList.add('active'));
    item.addEventListener('mouseleave', () => lupaWrapper.classList.remove('active'));
});

particlesJS('particles-js', {
    "particles": {
        "number": { "value": 110, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#38bdf8" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.4 },
        "size": { "value": 4.5, "random": true },
        "line_linked": { "enable": true, "distance": 180, "color": "#38bdf8", "opacity": 0.3, "width": 1.5 },
        "move": { "enable": true, "speed": 1.2 }
    }
});
