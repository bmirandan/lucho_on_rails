"use strict";

module.exports = function (sequelize, DataTypes) {
    var DUC = sequelize.define('duc', {
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function (models) {
                DUC.belongsToMany(models.truck, {
                    through: 'DucTruck'
                });
            }
        }
    });

    return DUC;
};