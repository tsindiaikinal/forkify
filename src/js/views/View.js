import icons from '../../img/icons.svg';

export default class View {
  _data;

  /** This is a JSDoc comment quit commnd - "/**" */

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g recipe) 
   * @param {boolean} [render=true] If false, create template string instead of rendering to the DOM 
   * @returns {undefined | string} A template string is returned if render=false
   * @this {Object} View instance
   * @author Oleksii
   * @todo new features
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const tmpl = this._generateMarkup();

    if (!render) return tmpl;

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', tmpl);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const tmpl = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(tmpl);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(newElements)

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(newEl.firstChild);
      // Update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const tmpl = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', tmpl);
  }

  renderError(msg = this._errorMsg) {
    const tmpl = `
    <div class='error'>
    <div>
    <svg>
    <use href='${icons}#icon-alert-triangle'></use>
    </svg>
      </div>
      <p>${msg}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', tmpl);
  }

  renderMessage(msg = this._message) {
    const tmpl = `
    <div class='message'>
    <div>
    <svg>
    <use href='${icons}#icon-smile'></use>
    </svg>
      </div>
      <p>${msg}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', tmpl);
  }
}
