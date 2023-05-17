import * as model from './model';
import bookmarkView from './views/bookmarkView';
import paginationView from './views/paginationView';
import recipeView from './views/recipeView';
import resultView from './views/resultView';
import searchView from './views/searchView';

// For Parcel bilder
/* if (module.hot) {
  module.hot.accept();
} */

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Render spinner function
    recipeView.renderSpinner();

    // Update result view to mark selected search result
    resultView.render(model.getSearchResultPage());

    // Loading recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Render spinner function
    resultView.renderSpinner();

    // Load search result
    await model.loadSearchResults(query);

    // Render search result
    // resultView.render(model.state.search.result);
    resultView.render(model.getSearchResultPage(1));

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
    resultView.renderError(error);
  }
};

const controlPagination = function (goToPage) {
  try {
    // Render new result
    resultView.render(model.getSearchResultPage(goToPage));

    // Render new pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
    paginationView.renderError(error);
  }
};

const controlServings = function (newSevings) {
  // Update the recipe servings (in state)
  model.updateServings(newSevings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  model.addBookmark(model.state.recipe);
  
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
};
init();
