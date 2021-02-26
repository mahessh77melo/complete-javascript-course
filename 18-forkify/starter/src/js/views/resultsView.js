import icons from 'url:../../img/icons.svg';
class ResultsView {
  #resultsContainer = document.querySelector('.results');
  #searchField = document.querySelector('.search__field');
  #errorMessage = 'No search results for your query!';

  getQuery() {
    return this.#searchField.value;
  }
  #clear() {
    this.#searchField.value = '';
    this.#resultsContainer.innerHTML = '';
  }

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
export default new ResultsView();
