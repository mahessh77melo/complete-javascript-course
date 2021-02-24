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
const showRecipe = async function () {
  try {
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    const data = await res.json();
    const obj = data.data.recipe;
    // throw an error if the resulting object is not what we expected
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    //  altering the property names
    const recipe = {
      id: obj.id,
      image: obj.image_url,
      cookingTime: obj.cooking_time,
      url: obj.source_url,
      publisher: obj.publisher,
      ingredients: obj.ingredients,
      servings: obj.servings,
      title: obj.title,
    };

    console.log(recipe);
  } catch (error) {
    alert(error);
  }
};
showRecipe();
