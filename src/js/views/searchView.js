class SearchView {
  _parentElement = document.querySelector('.search');

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (ev) {
      ev.preventDefault();
      handler();
    });
  }

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;

    // Clear search field
    this._clearInputField();
    return query;
  }

  _clearInputField() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
