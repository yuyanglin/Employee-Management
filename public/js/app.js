var app = angular.module("myApp", ['ngRoute', 'infinite-scroll']);
app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		controller: 'MainController',
		templateUrl: 'js/views/main.html'
	})
	.when('/create', {
		controller: 'CreateController',
		templateUrl: 'js/views/create.html'
	})
	.when('/edit', {
		controller: 'EditController',
		templateUrl: 'js/views/edit.html'
	})	
	.when('/personalInfo', {
		controller: 'PersonalInfoController',
		templateUrl: 'js/views/personalInfo.html'
	})
	.when('/reportList', {
		controller: 'reportListController',
		templateUrl: 'js/views/reportList.html'
	})
	.when('/childrenList', {
		controller: 'ChildrenListController',
		templateUrl: 'js/views/childrenList.html'
	})	
	.otherwise({
		redirectTo: '/'
     });
});