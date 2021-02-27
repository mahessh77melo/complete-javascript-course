import { RECIPE_URL, RESULTS_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
  },
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${RECIPE_URL}/${id}`);
    const obj = data.data.recipe;
    //  altering the property names
    state.recipe = {
      id: obj.id,
      title: obj.title,
      image: obj.image_url,
      publisher: obj.publisher,
      cookingTime: obj.cooking_time,
      url: obj.source_url,
      ingredients: obj.ingredients,
      servings: obj.servings,
    };
    console.log(state.recipe);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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
