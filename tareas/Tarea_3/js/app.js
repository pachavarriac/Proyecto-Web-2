document.querySelectorAll('#mainMenu .collapse').forEach(function (submenu) {
    submenu.addEventListener('show.bs.collapse', function () {
        document.querySelectorAll('#menu .collapse.show').forEach(function (openSubmenu) {
            if (openSubmenu !== submenu) {
                new bootstrap.Collapse(openSubmenu, { toggle: true });
            }
        });
    });
});

// document.querySelectorAll('.custom-accordion-button').forEach(button => {
//     button.addEventListener('click', () => {
//         const iconPlus = button.querySelector('.icon-plus');
//         const iconMinus = button.querySelector('.icon-minus');
//         iconPlus.classList.toggle('d-none');
//         iconMinus.classList.toggle('d-none');
//     });
// });