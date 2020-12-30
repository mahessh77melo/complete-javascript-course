'use strict';
const showButtons = [...document.querySelectorAll('.show-modal')];
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');
const body = document.querySelector('body');

const showModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const hideModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

closeModal?.addEventListener('click', hideModal);
overlay?.addEventListener('click', hideModal);
showButtons.forEach(button => button.addEventListener('click', showModal));
// escape button support
document.addEventListener('keydown', e => {
  console.log(e);
  if (e.key === 'Escape') {
    console.log('escape is pressed');
    hideModal();
  }
});
