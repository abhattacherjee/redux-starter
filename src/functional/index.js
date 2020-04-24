import { produce } from "immer";

const recipe = {
  name: "Spaghetti Bolognese",
  ingredients: ["egg", "salt"],
};

function addIngredient(recipe) {
  return ingredient => {
    return produce(recipe, newRecipe => {
      newRecipe.ingredients.push(ingredient);
    });
  };
}

const newRecipe = addIngredient(recipe)("cream");

console.log(recipe);
console.log(newRecipe);
