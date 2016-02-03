
/* JavaScript content from js/app.js in folder common */
/**
* Copyright 2015 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var app = angular.module('App', ['ionic','ngRoute']);
app.run(function($rootScope, $location) {
	/**
	 * 
	 */


	$rootScope.AuthRealmChallengeHandler = WL.Client.createChallengeHandler("AuthRealm");
	    
	$rootScope.AuthRealmChallengeHandler.isCustomResponse = function(response) {
		if (!response || !response.responseJSON	|| response.responseText === null) {
			return false;
		}
		if (typeof(response.responseJSON.authStatus) !== 'undefined'){
			return true;
		} else {
			return false;
		}
	};

	$rootScope.AuthRealmChallengeHandler.handleChallenge = function(response) {
		var authStatus = response.responseJSON.authStatus;
		if (authStatus == "credentialsRequired"){
			$rootScope.go( "/login" );
		} else if (authStatus == "complete"){
			$rootScope.AuthRealmChallengeHandler.submitSuccess();
			$rootScope.go( "/home" );
		}
	};
/*
	$rootScope.AuthRealmChallengeHandler.submitLoginFormCallback = function(response) {
	    var isLoginFormResponse = $rootScope.AuthRealmChallengeHandler.isCustomResponse(response);
	    if (isLoginFormResponse){
	    	$rootScope.AuthRealmChallengeHandler.handleChallenge(response);
	    } else {
	    	$rootScope.AuthRealmChallengeHandler.submitSuccess();
			$rootScope.go( "/home" );
	    }
	};*/
	$rootScope.safeApply = function(fn) {
		  var phase = this.$root.$$phase;
		  if(phase == '$apply' || phase == '$digest') {
		    if(fn && (typeof(fn) === 'function')) {
		      fn();
		    }
		  } else {
		    this.$apply(fn);
		  }
		};
	//Función global, se encarga de redireccionar el url de la pagina mediante un path
    $rootScope.go = function(path) {
    	$rootScope.safeApply(function() {
    		$location.path( path );
    	});
    };
});

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/home', {
		templateUrl:'views/home.html'
	})
	.when('/login', {
		templateUrl:'views/login.html',
		controller:'loginController'
	})
	.when('/galery', {
		templateUrl:'views/galery.html',
		controller:'galeryController'
	})
	.when('/carrito', {
		templateUrl:'views/carrito.html'
	})
	.when('/profile', {
		templateUrl:'views/login.html',
		controller:'loginController'
	})
	.when('/galery/cellphone:id', {
		templateUrl:'views/cellphone.html',
		controller:'cellphoneController'
	})
	.otherwise({
		redirectTo: '/home'
	});
}]);