
const btn = document.getElementById("btn-top");

// Mostrar el botón si se hace scroll hacia abajo
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        btn.classList.remove("d-none");
    } else {
        btn.classList.add("d-none");
    }
});

// Al hacer clic, volver arriba con scroll suave
btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});



document.querySelectorAll('#mainMenu .collapse').forEach(function (submenu) {
    submenu.addEventListener('show.bs.collapse', function () {
        document.querySelectorAll('#menu .collapse.show').forEach(function (openSubmenu) {
            if (openSubmenu !== submenu) {
                new bootstrap.Collapse(openSubmenu, { toggle: true });
            }
        });
    });
});

// --- Abrir/cerrar menú móvil y bloquear scroll del body ---
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.classList.add('menu-mobile-open');
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-mobile-open');
    closeAllMobileDropdowns();
});

// --- Dropdown funcional en menú móvil con icono dinámico ---
document.querySelectorAll('.mobile-menu-list .dropdown-toggle-mobile').forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
        e.preventDefault();
        // Encuentra el LI padre .dropdown
        var li = this.closest('li.dropdown');
        if (!li) return;
        // Encuentra el icono dentro del a
        var icon = this.querySelector('.dropdown-toggle-icon');
        var isOpen = li.classList.contains('open');
        // Cierra TODOS los demás dropdowns e iconos
        document.querySelectorAll('.mobile-menu-list .dropdown').forEach(function (otherLi) {
            otherLi.classList.remove('open');
            var otherIcon = otherLi.querySelector('.dropdown-toggle-icon');
            if (otherIcon) {
                otherIcon.src = "/assets/icons/circular_plus_icon.svg";
                otherIcon.alt = "Abrir submenú";
            }
        });
        // Toggle este
        if (!isOpen) {
            li.classList.add('open');
            if (icon) {
                icon.src = "/assets/icons/circular_minus_icon.svg";
                icon.alt = "Cerrar submenú";
            }
        } else {
            li.classList.remove('open');
            if (icon) {
                icon.src = "/assets/icons/circular_plus_icon.svg";
                icon.alt = "Abrir submenú";
            }
        }
    });
});

// --- Cerrar todos los submenús del menú móvil ---
function closeAllMobileDropdowns() {
    document.querySelectorAll('.mobile-menu-list .dropdown').forEach(function (li) {
        li.classList.remove('open');
        var icon = li.querySelector('.dropdown-toggle-icon');
        if (icon) {
            icon.src = "/assets/icons/circular_plus_icon.svg";
            icon.alt = "Abrir submenú";
        }
    });
}

// --- Cerrar menú móvil y submenús al hacer click en cualquier opción real (no en el toggle) ---
document.querySelectorAll('#mobile-menu a:not(.dropdown-toggle-mobile)').forEach(function (link) {
    link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-mobile-open');
        closeAllMobileDropdowns();
    });
});
