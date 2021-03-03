import { API_KEY, API_LINK, RECIPE_URL, RESULTS_PER_PAGE } from './config';
import { getJSON, sendJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
  },
  bookmarks: [],
};

/**
 * Returns a recipe object based on the parameters given to it.
 * @param {*} obj
 */
const createRecipe = function (obj) {
  return {
    id: obj.id,
    title: obj.title,
    image: obj.image_url,
    publisher: obj.publisher,
    cookingTime: obj.cooking_time,
    url: obj.source_url,
    ingredients: obj.ingredients,
    servings: obj.servings,
    bookmarked: isBookmarked(obj),
    // the following line will add the key property if and only there is one
    ...(obj.key && { key: obj.key }),
  };
};
/**
 * Fetches the recipe from the api and alters the state after converting it into a JS object.
 * @param {*} id
 */
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${RECIPE_URL}/${id}`);
    const obj = data.data.recipe;
    //  altering the property names
    state.recipe = createRecipe(obj);
    console.log(state.recipe);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const isBookmarked = function (rec) {
  const res = state.bookmarks.filter(item => item.id === rec.id);
  return res.length > 0 ? true : false;
};

/**
 * Sends request to the api for the given query and alters the state with the results it got.
 * @param {*} query
 */
export const loadSearchResults = async function (query) {
  try {
    const results = await getJSON(`${RECIPE_URL}?search=${query}`);
    // store the query for further use
    state.search.query = query;
    // reset the page number
    state.search.page = 1;
    // store the results in the state object
    state.search.results = results.data.recipes.map(rec => ({
      id: rec.id,
      title: rec.title,
      image: rec.image_url,
      publisher: rec.publisher,
    }));
    console.log(state.search);
  } catch (error) {
    throw error;
  }
};

/**
 * Returns the approptiate results based on the current page number.
 * @param {*} page
 */
export const loadSearchResultPage = function (page = state.search.page) {
  const start = (page - 1) * RESULTS_PER_PAGE;
  const end = page * RESULTS_PER_PAGE;
  // return the items according to the current page
  return state.search.results.slice(start, end);
};

export const alterPage = function (num) {
  // alter the current page number
  state.search.page = parseInt(num);
  console.log(state.search);
};

export const updateServings = function (newServings) {
  if (newServings < 1) return;
  // update the quantity for each ingredient in the recipe
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  // Add the bookmarks to the state
  state.bookmarks.push(recipe);
  // mark the current recipe as bookmarked
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  saveBookmarks();
};

export const removeBookmark = function (recipe) {
  // remove the bookmarks from the state
  state.bookmarks = state.bookmarks.filter(rec => rec.id !== recipe.id);
  // set bookmarked to false
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
  saveBookmarks();
};

const saveBookmarks = function () {
  localStorage.setItem('forkifyBookmarks', JSON.stringify(state.bookmarks));
};

/**
 * Fetches the existing bookmarks that are stored in the browser's Local Storage.
 */
export const loadBookmarks = function () {
  let existingBookmarks = localStorage.forkifyBookmarks;
  if (!existingBookmarks) return;
  existingBookmarks = JSON.parse(existingBookmarks);
  state.bookmarks = existingBookmarks;
};

/**
 * Function to upload a new recipe. Sends a POST request to the api with the given object and the key. Also sets the returned object as the state's current recipe.
 * @param {*} newRecipe
 */
export const uploadNewRecipe = async function (newRecipe) {
  const ingredients = Object.entries(newRecipe).filter(
    entry => entry[0].startsWith('ingredient') && entry[1] !== ''
  );
  const ingredientObjects = ingredients.map(ing => {
    const str = ing[1];
    const ingArray = str.split(',').map(el => el.trim());
    if (ingArray.length !== 3)
      throw new Error(
        'Wrong entry format, please follow the correct format for best results!'
      );
    const [quantity, unit, description] = ingArray;
    return { quantity: quantity ? +quantity : null, unit, description };
  });
  const recipeObj = {
    title: newRecipe.title,
    image_url: newRecipe.image,
    source_url: newRecipe.sourceUrl,
    publisher: newRecipe.publisher,
    servings: +newRecipe.servings,
    cooking_time: +newRecipe.cookingTime,
    isBookmarked: true,
    ingredients: ingredientObjects,
  };
  const returnData = await sendJSON(`${RECIPE_URL}?key=${API_KEY}`, recipeObj);
  // set this as the current recipe
  state.recipe = createRecipe(returnData.data.recipe);
  console.log(returnData);
};
