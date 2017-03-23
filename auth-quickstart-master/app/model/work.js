var Sequelize = require('sequelize')

var attributes = {
  position: {
    type: Sequelize.STRING,
    validate: {
            len: {
                args: [10, 60],
                msg: 'El campo debe tener largo entre 10 y 60 caracteres de largo'
            }
    }
  },
  company: {
    type: Sequelize.STRING,
    validate: {
            len: {
                args: [10, 60],
                msg: 'El campo debe tener largo entre 10 y 60 caracteres de largo'
            }
    }
  },
  startDate: {
    type: Sequelize.DATE,
    validate: {
            len: {
                args: [10, 10],
                msg: 'El campo debe tener 10 caracteres de largo'
            }
    }
  },
  endDate: {
    type: Sequelize.DATE,
    validate: {
            len: {
                args: [10, 10],
                msg: 'El campo debe tener 10 caracteres de largo'
            }
    }
  },
  description: {
    type: Sequelize.STRING,
    validate: {
            len: {
                args: [10, 70],
                msg: 'El campo debe tener entre 10 y 70 caracteres de largo'
            }
    }
  },
}

var options = {
  freezeTableName: true
}

module.exports.attributes = attributes
module.exports.options = options