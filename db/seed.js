var mongoose = require ("./connection")
var seedData = require("./seeds")

var Recipe = mongoose.model("Recipe");
var Ingredient = mongoose.model("Ingredient");

Recipe.remove({}).then(() => {
  Recipe.collection.insert(seedData).then(() => {
    process.exit();
  })
})

Ingredient.remove({}).then(() => {
  Ingredient.collection.insert(seedData).then(() => {
    process.exit();
  })
})
