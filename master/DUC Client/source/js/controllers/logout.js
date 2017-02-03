function LogoutCtrl($scope, $location, AuthenticationService) {
    this.logout = function () {
        AuthenticationService.ClearCredentials();
        $location.path('/login');
    };
};

angular.module('inspinia')
	.controller('LogoutCtrl', ['$scope', '$location', 'AuthenticationService', LogoutCtrl] );