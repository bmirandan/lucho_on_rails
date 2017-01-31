'use strict';
module.exports = function(sequelize, DataTypes) {
  var Offer = sequelize.define('Offer', {
    title: DataTypes.STRING,
    position: DataTypes.STRING,
    location: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
      underscored:true,
      classMethods: {
      associate: function(models) {
        // associations can be defined here
        // Offer.hasMany(models.Company,{foreignKey: 'id'});
      }
    }
  });
  return Offer;
};