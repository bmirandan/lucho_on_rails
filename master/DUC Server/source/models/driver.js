"use strict";

module.exports = function (sequelize, DataTypes) {
    var Driver = sequelize.define('driver', {
        name: {
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function (models) {
                Driver.hasMany(models.processedEvent);
            }
        }
    });
                                  

    return Driver;
};