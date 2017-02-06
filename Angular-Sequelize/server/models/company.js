'use strict';
module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define('Company', {
    id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
        },
    name: { 
        type: DataTypes.STRING,
        allowNull: false    
    },
    username: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    password: { 
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
         Company.hasMany(models.Offer);
          
          
      }
    }
  }
);    
  return Company;
};


