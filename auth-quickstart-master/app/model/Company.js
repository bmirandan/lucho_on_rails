var Sequelize = require('sequelize')

var attributes = {
    id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
        },
    name: { 
        type: Sequelize.STRING,
        allowNull: false    
    },
    username: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    password: { 
        type: Sequelize.STRING,
        allowNull: false
    }
}

var options = {
  freezeTableName: true,
  underscored: true
}

module.exports.attributes = attributes
module.exports.options = options