import icons from 'url:../../img/icons.svg';
class ResultsView {
  #resultsContainer = document.querySelector('.results');
  #searchField = document.querySelector('.search__field');
  #searchBtn = document.querySelector('.search__btn');
  #searchForm = document.querySelector('.search');
  #errorMessage = 'No search results for your query!';

  getQuery() {
    return this.#searchField.value;
  }
  #clear() {
    this.#searchField.value = '';
    this.#resultsContainer.innerHTML = '';
  }

  // called from catch block if an error occurs
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
    this.#resultsContainer.insertAdjacentHTML('afterbegin', errorMarkup);
  }

  updateActiveRecipe(id) {
    // preview__link--active
    const currentLinks = [
      ...this.#resultsContainer.querySelectorAll('.preview__link'),
    ];
    // finding the active link based on the id
    const activeLink = currentLinks?.find(
      link => link.getAttribute('href') === `#${id}`
    );
    // removing the active class for all the current links
    currentLinks.forEach(link => {
      link.classList.remove('preview__link--active');
    });
    // adding the active class name
    activeLink?.classList.add('preview__link--active');
  }

  // Event listener for clicking the form
  addHandlerSubmit(handler) {
    this.#searchBtn.addEventListener('click', handler);
  }

  // Event listener for submitting the form
  addHandlerClick(handler) {
    this.#searchForm.addEventListener('submit', handler);
  }

  // main function that generates the UI
  renderResults(recipes) {
    this.#clear();
    recipes.forEach(rec => {
      const markup = `
					<li class="preview">
            <a class="preview__link" href="#${rec.id}">
              <figure class="preview__fig">
                <img src="${rec.image}" alt="${rec.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${rec.title}</h4>
                <p class="preview__publisher">${rec.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
		`;
      this.#resultsContainer.insertAdjacentHTML('beforeend', markup);
    });
  }
}
// exporting an object of the class
export default new ResultsView();
