import {
  state,
  loadRecipe,
  loadSearchResults,
  loadSearchResultPage,
  alterPage,
  updateServings,
  addBookmark,
  removeBookmark,
  loadBookmarks,
  uploadNewRecipe,
} from './model';
import icons from 'url:../img/icons.svg'; // parcel 2 import
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

/**
 * Controls the recipe View based on the hash in the url. Also updates the active recipe in the search results.
 */
const controlRecipes = async function () {
  try {
    // FETCHING THE hash
    const id = window.location.hash?.slice(1);
    if (!id) return;

    // Loading the recipe (async function)
    recipeView.renderSpinner();
    await loadRecipe(id);

    // RENDERING THE RECIPE TO THE UI
    recipeView.render(state.recipe);

    // updating the active recipe in the search results
    resultsView.updateActiveRecipe(state.recipe.id);
  } catch (error) {
    recipeView.renderError();
  }
};

/**
 * Controller function for the search results. Refreshes the view according to the search results (if any).
 * @param {*} e - Event
 */
const controlSearchResults = async function (e) {
  try {
    // very important to prevent the default action
    e.preventDefault();
    const query = resultsView.getQuery();
    // if there is now query, end the function
    if (!query) return;
    // loading the results
    await loadSearchResults(query);

    // render to the UI
    state.search.results.length > 0
      ? resultsView.renderResults(loadSearchResultPage(state.search.page))
      : resultsView.renderError();
    // highlighting the active recipe in the search results
    resultsView.updateActiveRecipe(state.recipe.id);

    // render the pagination buttons
    paginationView.renderButtons(
      state.search.page,
      state.search.results.length
    );
    // add the handlers once the UI is generated
    paginationView.addButtonHandlers(alterPage, controlPagination);
  } catch (error) {
    console.log(error);
    resultsView.renderError(error.message);
  }
};

/**
 * Function to refresh the pagination and search results accordingly
 */
const controlPagination = function () {
  // render the search results for the current page
  resultsView.renderResults(loadSearchResultPage(state.search.page));

  // render the buttons as per the current page
  paginationView.renderButtons(state.search.page, state.search.results.length);

  // highlighting the active recipe in the search results
  resultsView.updateActiveRecipe(state.recipe.id);
};

/**
 * Function to update the recipe based on the servings
 * @param {Number} diff The number that has to be added to the old servings count. (either positive or negative)
 */
const controlServings = function (diff) {
  // update the recipe servings (in state)
  updateServings(state.recipe.servings + diff);
  // update the DOM (instead of re-rendering)
  recipeView.update(state.recipe);
};

/**
 * Function to control the bookmarks UI
 * @param {Boolean} remove false by default, but if true, adds the bookmark. If false, removes the recipe from the bookmarks.
 */
const controlBookmarks = function (remove = false) {
  // add bookmark function
  remove ? removeBookmark(state.recipe) : addBookmark(state.recipe);
  // refresh the ui
  recipeView.update(state.recipe);
  console.log(state.recipe);
  bookmarksView.render(state.bookmarks);
};

/**
 * Function to control adding of new recipes thru the api
 * @param {Object} newRecipe - the new recipe object that has to be uploaded.
 */
const controlAddRecipe = async function (newRecipe) {
  try {
    // upload the new recipe via an API request
    await uploadNewRecipe(newRecipe);
    // RENDERING THE RECIPE TO THE UI
    recipeView.render(state.recipe);
    // add the new recipe to bookmarks
    addBookmark(state.recipe);
    // update the bookmarks
    bookmarksView.render(state.bookmarks);
    // change ID in the url
    window.history.pushState(null, '', `#${state.recipe.id}`);
    // close the window
    addRecipeView.toggleHidden();
  } catch (error) {
    alert(error);
  }
};

/**
 * Function to load and render the localStorage bookmark
 */
const loadLocalStorageBookmarks = function () {
  loadBookmarks();
  bookmarksView.render(state.bookmarks);
};

/**
 * Function that is initially called. This sets up everything for the effective functioning of the code.
 */
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmarks);
  bookmarksView.addBookmarkLoader(loadBookmarks);
  resultsView.addHandlerSubmit(controlSearchResults);
  resultsView.addHandlerClick(controlSearchResults);
  window.addEventListener('load', loadLocalStorageBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
