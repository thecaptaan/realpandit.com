const mobileMenu = document.querySelector('.mobile-menu');

mobileMenu.addEventListener('click', e => {
    e.target.classList.toggle('nav-menu-animate');
    document.querySelector('.nav-container').classList.toggle('active-menu');
    document.querySelector('.nav-links-container').classList.toggle('active-external-link');
})