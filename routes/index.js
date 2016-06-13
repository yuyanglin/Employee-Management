var express = require('express');
var router = express.Router();

var mongoose   = require('mongoose');

mongoose.connect('mongodb://root:password@olympia.modulusmongo.net:27017/umaJej2o');
var Employees = require('./mongo/models/employees');

var multer  = require('multer');
var upload = multer({ dest: './public/images/' });


/* GET home page. */
router.get('/', function(req, res, next) {
  		res.send("Maji Wolf");
	});

router.get('/sheep', function(req, res) {
	res.json("This is the Sheep");
});

router.route('/employees')
	.get(function(req, res) {
		Employees.find()
	    	.sort({id : 1})
	    	.exec(function(err, employees) {
	            if (err) {
	                res.send(err);
	            }
	            res.json(employees);
	    	});
	})
	.post(function(req, res) {
		var employee = new Employees();      // create a new instance of the Bear model

	  	employee.id = req.body.id || "";
	  	employee.name = req.body.name || "";
	  	employee.title = req.body.title || "";
	  	employee.sex = req.body.sex || "";
	  	employee.age = req.body.age || "";
	  	employee.phoneNum = req.body.phoneNum || "";
	  	employee.pictureLink = req.body.pictureLink || "";
	  	employee.email = req.body.email || "";
	  	employee.reportNum = req.body.reportNum || "";
	  	employee.manager = req.body.manager || "";
	  	employee.children = req.body.children || "";

	  	employee.save(function(err) {
	    	if (err) {
	        	res.send(err);
	      	}
	      	res.json({ message: 'Maji Wolf'});
	  	});
	});

router.route('/employees/:id')
  	// Edit the Selected Employee Information
	.post(function(req, res) {
		Employees.findOne({"id" : req.params.id}, function(err, employee) {
			if (err) {
				res.send(err);
			}
		  	employee.name = req.body.name != "" ? req.body.name : employee.name;
		  	employee.title = req.body.title != "" ? req.body.title : employee.title;
		  	employee.sex = req.body.sex != "" ? req.body.sex : employee.sex;
		  	employee.age = req.body.age != "" ? req.body.age : employee.age;
		  	employee.phoneNum = req.body.phoneNum != "" ? req.body.phoneNum : employee.phoneNum;
		  	employee.pictureLink = req.body.pictureLink != "" ? req.body.pictureLink : employee.pictureLink;
		  	employee.email = req.body.email != "" ? req.body.email : employee.email;
		  	employee.reportNum = req.body.reportNum != "" ? req.body.reportNum : employee.reportNum;
		  	employee.manager = req.body.manager != "" ? req.body.manager : employee.manager;


		  	console.log(employee.name);
		  	console.log(employee.title);
		  	console.log(employee.sex);

		  	employee.save(function(err) {
		    	if (err) {
		        	res.send(err);
		      	}
		      	res.json(employee);
		  	});
		});
	})
	// For Delete One Employee
	.delete(function(req, res) {
        Employees.remove({
            id: req.params.id
        }, function(err, employee) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully Deleted' });
        });	
	})
	// Find one employee with id and return it
	.get(function(req, res) {
        Employees.findOne({"id" : req.params.id}, function(err, employee) {
            if (err) {
                res.send(err);
            }
            res.json(employee);
        });
    });

router.route('/children/:str')
	// Delete the Manager
	// Find the Employees who's manager is going to be deleted
	// Remove their manager
	.put(function(req, res) {
		Employees.update( 
			{"manager" : req.params.str},
			{ $set: { "manager": "" }},
			{ multi: true },
			function(err, employee) {
				if (err) {
					res.send(err);
				}
				res.json(employee);
			}
		);
	})
	// Get The Children List
	.get(function(req, res) {
		Employees.find({"manager" : req.params.str})
	    	.sort({id : 1})
	    	.exec(function(err, employees) {
	            if (err) {
	                res.send(err);
	            }
	            res.json(employees);
	    	});
	});

router.route('/manager/:str')
	// Add new Children id to the Manager's children list
	.post(function(req, res) {
		Employees.findOne({"name" : req.params.str}, function(err, employee) {
			if (err) {
				res.send(err);
			}
			employee.children.push(req.body.id);
			employee.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.json(employee);
			});		
		});
	})
	// When a employee is deleted, Remove from the Manager's children list
	// The new children list conten is updated from the frond-end
	// This API just replace the old array with the new one
	.put(function(req, res) {
		Employees.findOne({"name" : req.params.str}, function(err, employee) {
			if (err) {
				res.send(err);
			}
			employee.children = req.body.children;
			employee.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.json(employee);
			});
		});
	})
	.get(function(req, res) {
        Employees.findOne({"name" : req.params.str}, function(err, employee) {
            if (err) {
                res.send(err);
            }
            res.json(employee);
        });
    });

router.route('/tool')
	// This one return the max id right now
	.get(function(req, res) {
		Employees.findOne({})
		  .sort('-id')  // give me the max
		  .exec(function (err, employee) {
		  	if (err) {
		  		res.send(err);
		  	}
		  	res.json(employee);
		  });
	});


//***** This is the upload handler section *****//
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {

      cb(null,  file.originalname );

  }
});

var upload = multer({ storage: storage });

router.route('/upload')
	.post(upload.single('file'), function (req, res) {
		res.send("Here is upload!");
	});


module.exports = router;
