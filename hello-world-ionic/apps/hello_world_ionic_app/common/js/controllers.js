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

app.controller('galeryController', function($rootScope, $scope, cellphonesService, $ionicLoading, $timeout,$ionicPlatform, $location, $ionicHistory) {
	console.log("galeryController");
	/*$scope.loading = $ionicLoading.show({	
		content: '<i class="ion-loading-c"></i> Loading...',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});*/
	$scope.getCellphones = function() {
		$scope.cellphones = [];
		$scope.errorMsg = "";
		cellphonesService().then(function (cellphones) {
			$scope.cellphones = cellphones;
			console.log(cellphones);
			$scope.$broadcast('scroll.refreshComplete');
			$scope.errorMsg = "";
			/*$scope.loading.hide();*/
		},
		function(error) {
			$scope.errorMsg = "Could Not Load feeds";
			$scope.$broadcast('scroll.refreshComplete');
			/*$scope.loading.hide();*/
		});
	};
	$ionicPlatform.registerBackButtonAction(function() {
		$scope.go( "/home" );
    }, 100);
	$scope.getCellphones();
});

app.controller('cellphoneController', function($rootScope, $scope, cellphoneService, $ionicLoading, $timeout,$ionicPlatform, $location, $ionicHistory,$routeParams) {
	console.log("cellphoneController");
	$scope.id= $routeParams.id;
	$scope.loading = $ionicLoading.show({	
		content: '<i class="ion-loading-c"></i> Loading...',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});
	$scope.getCellphone = function() {
		$scope.cellphone = [];
		$scope.errorMsg = "";
		cellphoneService($scope.id).then(function (cellphone) {
			$scope.cellphone = cellphone;
			console.log(cellphone);
			$scope.$broadcast('scroll.refreshComplete');
			$scope.errorMsg = "";
			$scope.loading.hide();
		},
		function(error) {
			$scope.errorMsg = "Could Not Load feeds";
			$scope.$broadcast('scroll.refreshComplete');
			$scope.loading.hide();
		});
	};
	$ionicPlatform.registerBackButtonAction(function() {
		$scope.go( "/galery" );
    }, 100);
	$scope.getCellphone();
});


app.controller('loginController', function($rootScope, $scope, loginService, $ionicLoading, $timeout,$ionicPlatform, $location, $ionicHistory,$routeParams) {
	
	console.log("cellphoneController");
	$scope.user;
	$scope.pass;
	/*$scope.loading = $ionicLoading.show({	
		content: '<i class="ion-loading-c"></i> Loading...',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});*/
	$scope.loginDummy = function(){

		var invocationData = {
			adapter : "auth_adapter",
			procedure : "submitAuthentication",
			parameters : [ $scope.user, $scope.pass ]
		};

		$rootScope.AuthRealmChallengeHandler.submitAdapterAuthentication(invocationData, {});
	}
	$scope.logoutDummy = function(){
		WL.Client.logout('AuthRealm', {onSuccess:  WL.Client.reloadApp});
		$scope.go( "/home" );
	}
	$scope.login = function() {
		$scope.result = [];
		$scope.errorMsg = "";
		loginService($scope.user,$scope.pass).then(function (result) {
			$scope.result = result;
			if(result=="pass"){
				alert("Login satisfactorio");
			}
			else{
				alert("Credenciales incorrectas")
			}
			$scope.$broadcast('scroll.refreshComplete');
			$scope.errorMsg = "";
			/*$scope.loading.hide();*/
		},
		function(error) {
			$scope.errorMsg = "Could Not Load feeds";
			$scope.$broadcast('scroll.refreshComplete');
			/*$scope.loading.hide();*/
		});
	};
	$ionicPlatform.registerBackButtonAction(function() {
		$scope.go( "/home" );
    }, 100);
});


app.controller('MenuController', function($scope,$ionicPlatform, $location, $ionicHistory) {
	console.log("menu-controller");
	$scope.tabSelect = function(selected) {
		$(".tab-item").removeClass("tab-item-active");
		$("#"+selected).addClass("tab-item-active");
	};
	/*$ionicPlatform.registerBackButtonAction(function() {
        navigator.app.exitApp();
    }, 100);*/
});