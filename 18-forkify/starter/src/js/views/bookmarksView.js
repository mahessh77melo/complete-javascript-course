import icons from 'url:../../img/icons.svg';

class BookMarksView {
  #parentElement = document.querySelector('.bookmarks__list');
  #data;

  render(data) {
    this.#data = data;
    this.#clear();
    if (!data.length) {
      this.#renderError();
      return;
    }
    this.#data.forEach(bk => {
      const markup = this.#generateMarkup(bk);
      this.#parentElement.insertAdjacentHTML('beforeend', markup);
    });
  }

  #renderError() {
    this.#clear();
    const errorMarkup = `
				<div class="message">
					<div>
						<svg>
							<use href="src/img/icons.svg#icon-smile"></use>
						</svg>
					</div>
					<p>
						No bookmarks yet. Find a nice recipe and bookmark it :)
					</p>
				</div>
		`;
    this.#parentElement.insertAdjacentHTML('afterbegin', errorMarkup);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  #generateMarkup(rec) {
    const markup = `
						<li class="preview">
							<a class="preview__link" href="#${rec.id}">
								<figure class="preview__fig">
									<img src="${rec.image}" alt="${rec.title}" />
								</figure>
								<div class="preview__data">
									<h4 class="preview__name">
										${rec.title}
									</h4>
									<p class="preview__author">${rec.publisher}</p>
								</div>
							</a>
						</li>
		`;
    return markup;
  }
  // load bookmarks on page refresh and load
  addBookmarkLoader(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookMarksView();
