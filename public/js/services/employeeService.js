app.factory('employeeService', ['$http', function($http) { 
	var obj = {};
	obj.test = "Maji Wolf";
	
	obj.currentGuy = 0;
	obj.guy = null;
	obj.manager = null;

	obj.childrenList = null;

	obj.employeePresent = [];

	obj.newComingId = 0;
	$http.get('/tool')
		.success(function(data) {
			obj.newComingId = data.id;
		});

	obj.getEmployees = function($scope) {
        // $http.get('http://localhost:8888/employees')
        $http.get('/employees')
            .success(function(data) {
                $scope.employees = data;
                $scope.employeePresent = data.slice(0, 7);
                console.log(obj.newComingId);
            });
	}
	
	obj.getOneEmployee = function(id, $scope) {
        // $http.get('http://localhost:8888/employees/' + id)
        $http.get('/employees/' + id)
            .success(function(data) {
                $scope.guy = data;
            });
	}
	obj.getManager = function(str, $scope) {
        $http.get('http://localhost:8888/manager/' + str)
            .success(function(data) {
                $scope.guy = data;
            });
	}

	obj.getChildrenList = function(str, $scope) {
        $http.get('http://localhost:8888/children/' + str)
            .success(function(data) {
                $scope.employees = data;
            });
	}

	obj.getEditEmployee = function(id, $scope) {
        $http.get('http://localhost:8888/employees/' + id)
            .success(function(data) {
                $scope.name = data.name;
                $scope.title = data.title;
                $scope.sex = data.sex;
                $scope.age = data.age;
                $scope.phoneNum = data.phoneNum;
                $scope.email = data.email;
                $scope.manager = data.manager;
                $scope.pictureLink = data.pictureLink;
                $scope.oldManager = data.manager;
            });
	}

	obj.deleteOneEmployee = function(employee) {
		$http.delete('http://localhost:8888/employees/' + employee.id);
		$http.put('http://localhost:8888/children/' + employee.name);
		$http.get('http://localhost:8888/manager/' + employee.manager)
			.success(function(data) {
				var array = data.children;
				var index = array.indexOf(employee.id);
				if (index > -1) {
					array.splice(index, 1);
				}
				var content = {"children" : array};
				$http.put('http://localhost:8888/manager/' + employee.manager, content);
			});
	}

	obj.saveEdit = function($scope, employee) {
			var data = {
			"name" : $scope.name,
			"title" : $scope.title,
			"age" : $scope.age,
			"sex" : $scope.sex,
			"phoneNum" : $scope.phoneNum,
			"pictureLink" : $scope.pictureLink,
			"email" : $scope.email,
			"manager" : $scope.manager
		}
		$http.post('http://localhost:8888/employees/' + obj.currentGuy, data);
		// Delete from the old manager
		$http.get('http://localhost:8888/manager/' + $scope.manager)
			.success(function(data) {
				var array = data.children;
				var index = array.indexOf(obj.currentGuy);
				if (index > -1) {
					array.splice(index, 1);
				}
				var content = {"children" : array};
				$http.put('http://localhost:8888/manager/' + $scope.oldManager, content);
			});
		$http.post('http://localhost:8888/manager/' + $scope.manager, {"id" : obj.currentGuy});
		console.log($scope.manager);
	}

	obj.saveChange = function($scope) {
		var content = {
			"id" :  ++obj.newComingId,
			"name" : $scope.name,
			"title" : $scope.title,
			"age" : $scope.age,
			"sex" : $scope.sex,
			"phoneNum" : $scope.phoneNum,
			"pictureLink" : "images/" + $scope.pictureLink,
			"email" : $scope.email,
			"reportNum" : 0,
			"manager" : $scope.manager,
			"children" : []
		}
		$http.post('http://localhost:8888/employees', content);
		$http.post('http://localhost:8888/manager/' + $scope.manager, {"id" : content.id});
	}

    obj.uploadFileToUrl = function(file){
        var fd = new FormData();
        fd.append('file', file);
        $http.post('/upload', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }

	return obj;

}]);