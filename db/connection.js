var mongoose = require("mongoose")
var connection = mongoose.connect('mongodb://localhost/recipefinder')

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var IngredientSchema = new Schema(
  {
    name: String
  }
)

var RecipeSchema = new Schema(
  {
    name: String,
    ingredients: [IngredientSchema]
  }
)

mongoose.model("Recipe", RecipeSchema);
mongoose.model("Ingredient", IngredientSchema);
