import { API_URL, ITEMS_PER_PAGE, API_KEY } from './config';
import { AJAX, trimArray } from './helpers';

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

const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);

    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
    console.log(state.recipe);
  } catch (error) {
    console.log(`${error} 💥 💥 💥`);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);

    state.search.result = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image_url,
        publisher: recipe.publisher,
        ...(recipe.key && { key: recipe.key }),
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

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  // Add bookmark to localeStorage
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // Get bookmark index
  const index = state.bookmarks.findIndex(el => el.id === id);

  // Delete selected bookmark
  state.bookmarks.splice(index, 1);

  // Unmark current recipe as bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  // Remove bookmark with localeStorage
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) {
    state.bookmarks = JSON.parse(storage);
  }
};
init();

// Clear all bookmarks (for develop)
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

export const uploadRecipe = async function (formData) {
  try {
  const dataArr = [...formData];
  const newRecipe = Object.fromEntries(dataArr);

  // Sending data with FormData getAll method. Remove white space
  const quantity = trimArray(formData.getAll('quantity'));
  const unit = trimArray(formData.getAll('unit'));
  const description = trimArray(formData.getAll('description'));

    const ingredients = quantity.map((quantity, i) => {
      if (quantity === '' || unit[i] === '' || description[i] === '')
        throw new Error('All fields must be filled! Please do it 🙂');
      return {
        quantity: quantity ? +quantity : null,
        unit: unit[i],
        description: description[i],
      };
    });

    /* const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient'))
      .map(ing => {
        const ingrArr = ing.map(ingr => ingr.trim());
        console.log(ingrArr);
        if (ingrArr[1] === '')
          throw new Error('All fields must be filled! Please do it 🙂');

        const [quantity, unit, description] = ingrArr;

        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      }); */

    // Creating a new recipe object to send to the server
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    // Sending a personal recipe to the server
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);

    state.recipe = createRecipeObject(data);

    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};
