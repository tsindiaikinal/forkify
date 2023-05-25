import View from './View';
import icons from '../../img/icons.svg';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfuly uploaded 👍';
  _ingredientNum = 3;

  _popupWindow = document.querySelector('.add-recipe-window');
  _btnAddField = document.querySelector('.btn--new-field');
  _btnRemoveField = document.querySelector('.btn--remove-field');
  _columnIngredients = document.querySelector('.upload__ingredients');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _label = document.querySelectorAll(`label.ingredient`);

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this._addHandlerAddNewField();
    this._addHandlerRemoveField();
  }

  controlWindow() {
    this._popupWindow.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  addNewField() {
    this._generateMarkup();
  }

  removeField(ev) {
    if (ev.target.closest('.btn--remove-field')) {
      const fields = ev.target.closest('.upload__ingredients-wrapper').dataset
        .ingredient;

      document.querySelector(`label.${fields}`).remove();
      ev.target.closest('.upload__ingredients-wrapper').remove();

      this._ingredientNum = this._label.length;
      this._label.forEach((el, i) => {
        el.innerHTML = `Ingredient ${i + 1}`;
      });
    }
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.controlWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.controlWindow.bind(this));
    this._overlay.addEventListener('click', this.controlWindow.bind(this));
  }

  _addHandlerAddNewField() {
    this._btnAddField.addEventListener('click', this.addNewField.bind(this));
  }

  _addHandlerRemoveField() {
    this._parentElement.addEventListener('click', this.removeField.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (ev) {
      ev.preventDefault();
      handler(new FormData(this));
    });
  }

  _generateMarkup() {
    this._ingredientNum++;
    const tmpl = `
      <label class="ingredient ingr-${this._ingredientNum}">Ingredient ${this._ingredientNum}</label>
      <div data-ingredient="ingr-${this._ingredientNum}" class="upload__ingredients-wrapper">
        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
        />
        <input
          type="text"
          name="unit"
          placeholder="Unit"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
        />
        <div class="btn--remove-field">&times;</div>
      </div>
    `;
    this._columnIngredients.insertAdjacentHTML('beforeend', tmpl);
  }
}

export default new addRecipeView();
