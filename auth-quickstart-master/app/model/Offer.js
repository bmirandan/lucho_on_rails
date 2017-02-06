var Sequelize = require('sequelize')

var attributes = {
  title: {
    type: Sequelize.STRING,
  },
  location: {
    type: Sequelize.STRING,
  },

}

var options = {
  freezeTableName: true
}

module.exports.attributes = attributes
module.exports.options = options