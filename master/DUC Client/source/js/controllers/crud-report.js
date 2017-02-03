function CrudReportCtrl($scope, RecipientService, NotifyService) {


	$scope.showAddReportField = function () {
		$scope.addReportVisible = true;
		$scope.newReportEmail = "";
		$scope.newReportName = "";
		$scope.newReportFrecuency = "day";
	};
	$scope.hideAddReportField = function () {
		$scope.addReportVisible = false;
	};
	$scope.addNewReport = function (newReportName, newReportEmail, newReportFrecuency) {
		//TODO: agregar usuario a la base de datos.

		RecipientService.Post({
			name: newReportName,
			email: newReportEmail,
			reportFrecuency: newReportFrecuency
		}).then(function () {
			NotifyService.SuccessCreation("Receptor de reporte");
			$scope.hideAddReportField();
			getRecipients();
		}, function () {
			NotifyService.ErrorCreation("Receptor de reporte");
		});

		
	};


	$scope.editReport = function (reportData, index) {
		$scope.oldReport = reportData;
		$scope.editReportVisible = true;
		
		$scope.reportNameEdit = undefined;
		$scope.reportEmailEdit = undefined;
		$scope.reportFrecuenciaEdit = undefined;
		
		$scope.editingReportIndex = index;
		$scope.reportFrecuencyEdit = reportData.reportFrecuency;
	};

	$scope.reportList = [
		{
			id: 1,
			name: "Periquito Maricieli",
			email: "a@k.cl",
			reportFrecuency: "day"
        },
		{
			id: 4,
			name: "Feliciano ASDF",
			email: "tuetue@quesucede.cl",
			reportFrecuency: "week"
        },
		{
			id: 6,
			name: "Jorgelie Del Carmen",
			email: "jorgelie@asdf.cl",
			reportFrecuency: "month"
        }
    ];

	$scope.cancelReportEdit = function () {
		$scope.editReportVisible = false;
		$scope.oldReport = null;
	};


	$scope.editReportUpdate = function (reportNameEdit, reportEmailEdit, reportFrecuenciaEdit) {
		//TODO: editar usuario.
		//el id del usuario a editar sigue en memoria, oldUser.id
		var reportUpdated = {};
		reportUpdated.id = $scope.oldReport.id;
		
		if(!angular.isUndefined(reportNameEdit))
			reportUpdated.name = reportNameEdit;
		
		if(!angular.isUndefined(reportEmailEdit))
			reportUpdated.email = reportEmailEdit;
		
		if(!angular.isUndefined(reportFrecuenciaEdit))
			reportUpdated.reportFrecuency =reportFrecuenciaEdit;
		
		RecipientService.Put(reportUpdated).then(function(){
			NotifyService.SuccessUpdate("Receptor de reporte");
			getRecipients();
			$scope.cancelReportEdit();
		}, function(){
			
			NotifyService.ErrorUpdate("Receptor de reporte");
		});
		
	};

	$scope.deleteReport = function (deleteId) {
		RecipientService.Delete(deleteId).then(function(){
			NotifyService.SuccessDelete("Receptor de reporte");
			getRecipients();
		}, function(){
			NotifyService.ErrorDelete("Receptor de reporte");
		});
	};

	$scope.getReportFrecuencyLabel = function (reportFrecuency) {
		switch (reportFrecuency) {

		case 'day':
			return "Diario";
		case 'week':
			return "Semanal";
		case 'month':
			return "Mensual";
		}
	};

	function getRecipients() {
		RecipientService.Get().then(function (res) {
			$scope.reportList = res.data;
		});
	}

	getRecipients();
};

angular
	.module('inspinia')
	.controller('CrudReportCtrl', ['$scope', 'RecipientService', 'NotifyService', CrudReportCtrl]);