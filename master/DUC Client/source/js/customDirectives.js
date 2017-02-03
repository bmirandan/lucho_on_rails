function eventsMap() {
    return {
        controller: 'EventsMapCtrl',
        templateUrl: 'views/events-map/events-map.html',
        scope: {}

    };
};

function ducState() {
    return {
        controller: 'DucStateCtrl',
        templateUrl: 'views/duc-state/duc-state.html',
        scope: {}
    };
};

function driverRanking() {

    return {
        controller: 'DriverRankingCtrl',
        templateUrl: 'views/driver-ranking/driver-ranking.html',
        scope: {}

    };
};

function eventsDetail() {
    return {
		restrict: 'E',
		scope: {
			report:'=',
			day:'='
		},
        controller: 'EventsDetailCtrl',
        templateUrl: 'views/events-detail/events-detail.html'        
    };
};





function crudTruck() {
    return {
        controller: 'CrudTruckCtrl',
        templateUrl: 'views/crud-truck/crud-truck.html',
        scope: {}
    };
};

function crudReport() {
    return {
        controller: 'CrudReportCtrl',
        templateUrl: 'views/crud-report/crud-report.html',
        scope: {}
    };
};

function crudUsers() {
    return {
        controller: 'CrudUsersCtrl',
        templateUrl: 'views/crud-users/crud-users.html',
        scope: {}
    };
};


function crudDuc() {
    return {
        controller: 'CrudDucCtrl',
        templateUrl: 'views/crud-duc/crud-duc.html',
        scope: {}
    };
};

function ducTruck() {
    return {
        controller: 'DucTruckCtrl',
        templateUrl: 'views/duc-truck/duc-truck.html',
        scope: {}
    };
};


angular
    .module('inspinia')
    .directive('ducState', ducState)
    .directive('eventsMap', eventsMap)
    .directive('driverRanking', driverRanking)
    .directive('eventsDetail', eventsDetail)
    .directive('crudUsers', crudUsers)
    .directive('crudTruck', crudTruck)
    .directive('crudReport', crudReport)
    .directive('crudDuc', crudDuc)
    .directive('ducTruck', ducTruck);