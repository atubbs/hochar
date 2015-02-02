/* think this is it

var app = angular.module('app', ['ngResource', 'ngRoute']);
app.factory('Notes', ['$resource', function($resource) {
return $resource('/notes/:id', null, { 'update': {method:'PUT' }
});
}]);
app.controller('NotesCtrl', ['$scope', '$routeParams', 'Notes',
function($scope, $routeParams, Notes) {
var note = Notes.get({id:$routeParams.id});
$id = note.id;
Notes.update({id:$id}, note);
}]);
*/


/*
var module = angular.module('my.resource', ['ngResource']);
module.factory('Resource', [ '$resource', function($resource) {
  return function(url, params, methods) {
    var defaults = {
      update: { method: 'put', isArray: false },
      create: { method: 'post' }
    };

    methods = angular.extend(defaults, methods);
    var resource = $resource(url, params, methods);

    resource.prototype.$save = function() {
      if (!this.id) {
        return this.$create();
      } else {
        return this.$update();
      }
    };
    return resource;
  };
}]);
  */
var app = angular.module("app", [ 'ui.bootstrap', 'ngRoute', 'ngResource' ]);
//var app = angular.module("app", [ 'ui.bootstrap', 'ngRoute', 'my.resource' ]);

app.config(function($routeProvider) {
  $routeProvider
    .when('/ingredients', {
      controller : 'IngredientsCtrl',
      templateUrl : 'views/ingredients.html'
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
    .otherwise({
      controller : 'HomeCtrl',
      templateUrl: 'views/home.html'
    });
});

app.controller("HomeCtrl", ['$scope', function($scope, service) {			
}]);

app.controller("IngredientsCtrl", ['$scope', 'service', function($scope, service) {
  service.getIngredients($scope);
}]);

app.controller("RecipesCtrl", ['$scope', 'service', function($scope, service) {
  service.getRecipes($scope);
}]);

app.controller("RecipesCtrlIncludes", ['$scope', 'service', '$routeParams', function($scope, service, $routeParams) {
  service.getRecipesIncludes($scope, $routeParams.ingredient);
}]); 

app.controller("RecipesDetailCtrl", ['$scope', 'service', '$routeParams', function($scope, service, $routeParams) {
  service.getRecipesDetail($scope, $routeParams.id);
}]); 

app.controller("RecipesEditCtrl", ['$scope', 'service', '$routeParams', function($scope, service, $routeParams) {
  service.getRecipesDetail($scope, $routeParams.id);
}]);                                  

app.controller("FormController", ['$scope', 'service', '$resource', function FormController($scope, service) {
  $scope.addComponent = function(item, event) {
    // don't need to round-trip for this one
    $scope.recipe.components.push({measure:'', unit:'', ingredient:'', extended:''});
  };
  $scope.submitEditForm = function(item, event) {
    //console.log("--> submitting form");
    //console.log($scope);
    console.log($scope.recipe);
    service.updateRecipesDetail($scope);
  };
}]);
 
app.factory('service', ['$resource', function($resource){
  return new Engine($resource);
}]);
/*app.factory('service', ['Resource', function(Resource){
  return new Engine(Resource);
}]);
*/

function Engine(resource) {

  this.resource = resource; 

  this.getIngredients = function(scope) {
    var Ingredients = resource('/ingredients');
    Ingredients.query({}, function(ingredients) {
      scope.ingredients = ingredients;
    });
  }

  this.getRecipes = function(scope) {
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

  this.getRecipesDetail = function(scope, id) {
    var Recipe = resource('/recipes/:id');
    Recipe.get({id:id}, function(recipe) {
      scope.recipe = recipe;
    });
  }

  this.updateRecipesDetail = function(scope) {
    // TODO: this ngResource shit is shit, just use http
    var Recipe = resource('/recipes/:id', {id: scope.recipe._id}, {'update' : {method:'PUT'}});
    // this works, but ugh; why do I need to GET first?
    var r = Recipe.get({id:scope.recipe._id}, function(recipe) {
      r.name = scope.recipe.name;
      r.instructions = scope.recipe.instructions;
      delete r["components"];
      r.components = [];
      for (var i = 0; i < scope.recipe.components.length; i++) {
        // only send a component if something is set; allows clearing out a component to delete?
        if (scope.recipe.component[i].measure.length > 0
          || scope.recipe.component[i].measure.unit > 0
          || scope.recipe.component[i].measure.ingredient > 0
          || scope.recipe.component[i].measure.extended > 0)
          r.components.push(scope.recipe.components[i]);
      }
      //r.$save();
      r.$update();
      //this.name = scope.recipe.name;
      //recipe.instructions = scope.recipe.instructions;
      //kk
    });



    /*
    console.log("_");
    console.log(Recipe);
    console.log("_");
    Recipe.get({id:scope.recipe._id}, function(scope) {
      scope.$save();
    });
    */
    //for (var k in recipe) Recipe[k] = recipe[k];
    /*console.log(Recipe);
    recipe.$save();*/
    //Recipe.save();
                     /*
    delete recipe["_id"];
    Recipe.$save
    Recipe.$save({id:recipe._id}, 
    */
  };
/*
  this.getRecipesEdit = function(scope, id) {
    var Recipe = resource('/recipes/:id');
    Recipe.get({id:id}, function(recipe) {
      scope.recipe = recipe;
    });
  }  
  */
}

/*
app.controller("UsersCtrl", [ '$scope','service', function($scope, service) {	
	service.getUsers( $scope );		
} ]);

app.controller("NewUserCtrl", [ '$scope','service', function($scope, service) {				
	
	service.getUsers( $scope );	
	
	$scope.createNewUser = function(){
		var newuser = { 'firstname':$scope.firstname, 'lastname': $scope.lastname, 'address':$scope.address, 'email':$scope.email };
		// Call service to create a new user
		//
		service.createUser ( newuser, $scope );
					
		// Push new user to existing table column
		//
		$scope.users.push( newuser );
		// Reset fields values
		//
		$scope.firstname='';
		$scope.lastname='';
		$scope.address='';
		$scope.email='';
	};		
} ]);

app.controller("UsersByIdCtrl", [ '$scope','service', '$routeParams', function($scope, service, $routeParams) {	
	service.getUser($routeParams.userId, $scope);	
} ]);
*/ 



   /*
     this.createUser = function ( user, scope ) {
  // 
  // Save Action Method
  //
  var User = resource('/users/new');		
  User.save(user, function(response){
  scope.message = response.message;
  });		
  }

  this.getUser = function ( id, scope ) {
  //
  // GET Action Method
  //
  var User = resource('/users/:userId', {userId:'@userId'});
  User.get( {userId:id}, function(user){
  scope.user = user;
  })
  }
  */  

  /*
     this.getUsers = function( scope ) {
//
// Query Action Method
//
var Users = resource('/users/all');
Users.query(function(users){
scope.users = users;
});
}
*/ 

 /*
	$routeProvider.when('/users/new', {
		controller : 'NewUserCtrl',
		templateUrl : 'views/newuser.html'
	}).when('/users/:userId', {
		controller : 'UsersByIdCtrl',
		templateUrl : 'views/userbyid.html'	
	}).when('/users', {
		controller : 'UsersCtrl',
		templateUrl : 'views/users.html'	
        }).when('/ingredients', {
                controller : 'IngredientsCtrl',
                templateUrl : 'views/ingredients.html'
	}).otherwise({
		controller : 'HomeCtrl',
		templateUrl: 'views/spahome.html'
    });
});
*/ 
