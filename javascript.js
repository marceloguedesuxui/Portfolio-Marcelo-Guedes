document.addEventListener("DOMContentLoaded", () => {
});

setTimeout(() => {
  const sr = ScrollReveal({
    origin: "top",
    distance: "30px",
    duration: 1300,
    reset: true,
  });

  sr.reveal(
    `.section-title, .about-me-container, .process-grid, .portfolio-header, .portfolio-carousel, .skills-carousel-container, .cta-section`,
    {
      interval: 200,
    },
  );


  sr.reveal('.expertise-card', {
    interval: 150,
    origin: 'bottom', 
    distance: '40px',
  });

  sr.reveal('.mindset-card', {
    interval: 150,
    origin: 'bottom',
    distance: '30px',
    duration: 1500,
  });
}, 4500);
