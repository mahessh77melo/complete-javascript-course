import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import { SERVINGS_DIFF } from '../config';

class RecipeView {
  // private variables
  #parentElement = document.querySelector('.recipe');
  #errorMessage = 'No search results for your query!';
  #data;

  // parent function for UI rendering
  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    // clearing the recipe container
    this.#clear();
    // inserting the markup without ingredients
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  // DOM updating algorithm
  update(data) {
    this.#data = data;
    // returns the text for the new markup
    const newMarkup = this.#generateMarkup();
    // this creates DOM elements based on the markup we feed
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // newly generated elements
    const newElements = [...newDOM.querySelectorAll('*')];
    // elements currently present in the DOM
    const curElements = [...this.#parentElement.querySelectorAll('*')];

    // checking equality
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // if the new element differs, update it accordingly
      if (
        // also check if the element contains text directly
        !curEl.isEqualNode(newEl) &&
        curEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!curEl.isEqualNode(newEl)) {
        [...newEl.attributes].forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  // clearing the parent element (recipe container)
  #clear() {
    this.#parentElement.innerHTML = '';
  }

  // listening for DOM events
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(e => window.addEventListener(e, handler));
  }

  // event listener to update the servings
  addHandlerServings(handler) {
    this.#parentElement.addEventListener('click', e => {
      const button = e.target.closest('.btn--tiny');
      if (!button) return;
      if (button.classList.contains('btn--decrease-servings')) {
        handler(-SERVINGS_DIFF);
      } else if (button.classList.contains('btn--increase-servings')) {
        handler(SERVINGS_DIFF);
      }
    });
  }

  // event listener to add the bookmark
  addHandlerAddBookmark(handler) {
    this.#parentElement.addEventListener('click', e => {
      const bookmarkButton = e.target.closest('.btn--bookmark');
      if (!bookmarkButton) return;
      this.#data.bookmarked ? handler(true) : handler();
    });
  }

  // loading spinner
  renderSpinner() {
    this.#clear();
    const spinnerMarkup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> `;
    this.#parentElement.insertAdjacentHTML('afterbegin', spinnerMarkup);
  }

  // error message
  renderError(message = this.#errorMessage) {
    this.#clear();
    const errorMarkup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message} Please try again!</p>
      </div>
    `;
    this.#parentElement.insertAdjacentHTML('afterbegin', errorMarkup);
  }

  // generating the main markup for the recipe
  #generateMarkup() {
    const recipe = this.#data;
    return `
        <figure class="recipe__fig">
          <img src="${recipe.image}" alt="${
      recipe.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--decrease-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${
      this.#data.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(this.#generateIngredientMarkup).join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.url}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
  }

  // callback for the map function
  #generateIngredientMarkup(ing) {
    return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                ing.quantity ? new Fraction(ing.quantity).toString() : ''
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>`;
  }
}

// exporting an object instead of exporting the class
export default new RecipeView();
