import icons from 'url:../../img/icons.svg';

class AddRecipeView {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    this._addHandlers();
  }

  // ṣelf explanatory
  toggleHidden() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlers() {
    this._btnOpen.addEventListener('click', this.toggleHidden.bind(this));
    this._btnClose.addEventListener('click', this.toggleHidden.bind(this));
    this._overlay.addEventListener('click', this.toggleHidden.bind(this));
  }

  // exported function - called from controller
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // this is the correct way to destructure the result got from the api
      const dataArray = [...new FormData(this)];
      // the resulting data is an array of key value pairs
      // this can be changed into key value pairs
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }

  _generateMarkup() {
    // function to generate the markup
  }
}
export default new AddRecipeView();
