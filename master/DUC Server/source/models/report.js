"use strict";

module.exports = function (sequelize, DataTypes) {
    var Report = sequelize.define('report', {
        reportFrecuency: {
            type: DataTypes.ENUM('day', 'week', 'month')
        },
		//parametro  para el reporte,  corresponde a la fecha inicial de la muestra
		reportDate:{
			type: DataTypes.DATE
		}
    }, {
        classMethods: {
            associate: function (models) {
                Report.belongsTo(models.recipient);
            }
        }
    });

    return Report;
};