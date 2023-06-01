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
    if (document.querySelectorAll('.upload__ingredient-column').length >= 20) {
      this._btnAddField.style.display = 'none';
    }
  }

  removeField(ev) {
    if (ev.target.closest('.btn--remove-field')) {
      
      ev.target.closest('.upload__ingredient-column').remove();

      if (
        document.querySelectorAll('.upload__ingredient-column').length < 20
      ) {
        this._btnAddField.style.display = 'block';
      }

      const label = document.querySelectorAll(`label.ingredient`);

      this._ingredientNum = label.length;
      // console.log(label.length);
      label.forEach((el, i) => {
        el.textContent = `Ingredient ${i + 1}`;
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
      <div class="upload__ingredient-column">
        <label class="ingredient">Ingredient ${this._ingredientNum}</label>
        <div class="upload__ingredients-wrapper">
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
      </div>
    `;
    this._columnIngredients.insertAdjacentHTML('beforeend', tmpl);
  }
}

export default new addRecipeView();
