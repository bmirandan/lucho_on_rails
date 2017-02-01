'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_application = sequelize.define('user_application', {
    applyDate: DataTypes.DATE
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
         
          
          
          
          
        user_application.belongsTo(models.Offer, {
          onDelete: "CASCADE",
          foreignKey: {
          allowNull: false
          }
        });
        user_application.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
          allowNull: false
          }
        });
          
          
      }
    }
  });
  return user_application;
};