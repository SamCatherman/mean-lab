var express = require("express");
var app = express();
var parser = require("body-parser");
var hbs = require("express-handlebars");

var mongoose = require("./db/connection");
var Recipe = require("./models/recipe");

app.set("port", process.env.PORT || 4000)
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname: ".hbs",
  partialsDir: "views/",
  layoutsDir: "views/",
  defaultLayout: "layout-main"
}));

app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true}))

app.get("/", (req,res) => {
  res.send("hello, this will be a mean lab soon")
})

app.get("/recipes", function(req,res){
  console.log("hello");
  Recipe.find({}).then(function(recipes){
    res.render("recipes-index", {
      recipes: recipes
    })
  })
})

app.get("/recipes/:name", (req, res) => {
  Recipe.findOne({name: req.params.name}).then((recipe) => {
    res.render("recipes-show", {
      recipe: recipe
    })
  })
})

app.post("/recipes", (req, res) => {
  Recipe.create(req.body.recipe).then(function(recipe){
    res.redirect("/recipes/" + recipe.name)
  })
})

app.post("/recipes/:name/delete", (req, res) => {
  Recipe.findOneAndRemove({name: req.params.name}).then(function(){
    res.redirect("/recipes")
  })
})

app.listen(app.get("port"), () => {
  console.log("listening on port 4000");
})
