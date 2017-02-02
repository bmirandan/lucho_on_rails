'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: { type: DataTypes.STRING,
               allowNull: false
              },
   
    password: { type: DataTypes.STRING,
               allowNull: false
              },
   
    email: { type: DataTypes.STRING,
               allowNull: false
              }
      
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          
          
          User.hasMany(models.user_application);
          
      }
    }
  });
  return User;
};