"use strict";

module.exports = function (sequelize, DataTypes) {
    var DucState = sequelize.define('ducstate', {
        connectionState: {
            type: DataTypes.ENUM('connected', 'disconnected')
        },
        batteryLevel:{
            type: DataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: function (models) {
                DucState.belongsTo(models.duc);
                DucState.belongsTo(models.truck);
                DucState.belongsTo(models.driver);
            }
        }
    });

    return DucState;
};