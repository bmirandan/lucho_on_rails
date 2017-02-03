"use strict";

module.exports = function (sequelize, DataTypes) {
    var Recipient = sequelize.define('recipient', {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        reportFrecuency: {
            type: DataTypes.ENUM('day', 'week', 'month')
        }

    });

    return Recipient;
};