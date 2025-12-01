var typed = new Typed(".text", {
    strings: ["UX/UI Designer", "Product Designer" , "Front-End Developer" , "Web Designer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, { threshold: 0.8 });


const elementsToObserve = document.querySelectorAll( '.progress-line, .read, .contact-icons i, .portfolio-content .row, .home-sci a');

const foto = document.querySelector('#minhaFoto');

elementsToObserve.forEach((el) => observer.observe(el));
observer.observe(foto);










