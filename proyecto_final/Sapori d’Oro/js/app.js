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

document.addEventListener('DOMContentLoaded', () => {
    const toggler = document.querySelector('.navbar-toggler');
    const offcanvasEl = document.getElementById('mobileNav');

    if (toggler && offcanvasEl) {
        offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
            toggler.blur(); // quita el foco para que no se muestre outline
        });
    }
});






document.addEventListener('DOMContentLoaded', () => {
    const mobileNav = document.getElementById('mobileNav');
    if (!mobileNav) return;

    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(mobileNav);
    const menuList = mobileNav.querySelector('.menu-list');

    if (!menuList) return;

    // Toggle del submenú (Acerca) por tap/click
    menuList.addEventListener('click', (e) => {
        const trigger = e.target.closest('li.dropdown > a.submenu-toggle');
        if (trigger) {
            e.preventDefault();
            e.stopPropagation(); // que no “se propague” como click de enlace normal
            const li = trigger.parentElement; // <li class="dropdown">
            const isOpen = li.classList.contains('open');

            // Cierra otros submenús y restaura sus íconos a "plus"
            menuList.querySelectorAll('li.dropdown.open').forEach(d => {
                if (d !== li) {
                    d.classList.remove('open');
                    const t = d.querySelector(':scope > a.submenu-toggle');
                    if (t) t.setAttribute('aria-expanded', 'false');
                    const otherIcon = d.querySelector(':scope > a.submenu-toggle .toggle-icon');
                    if (otherIcon) {
                        otherIcon.classList.remove('bi-dash-circle');
                        otherIcon.classList.add('bi-plus-circle');
                    }
                }
            });

            // Toggle del actual
            li.classList.toggle('open', !isOpen);
            trigger.setAttribute('aria-expanded', String(!isOpen));

            // Cambiar ícono del trigger actual
            const icon = trigger.querySelector('.toggle-icon');
            if (icon) {
                if (!isOpen) {
                    icon.classList.remove('bi-plus-circle');
                    icon.classList.add('bi-dash-circle');
                } else {
                    icon.classList.remove('bi-dash-circle');
                    icon.classList.add('bi-plus-circle');
                    trigger.blur(); // quita el foco cuando se cierra para evitar línea activa
                }
            }
            return; // ¡no cierres el offcanvas!
        }

        // Si es un enlace hoja (no trigger), cierra el offcanvas
        const leaf = e.target.closest('a.nav-link');
        if (leaf && !leaf.classList.contains('submenu-toggle')) {
            offcanvas.hide();
        }
    });

    // Teclado: Enter o Space abren/cierran submenú; Tab cierra el offcanvas
    menuList.addEventListener('keydown', (e) => {
        const trigger = e.target.closest('li.dropdown > a.submenu-toggle');
        if (trigger && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            trigger.click();
        }
        if (e.key === 'Tab') {
            offcanvas.hide();
        }
    });

    // Quita el foco del botón hamburguesa al cerrar (evita borde activo)
    const toggler = document.querySelector('.navbar-toggler');
    mobileNav.addEventListener('hidden.bs.offcanvas', () => {
        if (toggler) toggler.blur();
        // Cierra submenús y restaura íconos por si acaso
        menuList.querySelectorAll('li.dropdown.open').forEach(d => d.classList.remove('open'));
        menuList.querySelectorAll('a.submenu-toggle[aria-expanded="true"]').forEach(a => a.setAttribute('aria-expanded', 'false'));
        menuList.querySelectorAll('a.submenu-toggle .toggle-icon').forEach(i => {
            i.classList.remove('bi-dash-circle');
            i.classList.add('bi-plus-circle');
        });
    });
});


document.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-clip');
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

