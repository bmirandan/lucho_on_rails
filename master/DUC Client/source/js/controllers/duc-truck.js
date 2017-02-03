function DucTruckCtrl($scope) {

    $scope.showAddMappingField = function () {
        $scope.addMappingVisible = true;
        $scope.newMappingTruck = "";
        $scope.newMappingDuc = "";
    };
    $scope.addNewMapTruckDuc = function (newMappingTruck, newMappingDuc) {
        //TODO: agregar usuario a la base de datos.
        $scope.hideAddMappingField();
    };

    $scope.hideAddMappingField = function () {
        $scope.addMappingVisible = false;
    };

    $scope.mappingList = [
        {
            id: 1,
            truckName: "301",
            ducName: "Caja A"
        },
        {
            id: 4,
            truckName: "304",
            ducName: "Caja Z"
        }
    ];

    $scope.editMapping = function (mappingData, index) {
        $scope.oldMapping = mappingData;
        $scope.editMappingVisible = true;
        $scope.truckNameEdit = "";
        $scope.truckNameEdit = "";
        $scope.editingMappingIndex = index;
    };




    $scope.cancelMappingEdit = function () {
        $scope.editMappingVisible = false;
        $scope.oldMapping = null;
    };



    $scope.editMappingUpdate = function (truckName, ducName) {

        //TODO: editar usuario.
        //el id del usuario a editar sigue en memoria, oldUser.id
        $scope.cancelMappingEdit();
    };
    $scope.deteleMapping = function (mappingId) {
        //TODO: eliminar usuario
    }

};


angular
    .module('inspinia')
    .controller('DucTruckCtrl', ['$scope', DucTruckCtrl]);