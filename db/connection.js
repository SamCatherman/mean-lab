var mongoose = require("mongoose")

var RecipeSchema = new mongoose.Schema(
  {
    name: String,
    ingredient: [IngredientSchema]
  }
)

var IngredientSchema = new mongoose.Schema(
  {
    name: String
  }
)

var Recipe = mongoose.model("Recipe", RecipeSchema);
var Ingredient = mongoose.model("Ingredient", IngredientSchema);

mongoose.connect("mongodb://localhost/recipefinder")

module.exports = {
  Recipe,
  Ingredient
}
