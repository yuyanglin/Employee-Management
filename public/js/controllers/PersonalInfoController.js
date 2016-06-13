app.controller("PersonalInfoController", ['$scope', 'employeeService', function($scope, employeeService, $routeParams) {
	employeeService.getOneEmployee(employeeService.currentGuy, $scope);

	$scope.getManager = function(str) {
		employeeService.getManager(str, $scope);
	};

	$scope.setManager = function(str) {
		employeeService.manager = str;
	}
}]);
