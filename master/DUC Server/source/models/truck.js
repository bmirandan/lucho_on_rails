"use strict";

module.exports = function (sequelize, DataTypes) {
    var Truck = sequelize.define('truck', {
            name: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.STRING
            }
        }, {
            classMethods: {
                associate: function (models) {
                    Truck.belongsToMany(models.duc, {
                        through: 'DucTruck'
                    });
                }
            }

        }

    );

    return Truck;
};