document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const container = document.querySelector('.carousel-track-container');
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');

    if (!track || !prevButton || !nextButton || !container || !carouselContainer) {
        return;
    }

    const originalSlides = Array.from(track.children).map(slide => slide.cloneNode(true));
    const slideCount = originalSlides.length;

    let isMoving = false;
    let currentIndex = 0;
    let slideWidth = 0;
    let visibleSlides = 0;
    let autoplayInterval = null;
    const AUTOPLAY_SPEED = 2000;

    function initializeCarousel() {
        track.innerHTML = "";
        originalSlides.forEach(slide => track.appendChild(slide));
        
        let allSlides = Array.from(track.children);
        if (allSlides.length === 0) return;

        slideWidth = allSlides[0].offsetWidth;
        if (slideWidth === 0) return;

        visibleSlides = Math.round(container.offsetWidth / slideWidth);

        if (slideCount <= visibleSlides) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
            return;
        } else {
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';
        }

        const endClones = allSlides.slice(0, visibleSlides).map(s => s.cloneNode(true));
        const startClones = allSlides.slice(-visibleSlides).map(s => s.cloneNode(true));

        track.append(...endClones);
        track.prepend(...startClones);

        currentIndex = visibleSlides;
        track.style.transition = 'none';
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        setTimeout(() => {
            track.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    }
    
    function move(direction) {
        if (isMoving) return;
        isMoving = true;
        currentIndex += direction;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(() => {
            move(1);
        }, AUTOPLAY_SPEED);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    track.addEventListener('transitionend', () => {
        isMoving = false;
        
        if (currentIndex >= slideCount + visibleSlides) {
            track.style.transition = 'none';
            currentIndex = visibleSlides;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            track.offsetHeight; 
            track.style.transition = 'transform 0.5s ease-in-out';
        }
        
        if (currentIndex < visibleSlides) {
            track.style.transition = 'none';
            currentIndex = currentIndex + slideCount;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            track.offsetHeight;
            track.style.transition = 'transform 0.5s ease-in-out';
        }
    });

    const handleManualNav = (direction) => {
        stopAutoplay();
        move(direction);
    };

    nextButton.addEventListener('click', () => handleManualNav(1));
    prevButton.addEventListener('click', () => handleManualNav(-1));

    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            stopAutoplay();
            initializeCarousel();
            startAutoplay();
        }, 250);
    });

    initializeCarousel();
    startAutoplay();
});