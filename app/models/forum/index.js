'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var config = require('../../config').sql.forum;
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

fs
.readdirSync(__dirname)
.filter(function(file) {
	console.log(file);
	return (file.indexOf('.') !== 0) && (file !== basename);
})
.forEach(function(file) {
	var model = sequelize['import'](path.join(__dirname, file));
	db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;