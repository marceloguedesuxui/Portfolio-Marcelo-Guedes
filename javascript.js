document.addEventListener("DOMContentLoaded", () => {
});

// Animação de Rolagem
const sr = ScrollReveal({
  origin: "top",
  distance: "30px",
  duration: 1300,
  reset: true,
});

sr.reveal(
  `.hero-text, .section-title, .expertise-grid, .about-me-container, .process-grid, .portfolio-header, .portfolio-carousel, .skills-carousel-container, .cta-section`,
  {
    interval: 200,
  },
);
