'use strict';
module.exports = function(sequelize, DataTypes) {
  var Offer = sequelize.define('Offer', {
    title: { type: DataTypes.STRING,
               allowNull: false
              },
      position:{
        type: DataTypes.STRING,
        allowNull: false
              },
      
    location:{
        type: DataTypes.STRING,
        allowNull: false
              },
      description:{
        type: DataTypes.TEXT,
        allowNull: false
              },
  }, {
      underscored:true,
      classMethods: {
      associate: function(models) {
          
         
     Offer.belongsTo(models.Company, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
          
      Offer.hasMany(models.user_application);
          
        // associations can be defined here
        // Offer.hasMany(models.Company,{foreignKey: 'id'});
      }
    }
  });
    
  return Offer;
};