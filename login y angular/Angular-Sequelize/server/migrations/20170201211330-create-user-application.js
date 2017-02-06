'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('user_applications', {

      applyDate: {
        type: Sequelize.DATE
      },
        
    email:{
          type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-z0-9\_\-]+$/i,
      isEmail: true,
        
    } , 
        
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
        
         
      user_rut: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        
       offer_id: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          allowNull: false,
          references: {
            model: 'Offers',
            key: 'id'
          },
        }    
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('user_applications');
  }
};