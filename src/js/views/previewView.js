import View from './View';
import icons from '../../img/icons.svg';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
    <li data-id="${this._data.id}" class="preview">
        <div class="preview__menu 
        ${this._data.key ? '' : 'hidden'}">
          <svg class="preview__menu-icon">
            <use href="${icons}#icon-dots-vertical"></use>
          </svg>
          <div class="preview__action-window hidden">
            <ul class="action-window ${this._data.key ? '' : 'hidden'}">
              <li class="action-window__item">
                <svg class="action-window__icon">
                  <use href="${icons}#icon-delete-outline"></use>
                </svg>
                <span class="action-window__text">delete</span>
              </li>
            </ul>
          </div>
        </div>
        <a class="preview__link ${
          this._data.id === id ? 'preview__link--active' : ''
        }" href="#${this._data.id}">
            <figure class="preview__fig">
               <img src="${this._data.image}" alt="${this._data.title}" />
            </figure>
            <div class="preview__data">
               <h4 class="preview__title">
               ${this._data.title}</h4>
               <p class="preview__publisher">
               ${this._data.publisher}</p>
              <div class="preview__user-generated ${
                this._data.key ? '' : 'hidden'
              }">
                <svg>
                <use href="${icons}#icon-user"></use>
                </svg>
              </div>
              </div>
            </div>
        </a>
    </li>`;
  }
}

export default new PreviewView();
