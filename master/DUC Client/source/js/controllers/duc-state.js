function DucStateCtrl($scope, DucStateService, DriverService, TruckService) {


	DucStateService.Get().then(function successCallback(response) {

		$scope.ducStates = response.data;

	}, function errorCallback(response) {
		console.log('ducState ERROR', response);
	});

	//Estado (Energía)
	$scope.ParseDucStateMessage = function (connectionState, batteryLevel) {

		if (connectionState == "connected") {
			return "    Dispositivo operativo";
		} else {
			return "    Dispositivo desconectado de la energía del vehículo. " + batteryLevel + "% de batería restante";
		}
	};

	$scope.ParseDucStateClass = function (connectionState) {
		if (connectionState == "connected") {
			return "badge badge-primary";
		} else {
			return "badge badge-danger";
		}
	};

	//Último conducto 
	DriverService.GetAll().then(function successCallback(response) {

		$scope.drivers = response.data;

	}, function errorCallback(response) {
		console.log('drivers ERROR', response);
	});


	$scope.getDriverById = function (driverId) {
		return _.find($scope.drivers, {
			'id': driverId
		});
	};


	//Camión Asignado
	TruckService.Get().then(function successCallback(response) {

		$scope.trucks = response.data;

	}, function errorCallback(response) {
		console.log('trucks ERROR', response);
	});

	$scope.getTruckById = function (truckId) {
		return _.find($scope.trucks, {
			'id': truckId
		});
	};

	//Ultima comunicacion
	$scope.MyHumanize = function (lastDate) {
		return moment(lastDate).format("DD-MM-YYYY HH:mm");
	};

	$scope.ParseDucStateLabel = function (connectionState) {
		if (connectionState == "connected") {
			return " OK ";
		} else {
			return " ALERTA ";
		}
	};

	//pagination
	$scope.paginationNumPerPage = 10;
	$scope.paginationCurrentPage = 1;
	$scope.paginationNumOfElements = 0;
	$scope.paginationGetPageItems = function () {

		var begin = (($scope.paginationCurrentPage - 1) * $scope.paginationNumPerPage);
		var end = begin + $scope.paginationNumPerPage;
		if (angular.isDefined($scope.ducStates)) {
			var paginationElements = $scope.ducStates.slice(begin, end);
			$scope.paginationNumOfElements = paginationElements.length;
			return paginationElements;
		}
	};
	
	//end of pagination


};

angular
	.module('inspinia')
	.controller('DucStateCtrl', ['$scope', 'DucStateService', 'DriverService', 'TruckService', DucStateCtrl]);