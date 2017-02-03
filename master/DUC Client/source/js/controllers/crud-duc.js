function CrudDucCtrl($scope, DucService, NotifyService) {

	function UpdateDucList() {
		DucService.Get().then(function (response) {
			$scope.ducList = response.data;

		});
	}

	$scope.editDuc = function (ducData, index) {
		$scope.oldDuc = ducData;
		$scope.editDucVisible = true;
		$scope.ducEdit = "";
		$scope.editingDucIndex = index;
	};

	$scope.showAddDucField = function () {
		$scope.addDucVisible = true;
		$scope.newDucName = "";
	};

	$scope.hideAddDucField = function () {
		$scope.addDucVisible = false;
	};

	$scope.cancelDucEdit = function () {
		console.log('cancelEdit');
		$scope.editDucVisible = false;
		$scope.oldDuc = null;
	};

	$scope.addNewDuc = function (ducName) {
		//TODO: agregar usuario a la base de datos.
		console.log("addNewDuc " + ducName);
		var newduc = {};
		newduc.name = ducName;
		DucService.Post(newduc).then(
			function () {

				UpdateDucList();
				$scope.hideAddDucField();
				NotifyService.SuccessCreation("DUC");
			},
			function () {
				$scope.hideAddDucField();
				NotifyService.ErrorCreation("DUC");
			}
		);


	};

	$scope.editDucUpdate = function (ducName) {
		//NOTE: esta forma me parece horrible, pero al no enviar el duc a editar por parametro, no me queda otra opcion

		console.log("editDucUpdate " + ducName);
		var editedDuc = {};
		editedDuc.id = $scope.oldDuc.id;
		editedDuc.name = ducName;
		//TODO: editar usuario.
		//el id del duc sigue en el objeto truckdata
		DucService.Put(editedDuc).then(function (res) {

				NotifyService.SuccessUpdate("DUC");
				UpdateDucList();
				$scope.cancelDucEdit();
			}, function () {

				NotifyService.ErrorUpdate("DUC");
				$scope.cancelDucEdit();
			}

		);

	};

	$scope.deleteDuc = function (ducId) {
		console.log("deleteDuc: " + ducId);
		DucService.Delete(ducId).then(function () {
			NotifyService.SuccessDelete("DUC");
			UpdateDucList();
		}, function () {
			NotifyService.ErrorDelete("DUC");
			console.log("Error deleteDuc");
		});
	};

	UpdateDucList();
};

angular
	.module('inspinia')
	.controller('CrudDucCtrl', ['$scope', 'DucService', 'NotifyService',
		CrudDucCtrl]);