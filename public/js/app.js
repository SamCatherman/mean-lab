angular
  .module("recipeFinder", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory("Recipe", [
    "$resource",
    RecipeFactory
  ])
  .controller("indexController", [
    "Recipe",
    "$state",
    indexControllerFunction
  ])
  .controller("showController", [
    "$state",
    "Recipe",
    "$stateParams",
    showControllerFunction
  ])

function RecipeFactory($resource){
  return $resource("/api/recipes/:name", {}, {
    update: { method: "PUT" }
  })
}

function showControllerFunction($state, Recipe, $stateParams){
  this.recipe = Recipe.get({name: $stateParams.name})
  this.update = function(){
    this.candidate.$update({name: $stateParams.name})
  }
  this.destroy = function(){
    this.recipe.$delete({name: $stateParams.name}).then(function(){
      $state.go("index")
    })
  }
}

function indexControllerFunction(Recipe, $state){
  this.recipes = Recipe.query()
  this.newRecipe = new Recipe()
  this.create = function(){
    this.newRecipe.$save().then(function(recipe){
      $state.go("show", {name: recipe.name})
    })
  }
}

function Router($stateProvider) {
  $stateProvider
    .state("welcome", {
      url: '/',
      templateUrl: "/assets/js/ng-views/welcome.html"
    })
    .state("index", {
      url: '/recipes',
      templateUrl: "/assets/js/ng-views/index.html",
      controller: "indexController",
      controllerAs: "vm"
    })
    .state("show", {
      url: "/recipes/:name",
      templateUrl: "/assets/js/ng-views/show.html",
      controller: "showController",
      controllerAs: "vm"
    })
}
