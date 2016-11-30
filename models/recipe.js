require("../db/connection")
var mongoose = require('mongoose')

var RecipeModel = mongoose.model("Recipe")
module.exports = RecipeModel
