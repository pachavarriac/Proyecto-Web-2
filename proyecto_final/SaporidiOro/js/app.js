document.addEventListener('DOMContentLoaded', () => {
    const mobileNavEl = document.getElementById('mobileNav');
    if (!mobileNavEl) return;

    const off = new bootstrap.Offcanvas(mobileNavEl);
    const submenus = () => mobileNavEl.querySelectorAll('.collapse.show');

    mobileNavEl.addEventListener('click', (e) => {
        const a = e.target.closest('a.nav-link');
        if (a && !a.hasAttribute('data-bs-toggle')) {
            off.hide();
        }
    });

    mobileNavEl.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            submenus().forEach(el => bootstrap.Collapse.getOrCreateInstance(el).hide());
            off.hide();
        }
    });

    mobileNavEl.addEventListener('hidden.bs.offcanvas', () => {
        submenus().forEach(el => bootstrap.Collapse.getOrCreateInstance(el).hide());
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const toggler = document.querySelector('.navbar-toggler');
    const offcanvasEl = document.getElementById('mobileNav');

    if (toggler && offcanvasEl) {
        offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
            toggler.blur();
        });
    }
});






document.addEventListener('DOMContentLoaded', () => {
    const mobileNav = document.getElementById('mobileNav');
    if (!mobileNav) return;

    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(mobileNav);
    const menuList = mobileNav.querySelector('.menu-list');

    if (!menuList) return;

    menuList.addEventListener('click', (e) => {
        const trigger = e.target.closest('li.dropdown > a.submenu-toggle');
        if (trigger) {
            e.preventDefault();
            e.stopPropagation();
            const li = trigger.parentElement;
            const isOpen = li.classList.contains('open');

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

            li.classList.toggle('open', !isOpen);
            trigger.setAttribute('aria-expanded', String(!isOpen));

            const icon = trigger.querySelector('.toggle-icon');
            if (icon) {
                if (!isOpen) {
                    icon.classList.remove('bi-plus-circle');
                    icon.classList.add('bi-dash-circle');
                } else {
                    icon.classList.remove('bi-dash-circle');
                    icon.classList.add('bi-plus-circle');
                    trigger.blur();
                }
            }
            return;
        }

        const leaf = e.target.closest('a.nav-link');
        if (leaf && !leaf.classList.contains('submenu-toggle')) {
            offcanvas.hide();
        }
    });

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

    const toggler = document.querySelector('.navbar-toggler');
    mobileNav.addEventListener('hidden.bs.offcanvas', () => {
        if (toggler) toggler.blur();
        menuList.querySelectorAll('li.dropdown.open').forEach(d => d.classList.remove('open'));
        menuList.querySelectorAll('a.submenu-toggle[aria-expanded="true"]').forEach(a => a.setAttribute('aria-expanded', 'false'));
        menuList.querySelectorAll('a.submenu-toggle .toggle-icon').forEach(i => {
            i.classList.remove('bi-dash-circle');
            i.classList.add('bi-plus-circle');
        });
    });
});


// document.addEventListener('scroll', () => {
//     const navbar = document.querySelector('.navbar-clip');
//     const offcanvasMobile = document.querySelector('.offcanvas-mobile');
//     if (!navbar) return;

//     if (window.scrollY > 5) {
//         navbar.classList.add('scrolled');
//         document.body.classList.add('nav-scrolled');
//         if (offcanvasMobile) offcanvasMobile.classList.add('scrolled');
//     } else {
//         navbar.classList.remove('scrolled');
//         document.body.classList.remove('nav-scrolled');
//         if (offcanvasMobile) offcanvasMobile.classList.remove('scrolled');
//     }
// });


document.addEventListener('DOMContentLoaded', () => {
    const checkNavbarClass = () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        if (window.matchMedia('(max-width: 991px)').matches) {
            navbar.classList.remove('navbar-expand-lg');
        } else {
            navbar.classList.add('navbar-expand-lg');
        }
    };

    window.addEventListener('resize', checkNavbarClass);
    document.addEventListener('DOMContentLoaded', checkNavbarClass);
});



document.addEventListener('DOMContentLoaded', () => {
    let lastY = window.scrollY;
    const navbar = document.querySelector('.navbar-clip');
    const offcanvasMobile = document.querySelector('.offcanvas-mobile');

    if (!navbar) return;

    const onScroll = () => {
        const y = window.scrollY;
        const isMobile = window.matchMedia('(max-width: 360px)').matches;

        if (isMobile) {
            // Bajar: reduce al pasar 5px
            if (y > lastY && y > 5) {
                document.body.classList.add('nav-scrolled');
                navbar.classList.add('scrolled');
                offcanvasMobile && offcanvasMobile.classList.add('scrolled');
            }
            // Subir: solo vuelve al grande si llega al top
            if (y === 0) {
                document.body.classList.remove('nav-scrolled');
                navbar.classList.remove('scrolled');
                offcanvasMobile && offcanvasMobile.classList.remove('scrolled');
            }
        } else {
            // Escritorio: tu lógica normal
            if (y > 5) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        lastY = y <= 0 ? 0 : y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // estado inicial
});


let lastScrollTop = 0;
window.addEventListener("scroll", function () {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st < lastScrollTop) {
        // Scroll hacia arriba
        document.body.setAttribute("data-scroll-dir", "up");
    } else {
        // Scroll hacia abajo
        document.body.setAttribute("data-scroll-dir", "down");
    }
    lastScrollTop = st <= 0 ? 0 : st;
}, false);



document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});



