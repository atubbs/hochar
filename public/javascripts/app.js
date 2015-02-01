var app = angular.module("app", [ 'ui.bootstrap', 'ngRoute', 'ngResource' ]);

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

app.controller("FormController", function FormController($scope) {
  console.log("FormController did something!");
  
});
 
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
