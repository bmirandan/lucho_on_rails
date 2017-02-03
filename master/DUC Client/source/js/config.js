/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider) {
	//$urlRouterProvider.otherwise("/index/main");

	function lazyLoad($ocLazyLoad)
	{
		return $ocLazyLoad.load([
			{
				files: ['js/plugins/chartJs/Chart.min.js']
                        },
			{
				name: 'angles',
				files: ['js/plugins/chartJs/angles.js']
                        },
			{
				name: 'ui.event',
				files: ['js/plugins/uievents/event.js']
                        },
			{
				name: 'ui.map',
				files: ['js/plugins/uimaps/ui-map.js']
                        },
                        ,
			{
				name: 'datePicker',
				files: ['css/plugins/datapicker/angular-datapicker.css', 'js/plugins/datapicker/angular-datepicker.js']
                        },
			{
				serie: true,
				name: 'angular-chartist',
				files: ['js/plugins/chartist/chartist.min.js', 'css/plugins/chartist/chartist.min.css', 'js/plugins/chartist/angular-chartist.min.js']
                        },
			{
				serie: true,
				name: 'angular-flot',
				files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        }


                    ]);
	}



	$httpProvider.interceptors.push('TokenInjector');

	$urlRouterProvider.otherwise("/login");

	$ocLazyLoadProvider.config({
		// Set to true if you want to see what and when is dynamically loaded
		debug: false
	});

	$stateProvider

		.state('index', {
			abstract: true,
			url: "/index",
			templateUrl: "views/common/content.html",
		})
		.state('index.main', {
			url: "/main",
			templateUrl: "views/main.html",
			data: {
				pageTitle: 'Dashboard'
			},
			resolve: {
				loadPlugin: lazyLoad
			}
		})

	.state('login', {
			url: "/login",
			templateUrl: "views/login.html",
			controller: 'LoginCtrl',
			data: {
				pageTitle: 'Login'
			}
		})
		.state('index.minor', {
			url: "/minor",
			templateUrl: "views/minor.html",
			data: {
				pageTitle: 'Admin'
			}
		})
		.state('index.report', {
			url: "/report",
			templateUrl: "views/report.html",
			controller: "ReportCtrl",
			data: {
				pageTitle: 'Reporte'
			},
			resolve: {
				loadPlugin: lazyLoad
			}
		});
	/*
	    $httpProvider.defaults.useXDomain = true;

	    delete $httpProvider.defaults.headers.common['X-Requested-With'];
	    $httpProvider.defaults.headers.common = {};
	    $httpProvider.defaults.headers.common = {};
	    $httpProvider.defaults.headers.post = {};
	    $httpProvider.defaults.headers.put = {};
	    $httpProvider.defaults.headers.patch = {};
		
		delete $httpProvider.defaults.headers.common['X-Requested-With']; $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*'; $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*'; $httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = '*';*/
}
angular
	.module('inspinia')
	.config(config)
	.run(function ($rootScope, $state, $location, $http) {

		// keep user logged in after page refresh
		$rootScope.globals = {};
		//$rootScope.globals = $cookies.get('globals') || {};
		/*if ($rootScope.globals.currentUser) {
		    $http.defaults.headers.common['x-access-token'] = $rootScope.globals.currentUser.authdata; // jshint ignore:line
		}*/

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
			// redirect to login page if not logged in and trying to access a restricted page
			var restrictedPage = $.inArray($location.path(), ['/login', '/report']) === -1;
			var loggedIn = $rootScope.globals.currentUser;
			if (restrictedPage && !loggedIn) {
				$location.path('/login');
			}
		});

		$rootScope.$state = $state;
	});
angular
	.module('inspinia')
	.constant('APIURL', 'http://localhost:50123/api');