function ReportCtrl($scope, $location, ReportService) {
	function loadReportParams() {
		var params = $location.search();
		if (!angular.isUndefined(params.rid)) {
			//TODO: buscar en la base de datos el reporte

			
			ReportService.GetById(params.rid).then(function (res) {
				$scope.validParams = true;
				$scope.reportFrecuency = res.data.reportFrecuency;				
				$scope.date = moment(res.data.reportDate).format("YYYY-MM-DD");
			}, function(){
				$scope.validParams = false;
			});

		} else {
			$scope.validParams = false;
		}
	}

	loadReportParams();
};

angular
	.module('inspinia')
	.controller('ReportCtrl', ['$scope', '$location', 'ReportService', ReportCtrl]);