import { state, loadRecipe } from './model';
import recipeView from './views/recipeView';
import icons from 'url:../img/icons.svg'; // parcel 2 import
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// code begins
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

// api key => 1b72ce05-f020-4c6a-a734-4303be611a13

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    recipeView.renderSpinner(recipeContainer);

    // FETCHING THE hash
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Loading the recipe (async function)
    await loadRecipe(id);

    // RENDERING THE RECIPE TO THE UI
    recipeView.render(state.recipe);
  } catch (error) {
    alert(error);
  }
};

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipes));
