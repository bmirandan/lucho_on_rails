var Model = require('../../app/model/models.js')

module.exports = function(callback) {
  // recreate User table
  Model.User.sync({ force: true }).then(function() {
    // create username with username: user and 
    // password: user
    Model.User.create({
      id: '1',
      username: 'user',
      password: '$2a$10$QaT1MdQ2DRWuvIxtNQ1i5O9D93HKwPKFNWBqiiuc/IoMtIurRCT36',
      salt: '$2a$10$QaT1MdQ2DRWuvIxtNQ1i5O'
    }).then(callback)
  }),
  Model.Company.sync({ force: true }).then(function() {
    Model.Company.create({
      id: '1',
      name: 'hh',
      username: 'ss',
      password: 'gg'
    }).then(callback)
  }),
      
  Model.Offer.sync({ force: true }).then(function() {
    Model.Offer.create({
      title:'save me ',
      location: 'sabe you location'
    }).then(callback)
  }),
  Model.UserApplication.sync({ force: true }).then(function() {
    Model.UserApplication.create({
      applyDate: '2017-02-06 16:04:41.896-03'
    }).then(callback)
  })
}