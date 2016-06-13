app.controller("CreateController", ['$scope', 'employeeService', function($scope, employeeService, $routeParams) {
	employeeService.getEmployees($scope);

	$scope.manager = "";

	$scope.name = "";
	$scope.title = "";
	$scope.sex = "";
	$scope.age = "";
	$scope.phoneNum = "";
	$scope.email = "";
	$scope.pictureLink = "";

	$scope.setManager = function() {
		console.log($scope.manager);
	}

	$scope.saveChange = function() {
		employeeService.saveChange($scope);
	}

    $scope.uploadFile = function(){
        var file = $scope.myFile;
		$scope.pictureLink = file.name;
		console.log($scope.pictureLink);
        console.log('file is ' );
        console.dir(file);
        // var uploadUrl = "/upload";
        employeeService.uploadFileToUrl(file);
    };

}]);
