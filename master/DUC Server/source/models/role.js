"use strict";

module.exports = function (sequelize, DataTypes) {
	var Role = sequelize.define('role', {
		name: {
			type: DataTypes.ENUM('user', 'admin'),
			unique: true
		}
	}, {
		classMethods: {
            associate: function (models) {
                Role.belongsTo(models.user);
            }
        },
		
		indexes: [{
			unique: true,
			fields: ['name', 'userId']
    }]
	});
	

	return Role;
};