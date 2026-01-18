// Main JavaScript for Portfolio Enhancements

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;

        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    });

    // 2. Active Navigation Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    const observerOptions = {
        threshold: 0.3 // Trigger when 30% of section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 3. Custom Interactive Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    // Only valid for desktop
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            // Subtle delay for follower
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        });

        // Hover effect for links and buttons
        const hoverTargets = document.querySelectorAll('a, button, .project-card, .experience-card');

        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                follower.classList.add('active');
            });
            target.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                follower.classList.remove('active');
            });
        });
    }

    // 4. 3D Tilt Effect
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card, .experience-card, .worked-app-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.05
        });
    }

    // 5. ScrollReveal (Temporarily disabled to fix visibility issues)
    /*
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.fade-in', { duration: 1000, origin: 'bottom', distance: '50px' });
        ScrollReveal().reveal('.project-card', { interval: 200 });
        ScrollReveal().reveal('.experience-card', { interval: 200 });
    }
    */
});
