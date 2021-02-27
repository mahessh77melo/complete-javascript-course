import { state, loadRecipe, loadSearchResults } from './model';
import recipeView from './views/recipeView';
import icons from 'url:../img/icons.svg'; // parcel 2 import
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultsView from './views/resultsView';

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
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function (e) {
  try {
    // very important to prevent the default action
    e.preventDefault();
    const query = resultsView.getQuery();
    if (!query) return;
    // loading the results
    await loadSearchResults(query);
    // render to the UI
    state.search.results.length > 0
      ? resultsView.renderResults(state.search.results)
      : resultsView.renderError();
  } catch (error) {
    resultsView.renderError(error.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchBtn.addEventListener('click', controlSearchResults);
  searchForm.addEventListener('submit', controlSearchResults);
};
init();
