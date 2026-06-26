document.addEventListener('DOMContentLoaded', () => {
    // NAVBAR ACTIVE STATE
    const navLinks = document.querySelectorAll('.nav-links a');
    function setActiveNav() {
        const sections = Array.from(document.querySelectorAll('section[id]'))
            .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top +
                (a.offsetTop - b.offsetTop));

        if (window.scrollY < 100) {
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelector('.nav-links a[href="#home"]')?.classList.add('active');
            return;
        }

        let current = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.5) {
                current = section.id;
            }
        });

        if (!current) current = sections[0].id;
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').endsWith(`#${current}`)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNav, { passive: true });
    window.addEventListener('resize', setActiveNav, { passive: true });
    setActiveNav();



    // SIDEBAR
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar a');

    function toggleSidebar() {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');

        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } 
        else {
            document.body.style.overflow = 'auto';
        }
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSidebar();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', toggleSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', toggleSidebar);
    }
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        });
    });
});

// STARS 
window.addEventListener('load', () => {
    const starfield = document.querySelector('.starfield');
    if (!starfield) return;

    const starCount = 1000;
    const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const docWidth = document.documentElement.clientWidth;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.floor(Math.random() * docWidth) + 'px';
        star.style.top = Math.floor(Math.random() * docHeight) + 'px';
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = (Math.random() * 5) + 's';
        starfield.appendChild(star);
    }
});