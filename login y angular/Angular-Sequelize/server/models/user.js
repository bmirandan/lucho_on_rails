'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
   
    password: DataTypes.STRING,
   
    email: DataTypes.STRING
      
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