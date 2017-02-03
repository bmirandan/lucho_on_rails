function EventsMapCtrl($scope, ProcessedEventService, DriverService) {

	var eventsPosition = [];
	var infowindow = new google.maps.InfoWindow({});

	DriverService.GetAll().then(function (res) {
		$scope.drivers = res.data;
	});

	

	//filters: last-day, last-week, all, range
	$scope.datefilterEvents = 'last-week';

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
				filterObj.ffinish = f_finish.format('YYYY-MM-DDd');;
			if (typeof $scope.selectedDriver !== 'undefined')
				filterObj.driverId = $scope.selectedDriver.id;


			ProcessedEventService.Get(filterObj).then(function successCallback(response) {
				//console.log(filterObj);
				$scope.processedEvents = response.data;
				eventsPosition = getLatLngArrayFromProcessedEvents($scope.processedEvents);
				updateMap();
			}, function errorCallback(response) {
				console.log('ProcessedEventService ERROR', response);
			});

		}
	};

	//establece modo y limpia datos de otro modo
	$scope.setMapMode = function (mapMode) {
		$scope.mapMode = mapMode;
		//TODO: cargar mapa
		updateMap();

	};

	$scope.showHeatmap = function () {
		$scope.heatmap = new google.maps.visualization.HeatmapLayer({
			data: eventsPosition
		});
		$scope.heatmap.setMap($scope.myMap);
	};

	$scope.showMarkers = function () {

		$scope.myMarkers = [];
		_.forEach(eventsPosition, function (position) {
			var marker = new google.maps.Marker({
				map: $scope.myMap,
				position: position
			});
			marker.idProcessedEvent = position.idProcessedEvent;
			marker.addListener('click', function () {
				infowindow.setContent( getContentByProcessedEventId(marker.idProcessedEvent));
				infowindow.open($scope.myMap, marker);
			});
			$scope.myMarkers.push(marker);
		});
	};

	$scope.getMapModeString = function (mapMode) {
		if (mapMode == 'markers')
			return 'Marcadores';
		if (mapMode == 'heatmap')
			return "Mapa de calor";
	};
	
	function getContentByProcessedEventId(id)
	{
		var event = _.find($scope.processedEvents, {
			'id': id
		});
		
		return "<b>Conductor: </b> " + $scope.getDriverById(event.driverId).name + "<br/>"+
			"<b>Duración:</b> "+ $scope.formatDuration(event.start, event.finish)+" segundos"+"<br/>"+
			"<b>Fecha:</b> "+$scope.formatDate(event.start)+"<br/>";
			
	}

	function updateMap() {
		if (!angular.isUndefined($scope.heatmap)) {
			$scope.heatmap.setMap(null);
			$scope.heatmap = undefined;
		}
		if (!angular.isUndefined($scope.myMarkers)) {
			_.forEach($scope.myMarkers, function (m) {
				m.setMap(null);
			});
			$scope.myMarkers = undefined;
		}
		if ($scope.mapMode == 'markers') {
			$scope.showMarkers();
		}

		if ($scope.mapMode == 'heatmap') {
			$scope.showHeatmap();
		}
	}

	function getLatLngArrayFromProcessedEvents(processedEvents) {
		var positions = [];
		_.forEach(processedEvents, function (e) {
			var position = new google.maps.LatLng(e.lat, e.long);
			position.idProcessedEvent = e.id;
			positions.push(position);
		});
		return positions;
	}

	//no usada, depende del tipo de dato que se tenga almacenado
	function GetLatLngFromDMHCoords(Nort, East) {

		var P1LatLng = new google.maps.LatLng({
			lat: -22.39343,
			lng: -68.91208
		});

		var P1Meters = {
			E: 9240,
			N: 24006
		};

		var OffsetN = google.maps.geometry.spherical.computeOffset(P1LatLng, Nort - P1Meters.N, 0);
		var OffsetNE = google.maps.geometry.spherical.computeOffset(OffsetN, East - P1Meters.E, 90);

		return OffsetNE;
	}

	//puede ser markers o heatmap
	$scope.selectDriver();
	$scope.setMapMode('markers');
	$scope.mapOptions = {
		zoom: 14,

		center: new google.maps.LatLng(-22.378571349325455, -68.91215085983276),
		mapTypeId: google.maps.MapTypeId.SATELLITE
	};

};

angular
	.module('inspinia')
	.controller('EventsMapCtrl', ['$scope', 'ProcessedEventService', 'DriverService', EventsMapCtrl]);