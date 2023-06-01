import View from './View';
import icons from '../../img/icons.svg';
import previewView from './previewView';
import { API_KEY } from '../config';

class RemoveRecipeView extends View {
  _parentElement = document.querySelector('.results');
  _errorMsg = 'Not found!';
  _message = 'Your recipe has been successfully deleted 🔥';

  constructor() {
    super();
    this._addHandlerClick();
  }

  _addHandlerClick() {
    this._parentElement.addEventListener('click', function (ev) {
      const menu = ev.target.closest('.preview__menu');
      if (!menu) return;

      menu.querySelector('.preview__action-window').classList.toggle('hidden');
    });
  }
  addHandlerRemove(handler) {
    this._parentElement.addEventListener('click', function (ev) {
      const btn = ev.target.closest('.action-window__item');
      const preview = ev.target.closest('.preview');

      if (!btn) return;
      if (!API_KEY) return;
      if (!preview) return;
      // console.log(id);
      const id = preview.dataset.id;
      handler(API_KEY, id);
    });
  }

  _generateMarkup() {}
}

export default new RemoveRecipeView();