const whatsappButton = document.getElementById('whatsappButton');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTop.classList.add('show');
        whatsappButton.classList.add('show');
    } else {
        backToTop.classList.remove('show');
        whatsappButton.classList.remove('show');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.list-group-item').forEach(item => {
        const priceLeft = item.querySelector('.price-left');
        const description = item.querySelector('.text-muted');

        if (priceLeft && description) {
            const priceBottom = priceLeft.cloneNode(true);
            priceBottom.classList.remove('price-left');
            priceBottom.classList.add('price-bottom');
            description.insertAdjacentElement('afterend', priceBottom);
        }
    });
});





document.addEventListener('DOMContentLoaded', () => {
    // Tooltips
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));

    // Fecha mínima = hoy
    const fecha = document.getElementById('resFecha');
    if (fecha) {
        const today = new Date();
        fecha.min = today.toISOString().split('T')[0];
    }

    // Activar/desactivar botón según validez
    const form = document.getElementById('formReserva');
    const btn = document.getElementById('btnReservar');

    if (form) {
        form.addEventListener('input', () => {
            btn.disabled = !form.checkValidity();
        });

        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    }
});





document.addEventListener('DOMContentLoaded', () => {
    // ===== Desktop: pausa/reanuda con retardo en tira
    const track = document.getElementById('galleryTrack');
    const desktopShell = track?.closest('.gallery-desktop');

    const isMobile = () => window.matchMedia('(max-width: 360px)').matches;

    if (track && desktopShell) {
        let resumeTimer = null;
        const pause = () => {
            track.style.animationPlayState = 'paused';
            if (resumeTimer) clearTimeout(resumeTimer);
        };
        const resumeWithDelay = (ms = 1800) => {
            if (resumeTimer) clearTimeout(resumeTimer);
            resumeTimer = setTimeout(() => {
                track.style.animationPlayState = 'running';
                resumeTimer = null;
            }, ms);
        };

        const bindDesktopHandlers = () => {
            if (isMobile()) return;
            desktopShell.addEventListener('mouseenter', pause);
            desktopShell.addEventListener('mouseleave', () => resumeWithDelay(1800));
            desktopShell.addEventListener('focusin', pause);
            desktopShell.addEventListener('focusout', () => resumeWithDelay(1800));
        };
        bindDesktopHandlers();
    }

    // ===== Mobile: (opcional) autorun suave
    const mobileCarousel = document.getElementById('galleryMobile');
    if (mobileCarousel && isMobile()) {
        const bsCarousel = new bootstrap.Carousel(mobileCarousel, {
            interval: 3000,   // cambia cada 3s
            ride: 'carousel', // auto
            pause: 'hover',   // pausa en hover/touch
            wrap: true        // infinito
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const modalEl = document.getElementById('galleryModal');
    if (!modalEl) return;
    const modal = new bootstrap.Modal(modalEl);
    const imgEl = document.getElementById('gmImg');
    const titleEl = document.getElementById('gmTitle');
    const descEl = document.getElementById('gmDesc');

    document.querySelectorAll('.gallery-open').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            const src = img.getAttribute('src');
            const title = img.dataset.title || img.alt || '';
            const desc = img.dataset.desc || '';
            imgEl.src = src;
            imgEl.alt = title;
            titleEl.textContent = title;
            descEl.textContent = desc;
            modal.show();
        });
    });

    // Limpia al cerrar
    modalEl.addEventListener('hidden.bs.modal', () => {
        imgEl.src = '';
        imgEl.alt = '';
        titleEl.textContent = '';
        descEl.textContent = '';
    });
});
// 



document.addEventListener('DOMContentLoaded', () => {
    const modalEl = document.getElementById('imgModal');
    if (!modalEl) return;

    const modal = new bootstrap.Modal(modalEl);
    const imgEl = document.getElementById('mImg');

    // Abre el modal al hacer click en cualquier imagen marcada con .history-open
    document.querySelector('.imgModal-head')?.addEventListener('click', (e) => {
        const trigger = e.target.closest('.imgModal-open');
        if (!trigger) return;

        // Evita abrir modal en pantallas pequeñas
        if (window.innerWidth <= 768) return;

        imgEl.src = trigger.getAttribute('src') || '';
        modal.show();
    });

    // Limpia al cerrar
    modalEl.addEventListener('hidden.bs.modal', () => {
        imgEl.src = '';
    });
});

