import icons from 'url:../../img/icons.svg';
import { RESULTS_PER_PAGE } from '../config';

class PaginationView {
  // private variables
  #parentElement = document.querySelector('.pagination');

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  addButtonHandlers(handler, refresh) {
    this.#parentElement.addEventListener('click', e => {
      const button = e.target.closest('.btn--inline');
      if (!button) return;
      // calls the function that changes the page number
      handler(button.dataset.goto);
      // refresh the UI
      refresh();
    });
  }
  renderButtons(page, resultsLength) {
    // clearing the old UI
    this.#clear();
    // markup for prev page button
    const markupLeft = `
					<button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
          </button>
		`;
    // markup for next page button
    const markupRight = `	
          <button data-goto="${
            page + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
		`;
    // logic for final markup
    let finalMarkup;
    const lastPage = Math.ceil(resultsLength / RESULTS_PER_PAGE);
    console.log(lastPage);
    if (page === 1) {
      // first page
      finalMarkup = markupRight;
    } else if (page === lastPage && lastPage > 1) {
      // last page
      finalMarkup = markupLeft;
    } else {
      // other pages
      finalMarkup = markupLeft + markupRight;
    }
    this.#parentElement.insertAdjacentHTML('afterbegin', finalMarkup);
  }
}
// export an object of this class
export default new PaginationView();
