document.addEventListener('DOMContentLoaded', () => {
    const mobileNavEl = document.getElementById('mobileNav');
    if (!mobileNavEl) return;

    const off = new bootstrap.Offcanvas(mobileNavEl);
    const submenus = () => mobileNavEl.querySelectorAll('.collapse.show');

    // Cerrar menú al hacer click en un enlace "final"
    mobileNavEl.addEventListener('click', (e) => {
        const a = e.target.closest('a.nav-link');
        if (a && !a.hasAttribute('data-bs-toggle')) {
            off.hide();
        }
    });

    // Cerrar menú y submenús al presionar TAB en cualquier enlace o botón del offcanvas
    mobileNavEl.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // cierra submenús abiertos
            submenus().forEach(el => bootstrap.Collapse.getOrCreateInstance(el).hide());
            // cierra el offcanvas
            off.hide();
        }
    });

    // Al ocultar el offcanvas, colapsa submenús abiertos por si acaso
    mobileNavEl.addEventListener('hidden.bs.offcanvas', () => {
        submenus().forEach(el => bootstrap.Collapse.getOrCreateInstance(el).hide());
    });
});