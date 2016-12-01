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
app.use(parser.json({extended: true}))

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
  Recipe.findOne({name: req.params.name}).then((candidate) => {
    res.render("recipes-show", {
      recipe: recipe
    })
  })
})

app.listen(app.get("port"), () => {
  console.log("listening on port 4000");
})
