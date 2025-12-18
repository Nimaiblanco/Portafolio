const handleLupa = () => {
    const mainWrapper = document.getElementById('content-to-copy');
    const lupaContent = document.getElementById('lupa-content');
    const lupaWrapper = document.getElementById('lupa-wrapper');

    // Sincronización inicial
    lupaContent.innerHTML = mainWrapper.innerHTML;

    const updateLupaPosition = (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Mover el contenedor circular
        lupaWrapper.style.left = `${x}px`;
        lupaWrapper.style.top = `${y}px`;

        // Ajuste matemático para eliminar desfase
        const zoom = 1.0; // Mantener 1.0 para alineación perfecta, o 1.05 para ligero aumento
        const scrollY = window.scrollY;
        
        // El contenido dentro de la lupa se mueve en sentido inverso al mouse
        const moveX = -x;
        const moveY = -(y + scrollY);

        lupaContent.style.transform = `translate(${moveX}px, ${moveY}px) scale(${zoom})`;
        // Ajustar la posición interna para que coincida con el borde del wrapper circular
        lupaContent.style.left = `${lupaWrapper.offsetWidth / 2}px`;
        lupaContent.style.top = `${lupaWrapper.offsetHeight / 2}px`;
    };

    document.addEventListener('mousemove', updateLupaPosition);
    document.addEventListener('scroll', () => {
        // Forzar actualización en scroll para evitar saltos
        const fakeEvent = { clientX: parseFloat(lupaWrapper.style.left), clientY: parseFloat(lupaWrapper.style.top) };
        if(fakeEvent.clientX) updateLupaPosition(fakeEvent);
    });

    // Triggers de expansión
    const triggers = document.querySelectorAll('.hover-trigger');
    triggers.forEach(t => {
        t.addEventListener('mouseenter', () => lupaWrapper.classList.add('active'));
        t.addEventListener('mouseleave', () => lupaWrapper.classList.remove('active'));
    });
};

window.onload = () => {
    setTimeout(handleLupa, 100);
};

// Partículas estables
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 80 },
        "color": { "value": "#38bdf8" },
        "size": { "value": 6, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.4, "width": 2 },
        "move": { "enable": true, "speed": 1 }
    }
});
