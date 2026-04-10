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

const basketLink = document.querySelector('#basket-link');

if (basketLink) {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const basketCount = document.querySelector('#basket-count');
  const basketTotal = document.querySelector('#basket-total');
  const cart = new Map();
  const whatsappNumber = '233559101078';

  const updateBasket = () => {
    let itemCount = 0;
    let totalPrice = 0;

    const lines = Array.from(cart.values()).map((item) => {
      itemCount += item.quantity;
      totalPrice += item.quantity * item.price;

      return `- ${item.product} (${item.size}) x${item.quantity} - GHS${item.quantity * item.price}`;
    });

    basketCount.textContent = `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`;
    basketTotal.textContent = `GHS${totalPrice}`;

    const message = lines.length
      ? `Hello Husk & Hive, I would like to order:\n${lines.join('\n')}\n\nTotal: GHS${totalPrice}`
      : 'Hello Husk & Hive, I would like to place an order.';

    basketLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    basketLink.setAttribute(
      'aria-label',
      lines.length
        ? `Send basket order on WhatsApp with ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`
        : 'Send basket order on WhatsApp'
    );
  };

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const { product, size, price } = button.dataset;
      const key = `${product}-${size}`;
      const existingItem = cart.get(key);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.set(key, {
          product,
          size,
          price: Number(price),
          quantity: 1,
        });
      }

      updateBasket();
    });
  });

  updateBasket();
}
