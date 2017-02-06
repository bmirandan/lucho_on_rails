var Model = require('../../app/model/models.js')

module.exports = function(callback) {
  // recreate User table
  Model.User.sync({ force: true }).then(function() {
    // create username with username: user and 
    // password: user
    Model.User.create({
      username: 'user',
      password: '$2a$10$QaT1MdQ2DRWuvIxtNQ1i5O9D93HKwPKFNWBqiiuc/IoMtIurRCT36',
      salt: '$2a$10$QaT1MdQ2DRWuvIxtNQ1i5O'
    }).then(callback)
  }),
  
  Model.Offer.sync({ force: true }).then(function() {
    // create username with username: user and 
    // password: user
    Model.Offer.create({
      title:'save me ',
      location: 'sabe you location'
    }).then(callback)
  }),
  
  Model.Company.sync({ force: true }).then(function() {
    Model.Company.create({
      id: '2',
      name: 'hh',
      username: 'ss',
      password: 'gg'
    }).then(callback)
  })
}