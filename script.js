'use strict';

handleOpenAccount();
function handleOpenAccount() {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const btnCloseModal = document.querySelector('.btn--close-modal');
  const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
  const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };
  btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

handleScrollToSection();
function handleScrollToSection() {
  const btnScrolDown = document.querySelector('.btn--scroll-to');
  const section1 = document.querySelector('#section--1');
  btnScrolDown.addEventListener('click', function () {
    section1.scrollIntoView({ behavior: 'smooth' });
  });

  document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();
    if (!e.target.getAttribute('href')) return;
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
}

handleTabContent();
function handleTabContent() {
  let tabs = document.querySelectorAll('.operations__tab');
  const tabContainer = document.querySelector('.operations__tab-container');
  const tabsContent = document.querySelectorAll('.operations__content');
  tabContainer.addEventListener('click', e => {
    let clicked = e.target.closest('.operations__tab');
    if (!clicked) return;
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');
    tabsContent.forEach(t => t.classList.remove('operations__content--active'));
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  });
}

handleNavBlur();
function handleNavBlur() {
  let nav = document.querySelector('.nav');
  function mouseoverEffect(e, opacity) {
    if (e.target.classList.contains('nav__link')) {
      const mouseHover = e.target;
      const links = mouseHover.closest('.nav').querySelectorAll('.nav__link');
      links.forEach(link => {
        if (link !== mouseHover) {
          link.style.opacity = opacity;
        }
      });
    }
  }
  nav.addEventListener('mouseover', e => mouseoverEffect(e, 0.5));
  nav.addEventListener('mouseout', e => mouseoverEffect(e, 1));
}

handleStickyNav();
function handleStickyNav() {
  let nav = document.querySelector('.nav');
  const header = document.querySelector('.header');
  const navHeight = nav.getBoundingClientRect().height;
  function callBakck(entities) {
    let [entity] = entities;
    if (!entity.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  }
  const headerObserver = new IntersectionObserver(callBakck, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  });
  headerObserver.observe(header);
}
seactionRevealEffect();
function seactionRevealEffect() {
  const sections = document.querySelectorAll('.section');

  const revealSection = function (entities, observer) {
    const [entity] = entities;
    if (!entity.isIntersecting) return;
    entity.target.classList.remove('section--hidden');
    observer.unobserve(entity.target);
  };
  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.2,
  });
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
}

handleLazyImage();
function handleLazyImage() {
  const imgs = document.querySelectorAll('[data-src]');
  const loadImg = function (entities, observe) {
    const [entity] = entities;
    if (!entity.isIntersecting) return;

    entity.target.src = entity.target.dataset.src;
    entity.target.addEventListener('load', function () {
      entity.target.classList.remove('lazy-img');
    });
    observe.unobserve(entity.target);
  };

  const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0.5,
  });
  imgs.forEach(img => imgObserver.observe(img));
}

slider();
function slider() {
  const slide = document.querySelectorAll('.slide');
  function goToSlide(sliding) {
    slide.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - sliding)}%)`)
    );
  }

  goToSlide(0);
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let current = 0;

  function next() {
    current++;
    if (current >= slide.length) current = 0;
    goToSlide(current);
    dotsChange(current);
  }
  function pervious() {
    current--;
    if (current < 0) {
      current = slide.length - 1;
    }
    goToSlide(current);
    dotsChange(current);
  }
  btnRight.addEventListener('click', next);
  btnLeft.addEventListener('click', pervious);

  document.addEventListener('keydown', function (e) {
    if (e.code === 'ArrowLeft') pervious();
    if (e.code === 'ArrowRight') next();
  });
  const dotContainer = document.querySelector('.dots');
  function createDots() {
    slide.forEach((_, i) => {
      const value = `<button class="dots__dot" data-slide="${i}"></button>`;
      dotContainer.insertAdjacentHTML('beforeend', value);
    });
  }
  createDots();
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      dotsChange(slide);
    }
  });
  dotsChange(0);
  function dotsChange(active) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(el => el.classList.remove('dots__dot--active'));

    document
      .querySelector(`[data-slide="${active}"]`)
      .classList.add('dots__dot--active');
  }
}
