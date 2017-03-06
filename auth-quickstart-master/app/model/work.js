var Sequelize = require('sequelize')

var attributes = {
  position: {
    type: Sequelize.STRING,
  },
  company: {
    type: Sequelize.STRING,
  },
  startDate: {
    type: Sequelize.DATE,
  },
  endDate: {
    type: Sequelize.DATE,
  },
  description: {
    type: Sequelize.STRING,
  },
}

var options = {
  freezeTableName: true
}

module.exports.attributes = attributes
module.exports.options = options