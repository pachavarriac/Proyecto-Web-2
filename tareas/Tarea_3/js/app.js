document.querySelectorAll('#mainMenu .collapse').forEach(function (submenu) {
    submenu.addEventListener('show.bs.collapse', function () {
        document.querySelectorAll('#menu .collapse.show').forEach(function (openSubmenu) {
            if (openSubmenu !== submenu) {
                new bootstrap.Collapse(openSubmenu, { toggle: true });
            }
        });
    });
});
