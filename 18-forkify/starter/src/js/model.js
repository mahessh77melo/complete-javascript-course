import { RECIPE_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${RECIPE_URL}${id}`);
    const obj = data.data.recipe;
    //  altering the property names
    state.recipe = {
      id: obj.id,
      image: obj.image_url,
      cookingTime: obj.cooking_time,
      url: obj.source_url,
      publisher: obj.publisher,
      ingredients: obj.ingredients,
      servings: obj.servings,
      title: obj.title,
    };
    console.log(state.recipe);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
