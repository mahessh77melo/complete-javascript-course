import {
  state,
  loadRecipe,
  loadSearchResults,
  loadSearchResultPage,
  alterPage,
  updateServings,
} from './model';
import recipeView from './views/recipeView';
import icons from 'url:../img/icons.svg'; // parcel 2 import
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

// code begins
const recipeContainer = document.querySelector('.recipe');
const searchBtn = document.querySelector('.search__btn');
const searchForm = document.querySelector('.search');

const controlRecipes = async function () {
  try {
    // FETCHING THE hash
    const id = window.location.hash?.slice(1);
    if (!id) return;

    // Loading the recipe (async function)
    recipeView.renderSpinner(recipeContainer);
    await loadRecipe(id);

    // RENDERING THE RECIPE TO THE UI
    recipeView.render(state.recipe);

    // updating the active recipe in the search results
    resultsView.updateActiveRecipe(state.recipe.id);
  } catch (error) {
    recipeView.renderError();
  }
};

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

// function to refresh the pagination and search results accordingly
const controlPagination = function () {
  // render the search results for the current page
  resultsView.renderResults(loadSearchResultPage(state.search.page));

  // render the buttons as per the current page
  paginationView.renderButtons(state.search.page, state.search.results.length);

  // highlighting the active recipe in the search results
  resultsView.updateActiveRecipe(state.recipe.id);
};

// function to update the recipe based on the servings
const controlServings = function (diff) {
  // update the recipe servings (in state)
  updateServings(state.recipe.servings + diff);
  // update the DOM (instead of re-rendering)
  recipeView.update(state.recipe);
};

// initially called function
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  searchBtn.addEventListener('click', controlSearchResults);
  searchForm.addEventListener('submit', controlSearchResults);
};
init();
