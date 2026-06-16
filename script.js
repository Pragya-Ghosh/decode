document.addEventListener('DOMContentLoaded', () => {
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
});