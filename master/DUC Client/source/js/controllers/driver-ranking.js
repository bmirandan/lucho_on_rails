function DriverRankingCtrl($scope, ProcessedEventService, DriverService, $timeout) {

	$scope.plotLabels = [];
	$scope.plotSeries = [];



	$scope.getDriverById = function (driverId) {
		return _.find($scope.drivers, {
			'id': Number(driverId)
		});
	};

	$scope.finishDateFilter = moment();
	$scope.startDateFilter = moment();

	$scope.updateStartDate = function (a, b) {
		$scope.startDateFilter = b;
		$scope.filterEventDetails();

	};

	$scope.updateFinishDate = function (a, b) {
		$scope.finishDateFilter = b;
		$scope.filterEventDetails();

	};
	//filters: last-day, last-week, all, range
	$scope.dateFilterEvents = 'all';

	$scope.groupedEvents;

	$scope.filterEventDetails = function () {
		var f_finish;
		var f_start;
		if ($scope.dateFilterEvents) {
			switch ($scope.dateFilterEvents) {

			case 'all':
				{
					break;
				}

			case 'last-day':
				{
					f_finish = moment().startOf('day');
					f_start = f_finish.clone().subtract(1, 'days');

					break;
				}

			case 'last-week':
				{
					f_finish = moment().startOf('day');
					f_start = f_finish.clone().subtract(7, 'days');

					break;
				}

			case 'range':
				{
					f_finish = $scope.finishDateFilter;
					f_start = $scope.startDateFilter;
					break;
				}

			}
			var filterObj = {};
			if (f_start)
				filterObj.fstart = f_start.format('YYYY-MM-DD');
			if (f_finish)
				filterObj.ffinish = f_finish.format('YYYY-MM-DD');;



			ProcessedEventService.Get(filterObj).then(function successCallback(response) {
				$scope.processedEvents = response.data;

				$scope.groupedEvents = _.countBy($scope.processedEvents, 'driverId');

				$scope.plotLabels = [];
				$scope.plotSeries = [];

				//datos para el grafico
				_.forIn($scope.groupedEvents, function (value, key) {
					$scope.plotLabels.push($scope.getDriverById(key).name);
					$scope.plotSeries.push(value);
				});

				//datos para la tabla
				$scope.eventsCountPerDriver = [];
				_.forEach($scope.drivers, function (value) {

					//conteo de eventos de conductor en periodo. si no encuentra key, es cero.
					var id_s = value.id.toString();
					var count = _.has($scope.groupedEvents, id_s) ? $scope.groupedEvents[id_s] : 0;
					$scope.eventsCountPerDriver.push({
						name: value.name,
						count: count
					});
					$scope.eventsCountPerDriver = _.orderBy($scope.eventsCountPerDriver, ['count'], ['desc']);

				});

				//necesario para evitar problemas de graficado
				$timeout(function () {
					$scope.horizontalData = {
						labels: $scope.plotLabels,
						series: [$scope.plotSeries]
					};
				}, 300);

			}, function errorCallback(response) {
				console.log('ProcessedEventService ERROR', response);
			});

		}
	};

	//pagination
	$scope.paginationNumPerPage = 10;
	$scope.paginationCurrentPage = 1;
	$scope.paginationNumOfElements = 0;
	$scope.paginationGetPageItems = function () {
		var begin = (($scope.paginationCurrentPage - 1) * $scope.paginationNumPerPage);
		var end = begin + $scope.paginationNumPerPage;
		if (angular.isDefined($scope.eventsCountPerDriver)) {
			var paginationElements = $scope.eventsCountPerDriver.slice(begin, end);
			$scope.paginationNumOfElements = paginationElements.length;
			return paginationElements;
		}

	};
	//end of pagination



	$scope.horizontalOptions = {
		reverseData: true,
		horizontalBars: true,
		axisY: {
			offset: 200
		}

	}



	$scope.isEmpty = function (obj) {
		return _.isEmpty(obj);
	};
	$scope.eventsCustom = {
		draw: function (obj) {
			console.log('redrawing Bar');
			if (obj.type === 'bar') {
				if (obj.value == 12) {
					obj.element.attr({
						style: 'stroke: hsl(3, 50%, 50%);'
					});
				}
			}
		}
	};

	function onLoad() {
		DriverService.GetAll().then(function successCallback(response) {
			console.log('llamo a service');
			$scope.drivers = response.data;
			$scope.filterEventDetails();

		}, function errorCallback(response) {
			console.log('drivers ERROR', response);
		});

	}
	onLoad();
};

angular
	.module('inspinia')
	.controller('DriverRankingCtrl', ['$scope', 'ProcessedEventService', 'DriverService', '$timeout', DriverRankingCtrl]);