var app = angular.module("app", [ 'ui.bootstrap', 'ngRoute', 'ngResource' ]);

// A generic confirmation for risky actions.
// Usage: Add attributes: ng-really-message="Are you sure"? ng-really-click="takeAction()" function
// https://gist.github.com/asafge/7430497
app.directive('ngReallyClick', [function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('click', function() {
        var message = attrs.ngReallyMessage;
        if (message && confirm(message)) {
          scope.$apply(attrs.ngReallyClick);
        }
      });
    }
  }
}]);                  

app.config(function($routeProvider) {
  $routeProvider
  .when('/ingredients', {
    controller : 'IngredientsCtrl',
    templateUrl : 'views/ingredients.html'
  })
  .when('/recipes/search/:substr', {
    controller : 'RecipesCtrlSubstr',
    templateUrl : 'views/recipes.html'
  })
  .when('/recipes/includes/:ingredient', {
    controller : 'RecipesCtrlIncludes',
    templateUrl : 'views/recipes.html'
  })
  .when('/recipes', {
    controller : 'RecipesCtrl',
    templateUrl : 'views/recipes.html'
  })
  .when('/recipes/:id', {
    controller : 'RecipesDetailCtrl',
    templateUrl : 'views/recipesdetail.html'
  })
  .when('/recipes/edit/:id', {
    controller : 'RecipesEditCtrl',
    templateUrl : 'views/recipesedit.html'
  }) 
  .when('/newrecipe', {
    controller : 'RecipesNewCtrl',
    templateUrl : 'views/recipesedit.html'
  })
  .otherwise({
    controller : 'HomeCtrl',
    templateUrl: 'views/home.html'
  });
});

app.controller("HomeCtrl", ['$scope', 'service', '$location', function($scope, service, $location) {
  $scope.selectedIngredients = [];
  $scope.recipeSubstring = "";
  service.getIngredients($scope);
  service.getRecipesNames($scope);
  $scope.pinnedIngredientRemove = function(item, event) {
  };
  $scope.pinnedIngredientAdd = function(item, event) {
    $scope.selectedIngredients.push($scope.ingredientSearchBox);
  };
  $scope.searchRecipesByName = function(item, event) {
    $scope.recipeSubstring = $scope.recipeSearchBox;
    $location.url('/recipes/search/' + $scope.recipeSearchBox);
  };
}]);

app.controller("IngredientsCtrl", ['$scope', 'service', function($scope, service) {
  service.getIngredients($scope);
}]);

app.controller("RecipesCtrl", ['$scope', 'service', function($scope, service) {
  service.getRecipesFull($scope);
}]);

app.controller("RecipesCtrlSubstr", ['$scope', 'service', '$routeParams', '$location', function($scope, service, $routeParams, $location) {
  $scope.recipeSubstring = $routeParams.substr;
  service.getRecipesSubstr($scope, $routeParams.substr, $location);
}]);

app.controller("RecipesCtrlIncludes", ['$scope', 'service', '$routeParams', function($scope, service, $routeParams) {
  $scope.includesIngredients = $routeParams.ingredient;
  service.getRecipesIncludes($scope, $routeParams.ingredient);
}]); 

app.controller("RecipesDetailCtrl", ['$scope', 'service', '$routeParams', function($scope, service, $routeParams) {
  service.getRecipesDetail($scope, $routeParams.id);
}]); 

app.controller("RecipesEditCtrl", ['$scope', 'service', '$routeParams', function($scope, service, $routeParams) {
  service.getRecipesDetail($scope, $routeParams.id);
}]);                                  

app.controller("RecipesNewCtrl", ['$scope', 'service', '$routeParams', function($scope, service) {
  service.getBlankRecipe($scope);
}]);

app.controller("FormController", ['$scope', 'service', '$location', function FormController($scope, service, $location) {
  $scope.editRecipeAddComponent = function(item, event) {
    $scope.recipe.components.push({measure:'', unit:'', ingredient:'', extended:''});
  };
  $scope.editRecipeSubmit = function(item, event) {
    service.saveRecipe($scope, $location); 
  };
  $scope.editRecipeDelete = function(item, event) {
    service.deleteRecipe($scope, $location); 
  };
  $scope.editRecipeCancel = function(item, event) {
    $location.url($scope.recipe._id === void 0
      ? '/'
      : '/recipes/' + $scope.recipe._id);
  };
}]);

app.factory('service', ['$resource', function($resource){
  return new Engine($resource);
}]);

function Engine(resource) {

  this.resource = resource; 

  this.getIngredients = function(scope) {
    var Ingredients = resource('/ingredients');
    Ingredients.query({}, function(ingredients) {
      scope.ingredients = ingredients;
    });
  }

  this.getRecipesNames = function(scope) {
    var Recipes = resource('/recipes');
    Recipes.query({format:"short"}, function(recipes) {
      scope.recipesnames = [];
      for (var i = 0; i < recipes.length; ++i) {
        scope.recipesnames.push(recipes[i].name);
      }
    });
  }

  this.getRecipesFull = function(scope) {
    var Recipes = resource('/recipes');
    Recipes.query({}, function(recipes) {
      scope.recipes = recipes;
    });
  }

  this.getRecipesIncludes = function(scope, ingredient) {
    var Recipes = resource('/recipes');
    Recipes.query({includes:ingredient}, function(recipes) {
      scope.recipes = recipes;
    });
  }

  this.getRecipesSubstr = function(scope, substring, location) {
    console.log("GETRECIPESSUBSTR");
    var Recipes = resource('/recipes');
    Recipes.query({substr:substring}, function(recipes) {
      scope.recipes = recipes;
      if (void 0 !== recipes && recipes.length == 1) {
        location.url("/recipes/" + recipes[0]._id);
      }
    });
  }

  this.getRecipesDetail = function(scope, id) {
    var Recipe = resource('/recipes/:id');
    Recipe.get({id:id}, function(recipe) {
      scope.recipe = recipe;
    });
  }

  this.getBlankRecipe = function(scope) {
    scope.recipe = { name:"", instructions:"", components: [{unit:"", measure:"", ingredient:""}] };
    scope.isNew = true;
  }

  this.deleteRecipe = function(scope, location, window) {
    var Recipe = resource('/recipes/:id', {id: scope.recipe._id});
    var r = new Recipe();
    r.$delete(function(job) {
      if (!job) {
        // TODO: don't think this afctually works
        // window.alert("Delete failed: " + job);
      } else {
        location.url("/recipes");
      }
    });
  };

  this.saveRecipe = function(scope, location) {
    var create = scope.recipe._id === void 0;
    var Recipe = create 
      ? resource('/recipes') 
      : resource('/recipes/:id', {id: scope.recipe._id}, {'update' : {method:'PUT'}});
    var r = create ? new Recipe() : new Recipe(scope.recipe);
    r.name = scope.recipe.name;
    r.instructions = scope.recipe.instructions;
    r.components = [];
    for (var i = 0; i < scope.recipe.components.length; i++) {
      // only send a component if something is set; allows clearing out a component to delete?
      if (scope.recipe.components[i].measure.length > 0
          || scope.recipe.components[i].unit.length > 0
          || scope.recipe.components[i].ingredient.length > 0
          || scope.recipe.components[i].extended.length > 0) {
        r.components.push(scope.recipe.components[i]); 
      }
    }
    var f = function(u, putResponseHeaders) {
      location.url("/recipes/" + u.id);
    };
    if (create) {
      r.$save(f);
    } else {
      r.$update(f);
    }
  };
}
