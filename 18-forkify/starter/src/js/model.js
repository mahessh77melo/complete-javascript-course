import { RECIPE_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
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
    state.search.query = query;
    state.search.results = results.data.recipes.map(rec => ({
      id: rec.id,
      title: rec.title,
      image: rec.image_url,
      publisher: rec.publisher,
    }));
  } catch (error) {
    throw error;
  }
};
