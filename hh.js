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
  const basketModal = document.querySelector('#basket-modal');
  const basketClose = document.querySelector('#basket-close');
  const basketForm = document.querySelector('#basket-form');
  const basketSummary = document.querySelector('#basket-summary');
  const basketReview = document.querySelector('#basket-review');
  const basketItems = document.querySelector('#basket-items');
  const basketReviewTotal = document.querySelector('#basket-review-total');
  const basketSubmit = document.querySelector('.basket-submit');
  const customerName = document.querySelector('#customer-name');
  const cart = new Map();
  const whatsappNumber = '233559101078';
  let totalItems = 0;
  let totalPrice = 0;

  const getCartLines = () =>
    Array.from(cart.values()).map(
      (item) =>
        `- ${item.product} (${item.size}) x${item.quantity} - GHS${item.quantity * item.price}`
    );

  const openBasketModal = () => {
    if (!basketModal) {
      return;
    }

    basketModal.hidden = false;
    document.body.style.overflow = 'hidden';
    basketReview?.focus();
  };

  const closeBasketModal = () => {
    if (!basketModal) {
      return;
    }

    basketModal.hidden = true;
    document.body.style.overflow = '';
  };

  const updateBasket = () => {
    totalItems = 0;
    totalPrice = 0;

    const items = Array.from(cart.values());
    const lines = items.map((item) => {
      totalItems += item.quantity;
      totalPrice += item.quantity * item.price;

      return `- ${item.product} (${item.size}) x${item.quantity} - GHS${item.quantity * item.price}`;
    });

    basketCount.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
    basketTotal.textContent = `GHS${totalPrice}`;
    basketReviewTotal.textContent = `GHS${totalPrice}`;
    if (basketSubmit) {
      basketSubmit.disabled = !totalItems;
    }
    basketSummary.textContent = lines.length
      ? `${totalItems} ${totalItems === 1 ? 'item' : 'items'} selected. Total: GHS${totalPrice}`
      : 'Your basket is empty.';
    basketItems.innerHTML = '';

    if (items.length) {
      items.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'basket-item';

        const details = document.createElement('div');
        details.className = 'basket-item-details';

        const title = document.createElement('strong');
        title.textContent = `${item.product} (${item.size})`;

        const price = document.createElement('span');
        price.textContent = `GHS${item.price} each`;

        const lineTotal = document.createElement('span');
        lineTotal.textContent = `Line total: GHS${item.quantity * item.price}`;

        details.append(title, price, lineTotal);

        const controls = document.createElement('div');
        controls.className = 'basket-item-controls';

        const decreaseButton = document.createElement('button');
        decreaseButton.type = 'button';
        decreaseButton.className = 'basket-qty';
        decreaseButton.dataset.cartAction = 'decrease';
        decreaseButton.dataset.cartKey = item.key;
        decreaseButton.setAttribute('aria-label', `Remove one ${item.product} ${item.size}`);
        decreaseButton.textContent = '-';

        const quantity = document.createElement('span');
        quantity.className = 'basket-quantity';
        quantity.textContent = item.quantity;

        const increaseButton = document.createElement('button');
        increaseButton.type = 'button';
        increaseButton.className = 'basket-qty';
        increaseButton.dataset.cartAction = 'increase';
        increaseButton.dataset.cartKey = item.key;
        increaseButton.setAttribute('aria-label', `Add one ${item.product} ${item.size}`);
        increaseButton.textContent = '+';

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'basket-remove';
        removeButton.dataset.cartAction = 'remove';
        removeButton.dataset.cartKey = item.key;
        removeButton.textContent = 'Remove';

        controls.append(decreaseButton, quantity, increaseButton, removeButton);
        row.append(details, controls);
        basketItems.append(row);
      });
    } else {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'Your basket is empty.';
      basketItems.append(emptyMessage);
    }

    basketLink.setAttribute(
      'aria-label',
      lines.length
        ? `Open basket review with ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`
        : 'Open basket review'
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
          key,
          product,
          size,
          price: Number(price),
          quantity: 1,
        });
      }

      updateBasket();
    });
  });

  basketItems?.addEventListener('click', (event) => {
    const button = event.target instanceof HTMLElement
      ? event.target.closest('[data-cart-action]')
      : null;

    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    const item = cart.get(button.dataset.cartKey);

    if (!item) {
      return;
    }

    if (button.dataset.cartAction === 'increase') {
      item.quantity += 1;
    }

    if (button.dataset.cartAction === 'decrease') {
      item.quantity -= 1;
    }

    if (button.dataset.cartAction === 'remove' || item.quantity <= 0) {
      cart.delete(item.key);
    }

    updateBasket();
  });

  basketLink.addEventListener('click', (event) => {
    event.preventDefault();

    if (!totalItems) {
      basketSummary.textContent = 'Add at least one product to your basket first.';
    }

    openBasketModal();
  });

  basketClose?.addEventListener('click', closeBasketModal);

  basketModal?.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.closeModal) {
      closeBasketModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && basketModal && !basketModal.hidden) {
      closeBasketModal();
    }
  });

  basketForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!totalItems) {
      basketSummary.textContent = 'Add at least one product to your basket first.';
      return;
    }

    const formData = new FormData(basketForm);
    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const location = String(formData.get('location') || '').trim();

    if (!name || !phone || !location) {
      basketSummary.textContent = 'Please complete your name, phone, and location.';
      return;
    }

    const lines = getCartLines();
    const message = [
      'Hello Husk & Hive, I would like to place an order.',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Location: ${location}`,
      '',
      'Order items:',
      ...lines,
      '',
      `Total: GHS${totalPrice}`,
    ].join('\n');

    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  });

  updateBasket();
}
