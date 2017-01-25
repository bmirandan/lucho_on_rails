var app = angular.module('myApp', ['ngResource', 'ngProgress', 'ngAnimate', 'toaster']);
app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('myHttpInterceptor');
});

// Handle http server errors
app.factory('myHttpInterceptor', function ($q,toaster) {
    return {
        responseError: function (response) {
          console.log(response);
          if(response.data){
            if(response.data.message)
            toaster.error("Error: ", response.data.message);
            else
            toaster.error("Error: ", response.data);
          }
          return $q.reject(response);
        }
    };
});

// Showing loading indicator on top while data is requested from database
app.directive('loading',   ['$http', 'ngProgress', function ($http, ngProgress)
{
    return {
        restrict: 'A',
        link: function (scope, elm, attrs)
        {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v)
            {
                if(v){
                    ngProgress.start();
                }else{
                    ngProgress.complete();
                }
            });
        }
    };
}]);

// Create a resource factory to access offers table from database 
app.factory('Offer', function($resource) {
  return $resource('/api/offers/:id', { id: '@_id' }, {
    update: { // We need to define this method manually as it is not provided with ng-resource
      method: 'PUT'
    }
  });
});

app.controller('MainCtrl', function($scope, srvShareData, $location) {
  
  $scope.dataToShare = [];
  
  $scope.shareMyData = function (myValue) {

    $scope.dataToShare = myValue;
    srvShareData.addData($scope.dataToShare);
    
  }
});

app.controller('MainCtrl2', function($scope, srvShareData) {
  
  $scope.sharedData = srvShareData.getData();

});

app.service('srvShareData', function($window) {
        var KEY = 'App.SelectedValue';

        var addData = function(newObj) {
            var mydata = $window.sessionStorage.getItem(KEY);
            if (mydata) {
                mydata = JSON.parse(mydata);
            } else {
                mydata = [];
            }
            mydata = []
            mydata.push(newObj);
            $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
        };

        var getData = function(){
            var mydata = $window.sessionStorage.getItem(KEY);
            if (mydata) {
                mydata = JSON.parse(mydata);
            }
            return mydata || [];
        };

        return {
            addData: addData,
            getData: getData
        };
    });