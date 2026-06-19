document.addEventListener('DOMContentLoaded', () => {

    // STARS
    const heroSection = document.getElementById('home');
    const starCount = 300;
    
    for (let i = 0; i < starCount; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        
        let xy = getRandomPosition(heroSection);
        star.style.left = xy[0] + 'px';
        star.style.top = xy[1] + 'px';
        
        let size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        let duration = Math.random() * 3 + 2;
        let delay = Math.random() * 5;
        star.style.animationDuration = duration + 's';
        star.style.animationDelay = delay + 's';
        
        heroSection.appendChild(star);
    }

    function getRandomPosition(element) {
        let x = element.offsetWidth;
        let y = element.offsetHeight;
        let randomX = Math.floor(Math.random() * x);
        let randomY = Math.floor(Math.random() * y);
        return [randomX, randomY];
    }

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
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNav, { passive: true });
    window.addEventListener('resize', setActiveNav, { passive: true });
    setActiveNav();

    // SIDEBAR LOGIC
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar a');

    // Function to toggle the sidebar open and closed
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        
        // Prevent body scrolling when sidebar is open
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    // Event listeners for the buttons
    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            toggleSidebar();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', toggleSidebar);
    }

    // Close the sidebar if the user clicks outside of it on the overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', toggleSidebar);
    }

    // Automatically close the sidebar when any link inside it is clicked
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        });
    });
});