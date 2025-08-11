// Custom interactivity + animations + tooltips/popovers
document.addEventListener('DOMContentLoaded', () => {
  // IntersectionObserver for reveal animations
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target);} });
  }, {threshold:.18});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Bootstrap tooltips & popovers
  [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].forEach(el => new bootstrap.Tooltip(el));
  [...document.querySelectorAll('[data-bs-toggle="popover"]')].forEach(el => new bootstrap.Popover(el));
});