"use strict";

module.exports = function (sequelize, DataTypes) {
    var ProcessedEvent = sequelize.define('processedEvent', {
        start: {
            type: DataTypes.DATE
        },
        finish: {
            type: DataTypes.DATE
        },
        lat: {
            type: DataTypes.DOUBLE
        },
        long: {
            type: DataTypes.DOUBLE
        }
    }, {
        classMethods: {
            associate: function (models) {
                ProcessedEvent.belongsTo(models.truck);
                ProcessedEvent.belongsTo(models.driver);
            }
        }
    });

    return ProcessedEvent;
};