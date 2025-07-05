document.querySelectorAll('#mainMenu .collapse').forEach(function (submenu) {
    submenu.addEventListener('show.bs.collapse', function () {
        document.querySelectorAll('#menu .collapse.show').forEach(function (openSubmenu) {
            if (openSubmenu !== submenu) {
                new bootstrap.Collapse(openSubmenu, { toggle: true });
            }
        });
    });
});

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

