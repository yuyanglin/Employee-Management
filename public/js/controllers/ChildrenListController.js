app.controller("ChildrenListController", ['$scope', 'employeeService', function($scope, employeeService, $routeParams) {
	employeeService.getChildrenList(employeeService.manager ,$scope);
	$scope.setCurrentGuy = function(id) {
		employeeService.currentGuy = id;
	};
	$scope.setManager = function(str) {
		employeeService.getChildrenList(str,$scope);
	}
}]);
