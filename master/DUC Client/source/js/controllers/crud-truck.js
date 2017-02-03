function CrudTruckCtrl($scope, TruckService, NotifyService) {

	function getTrucks() {
		TruckService.Get().then(function (res) {
			$scope.truckList = res.data;
		});
	}

	$scope.editTruck = function (truckData, index) {
		$scope.oldTruck = truckData;
		$scope.editTruckVisible = true;
		$scope.truckEdit = "";
		$scope.editingTruckIndex = index;
	};

	$scope.showAddTruckField = function () {
		$scope.addTruckVisible = true;
		$scope.newTruckName = "";
	};

	$scope.hideAddTruckField = function () {
		$scope.addTruckVisible = false;
	};

	$scope.cancelTruckEdit = function () {
		console.log('cancelEdit');


		$scope.editTruckVisible = false;
		$scope.oldTruck = null;
	};

	$scope.addNewTruck = function (truckName) {
		//TODO: agregar usuario a la base de datos.

		TruckService.Post({
			name: truckName
		}).then(function () {
			NotifyService.SuccessCreation("Vehículo");
			getTrucks();
			$scope.cancelTruckEdit();
		}, function () {
			NotifyService.ErrorCreation("Vehículo");
			getTrucks();
			$scope.cancelTruckEdit();

		});

		$scope.hideAddTruckField();
	};

	$scope.editTruckUpdate = function (truckName) {

		console.log("edit " + truckName);
		//TODO: editar usuario.
		//el id del duc sigue en el objeto truckdata
		
		TruckService.Put({
			id: $scope.oldTruck.id,
			name: truckName
		}).then(function () {
			NotifyService.SuccessUpdate("Vehículo");
			getTrucks();
			$scope.cancelTruckEdit();
		}, function () {
			NotifyService.ErrorUpdate("Vehículo");
			getTrucks();
			$scope.cancelTruckEdit();
		});

	};

	$scope.deleteTruck = function (truckId) {
		console.log("Delete " + truckId);
		TruckService.Delete(truckId).then(function () {
			NotifyService.SuccessDelete("Vehículo");
			getTrucks();
			$scope.cancelTruckEdit();

		}, function () {
			NotifyService.ErrorDelete("Vehículo");
			getTrucks();
			$scope.cancelTruckEdit();

		});
	};

	getTrucks();
};


angular
	.module('inspinia')
	.controller('CrudTruckCtrl', ['$scope', 'TruckService', 'NotifyService', CrudTruckCtrl]);