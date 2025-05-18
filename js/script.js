const toggles = document.querySelectorAll('.menu-toggle');
toggles.forEach(toggle => {
    // consistently select the navigation panel related to this toggle
    const nav = toggle.parentElement.querySelector('.mobile-nav');
    const closeBtn = nav.querySelector('.nav-close');

    toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        animateToggle(toggle, nav.classList.contains('open'));
    });

    closeBtn.addEventListener('click', () => {
        nav.classList.remove('open');
        animateToggle(toggle, false);
    });

    // close menu when any link inside nav is clicked
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            animateToggle(toggle, false);
        });
    });
});

function animateToggle(toggle, isOpen) {
    const bars = toggle.querySelectorAll('.bar');
    if (isOpen) {
        bars[0].style.transform = 'rotate(45deg) translateY(7px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translateY(-7px)';
    } else {
        bars[0].style.transform = '';
        bars[1].style.opacity = '';
        bars[2].style.transform = '';
    }
}

// Scroll reveal animation for all pages
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));

// Smooth in-page scroll only on pages with scroll-container
const scrollContainer = document.querySelector('.scroll-container');
if (scrollContainer) {
    document.querySelectorAll('.scroll-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                const containerTop = scrollContainer.getBoundingClientRect().top;
                const elementTop = targetEl.getBoundingClientRect().top;
                const scrollOffset = elementTop - containerTop + scrollContainer.scrollTop;
                scrollContainer.scrollTo({ top: scrollOffset, behavior: 'smooth' });
            }
        });
    });
}

const screenshotItems = document.querySelectorAll('.screenshot-item');
screenshotItems.forEach(item => observer.observe(item));