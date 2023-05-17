import { API_URL, ITEMS_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    itemsPerPage: ITEMS_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
    state.recipe.bookmarked = false;
    }
    // console.log(state.recipe);
  } catch (error) {
    console.log(`${error} 💥 💥 💥`);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.result = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image_url,
        publisher: recipe.publisher,
      };
    });
    // console.log(state.search.result);
  } catch (error) {
    console.log(`${error} 💥 💥 💥`);
    throw error;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.itemsPerPage;
  const end = start + state.search.itemsPerPage;

  return state.search.result.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingr => {
    ingr.quantity = (ingr.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  // console.log(state.recipe)
};

export const deleteBookmark = function (id) {
  // Get bookmark index
  const index = state.bookmarks.findIndex(el => el.id === id);

  // Delete selected bookmark
  state.bookmarks.splice(index, 1);

  // Unmark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;
}