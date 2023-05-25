import View from './View';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (ev) {
      const btn = ev.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.page;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.result.length / this._data.itemsPerPage
    );
    let currentPage = this._data.page;

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', currentPage);
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', currentPage);
    }

    // Other page
    if (currentPage < numPages) {
      return this._generateMarkupButton('other', currentPage);
    }

    // Page 1, and there are no other pages
    return '';
  }

  _generateMarkupButton(direction, currentPage) {
    const prev = `<button class="btn--inline pagination__btn--prev" data-page="${
      currentPage - 1
    }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>`;
    const next = `<button class="btn--inline pagination__btn--next" data-page="${
      currentPage + 1
    }">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;
    if (direction === 'next') return next;
    if (direction === 'prev') return prev;
    return prev + next;
  }
}

export default new PaginationView();
