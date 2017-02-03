(function () {
	'use strict';

	angular
		.module('inspinia')
		.factory('DucService', DucService);

	DucService.$inject = ['$timeout', '$filter', '$q', '$http', 'APIURL'];

	function DucService($timeout, $filter, $q, $http, APIURL) {

		var endpointUrl = APIURL + '/duc/';

		var service = {};

		service.Get = Get;
		service.Post = Post;
		service.Put = Put;
		service.Delete = Delete;

		function Get(params) {
			//TODO: format params to "YYYY-MM-DD HH:MM"

			var requestUrl = endpointUrl;
			if (params) {
				var urlParams = "?";
				_.forEach(params, function (value, key) {
					urlParams += key + "=" + value + "&";
				});
				requestUrl += urlParams;
			}

			return $http.get(requestUrl);
		}


		function Post(newDuc) {

			return $http.post(endpointUrl, $.param(newDuc), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
		}

		function Put(updatedDuc) {


			var requestUrl = endpointUrl + updatedDuc.id;
			console.log("URL:" + requestUrl + "Params: " + $.param(updatedDuc));
			return $http.put(requestUrl, $.param(updatedDuc), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
		}

		function Delete(ducId) {
			var requestUrl = endpointUrl + ducId;
			return $http.delete(requestUrl);
		}


		return service;
	}
})();

(function () {
	'use strict';

	angular
		.module('inspinia')
		.factory('ReportService', ReportService);

	ReportService.$inject = ['$timeout', '$filter', '$q', '$http', 'APIURL'];

	function ReportService($timeout, $filter, $q, $http, APIURL) {

		var endpointUrl = APIURL + '/report/';

		var service = {};

		service.GetById = GetById;

		function GetById(reportId) {
			return $http.get(endpointUrl+reportId);
		}

		return service;
	}
})();


(function () {
	'use strict';

	angular
		.module('inspinia')
		.factory('RecipientService', RecipientService);

	RecipientService.$inject = ['$timeout', '$filter', '$q', '$http', 'APIURL'];

	function RecipientService($timeout, $filter, $q, $http, APIURL) {

		var endpointUrl = APIURL + '/recipient/';

		var service = {};

		service.Get = Get;
		service.Post = Post;
		service.Put = Put;
		service.Delete = Delete;

		function Get(params) {
			//TODO: format params to "YYYY-MM-DD HH:MM"

			var requestUrl = endpointUrl;
			if (params) {
				var urlParams = "?";
				_.forEach(params, function (value, key) {
					urlParams += key + "=" + value + "&";
				});
				requestUrl += urlParams;
			}

			return $http.get(requestUrl);
		}


		function Post(newDuc) {

			return $http.post(endpointUrl, $.param(newDuc), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
		}

		function Put(updatedDuc) {


			var requestUrl = endpointUrl + updatedDuc.id;
			console.log("URL:" + requestUrl + "Params: " + $.param(updatedDuc));
			return $http.put(requestUrl, $.param(updatedDuc), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
		}

		function Delete(ducId) {
			var requestUrl = endpointUrl + ducId;
			return $http.delete(requestUrl);
		}


		return service;
	}
})();


(function () {
	'use strict';

	angular
		.module('inspinia')
		.factory('UserService', UserService);

	UserService.$inject = ['$timeout', '$filter', '$q', '$http', 'APIURL'];

	function UserService($timeout, $filter, $q, $http, APIURL) {

		var endpointUrl = APIURL + '/user/';

		var service = {};

		service.Get = Get;
		service.Post = Post;
		service.Put = Put;
		service.Delete = Delete;

		function Get(params) {
			//TODO: format params to "YYYY-MM-DD HH:MM"

			var requestUrl = endpointUrl;
			if (params) {
				var urlParams = "?";
				_.forEach(params, function (value, key) {
					urlParams += key + "=" + value + "&";
				});
				requestUrl += urlParams;
			}

			return $http.get(requestUrl);
		}


		function Post(newUser) {

			return $http.post(endpointUrl, $.param(newUser), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
		}

		function Put(updatedUser) {

			var requestUrl = endpointUrl + updatedUser.id;
			console.log("URL:" + requestUrl + "Params: " + $.param(updatedUser));
			return $http.put(requestUrl, $.param(updatedUser), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
		}

		function Delete(userId) {
			var requestUrl = endpointUrl + userId;
			return $http.delete(requestUrl);
		}


		return service;
	}
})();



(function () {
	'use strict';

	angular
		.module('inspinia')
		.factory('TruckService', TruckService);

	TruckService.$inject = ['$timeout', '$filter', '$q', '$http', 'APIURL'];

	function TruckService($timeout, $filter, $q, $http, APIURL) {

		var endpointUrl = APIURL + '/truck/';

		var service = {};

		service.Get = Get;
		service.Post = Post;
		service.Put = Put;
		service.Delete = Delete;

		function Get(params) {
			//TODO: format params to "YYYY-MM-DD HH:MM"

			var requestUrl = endpointUrl;
			if (params) {
				var urlParams = "?";
				_.forEach(params, function (value, key) {
					urlParams += key + "=" + value + "&";
				});
				requestUrl += urlParams;
			}

			return $http.get(requestUrl);
		}


		function Post(newTruck) {

			return $http.post(endpointUrl, $.param(newTruck), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
		}

		function Put(updatedTruck) {

			var requestUrl = endpointUrl + updatedTruck.id;
			console.log("URL:" + requestUrl + "Params: " + $.param(updatedTruck));
			return $http.put(requestUrl, $.param(updatedTruck), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
		}

		function Delete(truckId) {
			var requestUrl = endpointUrl + truckId;
			return $http.delete(requestUrl);
		}


		return service;
	}
})();


(function () {
	'use strict';

	angular
		.module('inspinia')
		.factory('TokenInjector', TokenInjector);

	TokenInjector.$inject = ['$rootScope'];

	function TokenInjector($rootScope) {
		var service = {};

		service.request = request;

		function request(config) {

			if ($rootScope.globals.currentUser) {
				console.log('hay usuario', $rootScope.globals.currentUser.authdata);
				//config.headers = {};
				$rootScope.globals.currentUser.authdata;
				config.headers['x-access-token'] = $rootScope.globals.currentUser.authdata;
			}
			return config;
		}

		return service;
	}
})();

(function () {
	'use strict';

	angular
		.module('inspinia')
		.factory('DucStateService', DucStateService);

	DucStateService.$inject = ['$timeout', '$filter', '$q', '$http', 'APIURL'];

	function DucStateService($timeout, $filter, $q, $http, APIURL) {

		var endpointUrl = APIURL + '/ducState';

		var service = {};

		service.Get = Get;


		function Get(params) {
			//TODO: format params to "YYYY-MM-DD HH:MM"

			var requestUrl = endpointUrl;
			if (params) {
				var urlParams = "?";
				_.forEach(params, function (value, key) {
					urlParams += key + "=" + value + "&";
				});
				requestUrl += urlParams;
			}

			return $http.get(requestUrl);
		}

		return service;
	}
})();


(function () {
	'use strict';

	angular
		.module('inspinia')
		.factory('ProcessedEventService', ProcessedEventService);

	ProcessedEventService.$inject = ['$timeout', '$filter', '$q', '$http', 'APIURL'];

	function ProcessedEventService($timeout, $filter, $q, $http, APIURL) {

		var endpointUrl = APIURL + '/processedEvent';

		var service = {};

		service.Get = Get;
		service.GetAll = GetAll;
		service.GetInPeriod = GetInPeriod;
		service.GetByDriverId = GetByDriverId;


		function Get(params) {
			//TODO: format params to "YYYY-MM-DD HH:MM"

			var requestUrl = endpointUrl;
			if (params) {
				var urlParams = "?";
				_.forEach(params, function (value, key) {
					urlParams += key + "=" + value + "&";
				});
				requestUrl += urlParams;
			}

			return $http.get(requestUrl);
		}


		function GetAll() {
			return $http.get(endpointUrl);
		}

		function GetInPeriod(start, finish) {
			//TODO: format params to "YYYY-MM-DD HH:MM"
			return $http.get(endpointUrl + '?start=' + start + '&finish=' + finish);
		}

		function GetByDriverId(driverId) {
			return $http.get(endpointUrl + '?driverId=' + driverId);
		}

		return service;
	}
})();


(function () {
	'use strict';

	angular
		.module('inspinia')
		.factory('DriverService', DriverService);

	DriverService.$inject = ['$timeout', '$filter', '$q', '$http', 'APIURL'];

	function DriverService($timeout, $filter, $q, $http, APIURL) {

		var endpointUrl = APIURL + '/driver';

		var service = {};


		service.GetAll = GetAll;

		function GetAll() {
			return $http.get(endpointUrl);
		}

		return service;
	}
})();


(function () {
	'use strict';

	angular
		.module('inspinia')
		.factory('AuthenticationService', AuthenticationService);

	AuthenticationService.$inject = ['$http', '$rootScope', '$timeout', 'UserService', '$httpParamSerializer', 'APIURL', '$q'];

	function AuthenticationService($http, $rootScope, $timeout, UserService, $httpParamSerializer, APIURL, $q) {
		var service = {};

		var authURL = APIURL + "/authenticate";
		service.Login = Login;
		service.SetCredentials = SetCredentials;
		service.ClearCredentials = ClearCredentials;

		return service;

		//deferred function
		function Login(username, password) {

			/* Dummy authentication for testing, uses $timeout to simulate api call
			 ----------------------------------------------*/
			/*$timeout(function () {
			    var response;
			    if( (username == "fbalsebres" && password =="1234") ||
			        (username == "rpaco" && password =="1234") ||
			        (username == "gcordova" && password =="1234") ||
			        (username == "dcid" && password =="a2t1i8") ||
			        (username == "fcid" && password == "1234") ||
			        (username == "mogalde" && password == "1234"))
			        {
			            
			            response = { success: true };
			            
			        }
			    else
			        {
			            
			             response = { success: false, message: 'Username or password is incorrect'};
			        }
			             
			             callback(response);
			   
			}, 1000);*/

			/* Use this for real authentication
			 ----------------------------------------------*/
			var deferred = $q.defer();

			$http.post(authURL, $.param({
				username: username,
				password: password
			}), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).
			then(function (response) {
				console.log('llego algo', response);
				deferred.resolve(response);
			}, function (response) {
				console.log('error algo', response);
				deferred.reject(response);
			});
			return deferred.promise;
		}

		function SetCredentials(username, token, isAdmin) {
			var authdata = token;

			$rootScope.globals = {
				currentUser: {
					username: username,
					authdata: authdata,
					isAdmin: isAdmin
				}
			};

			$http.defaults.headers.common['x-access-token'] = authdata; // jshint ignore:line
			//$cookies.put('globals', $rootScope.globals);
		}

		function ClearCredentials() {
			$rootScope.globals = {};
			//$cookies.remove('globals');
			$http.defaults.headers.common['x-access-token'] = '';
		}
	}

})();


(function () {
	'use strict';

	angular
		.module('inspinia')
		.factory('NotifyService', NotifyService);

	NotifyService.$inject = ['notify'];

	function NotifyService(notify) {


		var templatePath = "views/common/notify.html"
		var service = {};

		service.SuccessCreation = SuccessCreation;
		service.SuccessUpdate = SuccessUpdate;
		
		service.SuccessDelete = SuccessDelete;
		service.ErrorCreation = ErrorCreation;
		service.ErrorUpdate = ErrorUpdate;
		service.ErrorDelete = ErrorDelete;
		
		notify.config({ duration:1000, position:"right"});
		

		function SuccessCreation(entityName) {
			var m = entityName + " creado con éxito";
			notify({
				message: m,
				classes: 'alert-success',
				templateUrl: templatePath
			});

		}

		function SuccessUpdate(entityName) {
			var m = entityName + " actualizado con éxito";
			notify({
				message: m,
				classes: 'alert-success',
				templateUrl: templatePath
			});

		}

		function SuccessDelete(entityName) {
			var m = entityName + " eliminado con éxito";
			notify({
				message: m,
				classes: 'alert-success',
				templateUrl: templatePath
			});

		}

		function ErrorCreation(entityName) {
			var m = "Error al crear " + entityName;
			notify({
				message: m,
				classes: 'alert-danger',
				templateUrl: templatePath
			});

		}

		function ErrorUpdate(entityName) {
			var m = "Error al actualizar " + entityName;
			notify({
				message: m,
				classes: 'alert-danger',
				templateUrl: templatePath
			});

		}

		function ErrorDelete(entityName) {
			var m = "Error al eliminar " + entityName;
			notify({
				message: m,
				classes: 'alert-danger',
				templateUrl: templatePath
			});

		}


		return service;
	}
})();