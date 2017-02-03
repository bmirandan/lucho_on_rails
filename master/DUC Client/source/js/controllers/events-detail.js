function EventsDetailCtrl($scope, ProcessedEventService, DriverService, VisDataSet) {


	$scope.getDriverById = function (driverId) {
		return _.find($scope.drivers, {
			'id': driverId
		});
	};

	$scope.formatDate = function (rawDate) {
		return moment(rawDate).format("DD/MM/YYYY HH:mm:ss");
	};

	$scope.formatDuration = function (rdate1, rdate2) {
		var date1 = moment(rdate1);
		var date2 = moment(rdate2);
		return date2.diff(date1, 'seconds');
	};

	$scope.finishDateFilter = moment();
	$scope.startDateFilter = moment();

	$scope.selectDriver = function (driver) {
		$scope.selectedDriver = driver;
		$scope.filterEventDetails();
	};

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
			if (typeof $scope.selectedDriver !== 'undefined')
				filterObj.driverId = $scope.selectedDriver.id;


			ProcessedEventService.Get(filterObj).then(function successCallback(response) {
				//console.log(filterObj);
				$scope.processedEvents = response.data;
				generateTimeLineData();

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
		if (angular.isDefined($scope.processedEvents)) {
			var paginationElements = $scope.processedEvents.slice(begin, end);
			$scope.paginationNumOfElements = paginationElements.length;
			return paginationElements;
		}
	};
	//end of pagination


	//timeline

	$scope.defaults = {
		orientation: ['top', 'bottom'],
		autoResize: [true, false],
		showCurrentTime: [true, false],
		showCustomTime: [true, false],
		showMajorLabels: [true, false],
		showMinorLabels: [true, false],
		align: ['left', 'center', 'right'],
		stack: [true, false],

		moveable: [true, false],
		zoomable: [true, false],
		selectable: [true, false],
		editable: [true, false]
	};

	var options = {
		align: 'center', // left | right (String)
		autoResize: true, // false (Boolean)
		editable: false,
		selectable: false,
		// start: null,
		// end: null,
		// height: null,
		// width: '100%',
		// margin: {
		//   axis: 20,
		//   item: 10
		// },
		// min: null,
		// max: null,
		// maxHeight: null,
		orientation: 'bottom',
		padding: 5,
		showCurrentTime: true,
		showMajorLabels: true,
		showMinorLabels: true,
		type: 'box', // dot | point
		// zoomMin: 1000,
		// zoomMax: 1000 * 60 * 60 * 24 * 30 * 12 * 10,
		// groupOrder: 'content'
	};

	var now = moment().minutes(0).seconds(0).milliseconds(0);

	var orderedContent = 'content';
	var orderedSorting = function (a, b) {
		return a.value - b.value;
	};

	$scope.options = angular.extend(options, {
		groupOrder: orderedContent
	});


	$scope.events = {};


	function generateTimeLineData() {
		var itemsObj = [];

		var groups = [];
		//por cada conductor crea un grupo
		_.forEach($scope.selectedDriver == undefined ? $scope.drivers : [$scope.selectedDriver], function (value) {
			groups.push({
				id: value.id,
				content: value.name
			});
		});

		//añade cada evento a la lista de eventos
		_.forEach($scope.processedEvents, function (value) {
			itemsObj.push({
				id: value.id,
				content: "Uso celular",
				group: value.driverId,
				start: value.start,
				end: value.finish
			});
		});

		$scope.data = {
			items: VisDataSet(itemsObj),
			groups: VisDataSet(groups)
		};

	}

	/////////////////////////////////////////////////////////

	$scope.getReportTitleHumanized = function () {

		var title= "Reporte ";
		if($scope.report =="day")
		{	
			title+="diario para el "
			+$scope.startDateFilter.format("LL");
		}
		else if($scope.report=="week")
		{
			title+="semanal entre "
			+$scope.startDateFilter.format("LL")
			+" y "
			+$scope.finishDateFilter.format("LL");
			
		}
		else if($scope.report=="month")
		{
			title+="para "
				+$scope.startDateFilter.format("MMMM [de] YYYY");
		}
		return title;
	};


	function onLoad() {
		DriverService.GetAll().then(function successCallback(response) {

				$scope.drivers = response.data;
				//Modo Reporte
				if (angular.isUndefined($scope.report) || angular.isUndefined($scope.day)) {
					console.log("no report");

				} else {
					$scope.uiLocked = true;
					$scope.dateFilterEvents = "range";
					$scope.startDateFilter = moment($scope.day, 'YYYY-MM-DD');;
					if ($scope.report == "week") {
						$scope.finishDateFilter = $scope.startDateFilter.clone().add(1, 'weeks');
					} else if ($scope.report == "day") {
						$scope.finishDateFilter = $scope.startDateFilter.clone().add(1, 'days');
					}
					else if ($scope.report == "month") {
						$scope.finishDateFilter = $scope.startDateFilter.clone().add(1, 'months');
					}
				}
				$scope.selectDriver();

			},
			function errorCallback(response) {
				console.log('drivers ERROR', response);
			});
	}
	onLoad();

};

angular
	.module('inspinia')
	.controller('EventsDetailCtrl', ['$scope', 'ProcessedEventService', 'DriverService', 'VisDataSet', EventsDetailCtrl]);