"use strict";

module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define('user', {
		name: {
			type: DataTypes.STRING
		},
		hash: {
			type: DataTypes.STRING
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		indexes: [{
			unique: true,
			fields: ['name']
    	}]
	});

	return User;
};