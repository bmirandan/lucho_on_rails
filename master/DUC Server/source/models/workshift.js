"use strict";

module.exports = function (sequelize, DataTypes) {
    var Workshift = sequelize.define('workshift', {
        start: {
            type: DataTypes.TIME
        },
        duration: {
            type: DataTypes.TIME
        }
    });

    return Workshift;
};