document.addEventListener("DOMContentLoaded", () => {
    const smoother = ScrollSmoother.get();
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    const mobileBtn = document.querySelector('.btn-mobile');
    const btnImg = mobileBtn?.querySelector('img');
    const navList = document.querySelector('.header-menu');

    const iconMenu = "assets/img/icon/icon-mobile-menu.svg";
    const iconClose = "assets/img/icon/icon-mobile-close.svg";

    /*Menu Mobile: Alterna a visiblidade a lista e troca entre 'menu' e 'fechar'.*/
    mobileBtn?.addEventListener('click', () => {
        navList.classList.toggle('show');

        const isMenuOpen = btnImg.getAttribute('src') === iconMenu;
        btnImg.setAttribute('src', isMenuOpen ? iconClose : iconMenu);
    });

    /*Smooth Scroll:  Substitui o pulo nativo do navegador pelo scrollTo do ScrollSmoother.*/
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            if (targetId !== "#" && targetId.startsWith('#')) {
                e.preventDefault();

                smoother.scrollTo(targetId, true, "top top");

                if (navList.classList.contains('show')) {
                    navList.classList.remove('show');
                    btnImg.setAttribute('src', iconMenu);
                }
            }
        });
    });
});