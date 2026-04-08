const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const carousel = document.querySelector('.story-carousel');

if (carousel) {
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  const prevButton = carousel.querySelector('.carousel-prev');
  const nextButton = carousel.querySelector('.carousel-next');
  let currentSlide = 0;
  let carouselTimer;

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active', slideIndex === currentSlide);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === currentSlide);
    });
  };

  const startCarousel = () => {
    carouselTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 4500);
  };

  const restartCarousel = () => {
    clearInterval(carouselTimer);
    startCarousel();
  };

  prevButton.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    restartCarousel();
  });

  nextButton.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    restartCarousel();
  });

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
      showSlide(dotIndex);
      restartCarousel();
    });
  });

  startCarousel();
}
