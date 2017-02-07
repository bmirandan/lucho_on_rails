var Sequelize = require('sequelize')

var attributes = {
    applyDate: { 
        type: Sequelize.DATE,
        allowNull: false
    },
    

}

var options = {
  freezeTableName: true,
  underscored: true
}

module.exports.attributes = attributes
module.exports.options = options