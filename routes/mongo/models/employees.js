var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmployeesSchema = new Schema({
	id : Number,
	name : String,
	title : String,
	sex : String,
	age : Number,
	phoneNum : String,
	pictureLink : String,
	email : String,
	reportNum : Number,
	manager : String,
	// This is the linked list to store all of the childer.
	children : new Array()
});

module.exports = mongoose.model('Employees', EmployeesSchema);