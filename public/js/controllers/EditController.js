app.controller("EditController", ['$scope', 'employeeService', function($scope, employeeService, $routeParams) {
	employeeService.getEditEmployee(employeeService.currentGuy, $scope);

	$scope.manager = "";
	$scope.name = "";
	$scope.title = "";
	$scope.sex = "";
	$scope.age = "";
	$scope.phoneNum = "";
	$scope.email = "";
	$scope.pictureLink = "";
	$scope.pictureLinkCur= "";
	$scope.oldManager = "";

	$scope.saveEdit = function() {
		if ($scope.pictureLinkCur !== "") {
			$scope.pictureLink = "images/" + $scope.pictureLinkCur;
		}
		employeeService.saveEdit($scope);
	}

    $scope.uploadFile = function(){
        var file = $scope.myFile;
		$scope.pictureLinkCur = file.name;
		console.log($scope.pictureLink);
        console.log('file is ' );
        console.dir(file);
        // var uploadUrl = "/upload";
        employeeService.uploadFileToUrl(file);
    };

}]);
