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
  res.render("recipes-index")
})

app.get("/api/recipes/:name", (req, res) => {
  Recipe.findOne({name: req.params.name}).then((recipe) => {
    res.json(recipe)
  })
})

app.get("/api/recipes", function(req, res){
  console.log("hello");
  Recipe.find({}).then(function(recipes){
    res.json(recipes)
  })
})



app.post("/api/recipes", (req, res) => {
  Recipe.create(req.body.recipe).then(function(recipe){
    res.json(recipe)
  })
})

app.delete("/api/recipes/:name", (req, res) => {
  Recipe.findOneAndRemove({name: req.params.name}).then(function(){
    res.json({success: true})
  })
})

app.put("/api/recipes/:name", function(req, res){
  Recipe.findOneAndUpdate({name: req.params.name},
  req.body, {new: true}).then(function(recipe){
    res.json(recipe)
  })
})

app.listen(app.get("port"), () => {
  console.log("listening on port 4000");
})
