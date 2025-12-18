const cursor = document.getElementById('cursor');
const cursorZoom = document.getElementById('cursor-zoom');
const mainWrapper = document.getElementById('main-wrapper');

let mouseX = 0;
let mouseY = 0;

const syncContent = () => {
    if (mainWrapper && cursorZoom) {
        cursorZoom.innerHTML = ''; 
        const clone = mainWrapper.cloneNode(true);
        cursorZoom.appendChild(clone);
    }
};

window.addEventListener('load', () => {
    syncContent();
    fixMenuLinks();
    updateLupa();
});

function fixMenuLinks() {
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

const updateLupa = () => {
    const scrollY = window.scrollY;
    const zoom = 1.4;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    // El cálculo usa el offsetWidth actual para que siempre esté centrado
    const moveX = (cursor.offsetWidth / 2) - (mouseX * zoom);
    const moveY = (cursor.offsetHeight / 2) - ((mouseY + scrollY) * zoom);

    if (cursorZoom) {
        cursorZoom.style.transform = `translate(${moveX}px, ${moveY}px) scale(${zoom})`;
    }
    
    requestAnimationFrame(updateLupa);
};

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Detectar hover de forma global
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.hover-trigger')) {
        cursor.classList.add('active');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.hover-trigger')) {
        cursor.classList.remove('active');
    }
});
