function LoginCtrl($scope, $location, AuthenticationService) {
	(function initController() {
		// reset login status
		AuthenticationService.ClearCredentials();
	})();

	$scope.dataLoading = false;
	$scope.loginFailed = false;
	$scope.login =
		function () {
			$scope.dataLoading = true;
			$scope.loginFailed = false;
			AuthenticationService.Login($scope.username, $scope.password).then(function (response) {

					if (response.data.token) {
						AuthenticationService.SetCredentials($scope.username, response.data.token, response.data.isAdmin);
						console.log("loggin succeed");
						$location.path('/index/main');
					} else {
						$scope.loginFailed = true;
						$scope.dataLoading = false;
					}
				},

				function (response) {
					$scope.connectionFailed = true;
					$scope.dataLoading = false;
				}
			);
		};

};

angular.module('inspinia')
	.controller('LoginCtrl', ['$scope', '$location', 'AuthenticationService', LoginCtrl]);