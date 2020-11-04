'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// General components
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const slides = document.querySelectorAll('.slide');
const slideLeft = document.querySelector('.slider__btn--left');
const slideRight = document.querySelector('.slider__btn--right');

// Tab section components
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const contents = document.querySelectorAll('.operations__content');

// Dom elements (sections)
const allSections = [...document.querySelectorAll('.section')];
const sectionFeatures = document.querySelector('#section--1');
const footer = document.querySelector('.footer');
const lazyImages = sectionFeatures.querySelectorAll('img');

// buttons
const btnScroll = document.querySelector('.btn--scroll-to');
const btnsNav = [...document.querySelectorAll('.nav__link')];

// Implementing the popup modal form
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// adding and deleting elements into the DOM
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for advanced analytics and improves user experience <button class="btn btn--close-cookie">Got it!</button>';
message.style.backgroundColor = '#37383d';
setTimeout(() => {
  header.append(message);
  const closeCookie = document.querySelector('.btn--close-cookie');
  closeCookie.addEventListener('click', () => {
    message.remove();
  });
}, 2000);
btnScroll.addEventListener('click', e => {
  sectionFeatures.scrollIntoView();
});
// :fire: of the :fire:
// METHOD 1
// We attach an event listener to every button individually using forEach
/* btnsNav.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    const section = document.querySelector(id);
    section.scrollIntoView();
  });
}); */
// METHOD 2
// Add the event to the common parent element
// identify which element created the event
// then proceed with the href of that target element
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const button = e.target;
    const id = button.getAttribute('href');
    document.querySelector(id)?.scrollIntoView();
  }
});

// Implementing the tabbed component
// Following the event delegation principle to reduce the no. of listeners
tabContainer.addEventListener('click', function (e) {
  // retrieve the ref to the target button
  // also retrieve the button even when the span inside it was clicked
  const tabButton = e.target.closest('.operations__tab');
  // if its not a button, terminate the func
  if (!tabButton.classList.contains('operations__tab')) return;
  // get the data-tab attribute of that button
  const active = tabButton.dataset.tab;
  console.log(active);
  // remove active class from everything
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  contents.forEach(c => c.classList.remove('operations__content--active'));
  // add active class to the concerned components
  tabButton.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${active}`)
    .classList.add('operations__content--active');
});

// Implementing the nav bar hover effect, (all other elements fade when one of them is hovered)
function handleHover(e) {
  // argument e is still the event that comes in as the usual argument
  if (e.target.classList.contains('nav__link')) {
    const target = e.target;
    const siblings = [...nav.querySelectorAll('.nav__link')];
    const logo = nav.querySelector('img');
    // console.log(target, siblings, logo);
    logo.style.opacity = this;
    siblings.forEach(link => (link.style.opacity = this));
    target.style.opacity = '1';
    window.t = target;
  }
}
// mouseover function is 'bind'-ed with 0.5, therefore, the 'this' keyword inside the handleHover function points to 0.5. Same in the case of '1'.
nav.addEventListener('mouseover', handleHover.bind('0.5'));
nav.addEventListener('mouseout', handleHover.bind('1'));

// implementing sticky nav bar with intersection observer api
function stickyNav(e) {
  // console.log(e);
  const [entry] = e;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const navHeight = nav.getBoundingClientRect().height;
const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
observer.observe(header);

// REVEALING ELEMENTS ON SCROLL
function reveal(e) {
  const [entry] = e;
  const target = entry.target;
  console.log(target);
  if (entry.isIntersecting) {
    target.classList.remove('section--hidden');
    sectionObserver.unobserve(target);
    if (target === sectionFeatures) lazyLoader();
  }
}
const sectionObserver = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.25,
});
allSections.forEach(sec => {
  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
});

// LAZY LOADING OF IMAGES
function lazyLoader() {
  lazyImages.forEach(img => {
    img.setAttribute('src', img.dataset.src);
    img.addEventListener('load', function () {
      this.classList.remove('lazy-img');
    });
  });
}

// SLIDER COMPONENT
let sliderState = 0;
function handleSlide(e) {
  sliderState += this;
  // maintain the values between 1 and -1
  if (sliderState > slides.length - 1) sliderState = 0;
  else if (sliderState < 0) sliderState = slides.length - 1;
  // selecting the dots node list
  const dots = [...document.querySelectorAll('.dots__dot')];
  // mathematically calculated
  [...slides].forEach((slide, index) => {
    slide.style.transform = `translateX(${-sliderState + index}00%)`;
  });
  dots.forEach(dot => dot.classList.remove('dots__dot--active'));
  dots[sliderState].classList.add('dots__dot--active');
}
// Insert dots
[...slides].forEach((_, i) => {
  const dot = `<span class="dots__dot" data-slide="${i}"></span>`;
  document.querySelector('.dots').insertAdjacentHTML('beforeend', dot);
});
// order the items initially
handleSlide.call(0);
// Event listeners for buttons
// call the respective 'bind'-ed functions to modify the state of the slider
slideLeft.addEventListener('click', handleSlide.bind(-1));
slideRight.addEventListener('click', handleSlide.bind(1));

//Event listeners for keys
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') handleSlide.call(-1);
  e.key === 'ArrowRight' && handleSlide.call(1);
});
// Navigating with dots
document.querySelector('.dots').addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    sliderState = Number(e.target.dataset.slide);
    handleSlide.call(0);
  }
});

// Are u sure u want to close
// dont annoy the user with this
/* window.addEventListener('beforeunload', e => {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
 */
