// Copy email to clipboard
function copyEmail(btn) {
    navigator.clipboard.writeText('neigonzalez.ar@gmail.com').then(() => {
        const tooltip = btn.nextElementSibling;
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 2000);
    });
}

// Copy phone to clipboard
function copyPhone(btn) {
    navigator.clipboard.writeText('+54 9 351 391 3288').then(() => {
        const tooltip = btn.nextElementSibling;
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 2000);
    });
}

// Trigger hero overlay animation after panels converge
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.hero').classList.add('loaded');
    }, 2800);
});

// Language switch
function switchLang() {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'index_es.html' || currentPage.includes('_es')) {
        window.location.href = 'index.html';
    } else {
        window.location.href = 'index_es.html';
    }
}

// GitHub placeholder
function githubPlaceholder() {
    alert('Portfolio coming soon');
}

// Toggle mobile menu
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// Close mobile menu
function closeMenu() {
    document.getElementById('navLinks').classList.remove('active');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.getElementById('navbar');

    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !hamburger.contains(e.target) &&
        !navbar.contains(e.target)) {
        closeMenu();
    }
});

// Reset hero animation
let heroResetInProgress = false;

function resetHero() {
    if (heroResetInProgress) return false;
    heroResetInProgress = true;

    const hero = document.getElementById('hero');
    const photoPanel = document.getElementById('photoPanel');
    const infoPanel = document.getElementById('infoPanel');

    // Resetear estado
    hero.classList.remove('loaded');

    // Forzar remoción completa de la animación
    photoPanel.style.animation = 'none';
    infoPanel.style.animation = 'none';
    photoPanel.style.transform = 'translateX(-100vw)';
    infoPanel.style.transform = 'translateX(100vw)';

    // Forzar reflow sincrónico con void operator
    void photoPanel.offsetWidth;
    void infoPanel.offsetWidth;

    // Pequeña pausa para asegurar que el navegador procesó el reflow
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            // Restaurar animaciones
            photoPanel.style.animation = '';
            infoPanel.style.animation = '';
            photoPanel.style.transform = '';
            infoPanel.style.transform = '';

            // Activar loaded después de que las animaciones comiencen
            setTimeout(() => {
                hero.classList.add('loaded');
                heroResetInProgress = false;
            }, 350);
        });
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    return false;
}

// Form validation and AJAX submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = form.querySelector('input[name="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email.value)) {
                email.setCustomValidity('Please enter a valid email address');
                email.reportValidity();
                return;
            }

            email.setCustomValidity('');

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    status.textContent = 'Message sent successfully!';
                    status.style.color = '#4a7c59';
                    form.reset();
                    setTimeout(() => {
                        status.textContent = '';
                    }, 3000);
                } else {
                    status.textContent = 'Something went wrong. Please try again.';
                    status.style.color = '#c0392b';
                }
            } catch (error) {
                status.textContent = 'Something went wrong. Please try again.';
                status.style.color = '#c0392b';
            }
        });
    }
});

// Scroll animations using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.animate-columns, .animate-contact');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
    });

    animateElements.forEach(el => observer.observe(el));

    // Fallback: si algo ya está en viewport al cargar, activarlo inmediatamente
    animateElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('visible');
        }
    });
});
