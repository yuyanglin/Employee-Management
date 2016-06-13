app.controller("MainController", ['$scope', 'employeeService', function($scope, employeeService, $routeParams) {
	
	employeeService.getEmployees($scope);

	$scope.employeePresent= [];
	$scope.counter = 7;
	// $scope.employeePresent = employeeService.employeePresent;
	
	$scope.setCurrentGuy = function(id) {
		employeeService.currentGuy = id;
	};

	$scope.setManager = function(str) {
		employeeService.manager = str;
	};

	$scope.deleteEmployee = function(employee) {
		employeeService.deleteOneEmployee(employee);
		employeeService.getEmployees($scope);
	};

	$scope.loadMore = function() {
		if ($scope.employees.length - $scope.counter <= 4) {
			for (var j = 0; j < $scope.employees.length - $scope.counter; j++) {
				$scope.employeePresent.push($scope.employees[$scope.counter++]);
			}
		} else {
			for (var i = 0; i < 4; i++) {
            	$scope.employeePresent.push($scope.employees[$scope.counter++]);
        	}
		}
	};
}]);
