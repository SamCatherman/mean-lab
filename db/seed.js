var mongoose = require ('mongoose')
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://10.7.0.3:27107/data/db');


var RecipeModel = require("../models/recipe")
var IngredientModel = require("../models/ingredient")

RecipeModel.remove({}, function(err){
})
IngredientModel.remove({}, function(err){
})

var cake = new RecipeModel({name: "cake"});
var pie = new RecipeModel({name: "pie"});
var strudel = new RecipeModel({name: "strudel"})

var butter = new IngredientModel({name: "butter"})
var flour = new IngredientModel({name: "flour"})
var bakingSoda = new IngredientModel({name: "Baking Soda"})
var sugar = new IngredientModel({name: "sugar"})
var margerine = new IngredientModel({name: "margerine"})
var salt = new IngredientModel({name: "salt"})

var recipes = [cake, pie, strudel]
var ingredients = [butter, flour, bakingSoda, sugar, margerine, salt]

for(var i = 0; i < recipes.length; i++){
  recipes[i].ingredients.push(ingredients[i], ingredients[i+3])
  recipes[i].save(function(err){
    if (err){
      console.log(err)
    } else {
      console.log("recipe was saved")
    }
  })
}
