require("../db/connection")
var mongoose = require('mongoose')

var IngredientModel = mongoose.model("Ingredient")
module.exports = IngredientModel
