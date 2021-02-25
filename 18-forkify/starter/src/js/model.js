export const state = {
  recipe: {},
};
export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();
    const obj = data.data.recipe;
    // throw an error if the resulting object is not what we expected
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
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
    alert(error);
  }
};
