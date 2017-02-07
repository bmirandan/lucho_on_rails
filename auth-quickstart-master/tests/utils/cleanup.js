var Model = require('../../app/model/models.js')

var connection = require('../../app/sequelize.js')
module.exports = function(callback) {
    
    connection.sync().then(function () {
    
        Model.User.create({
          username: 'user',
          password: '$2a$10$QaT1MdQ2DRWuvIxtNQ1i5O9D93HKwPKFNWBqiiuc/IoMtIurRCT36',
          salt: '$2a$10$QaT1MdQ2DRWuvIxtNQ1i5O'
        }).then(callback);

        Model.Company.create({
          id: '1',
          name: 'hh',
          username: 'ss',
          password: 'gg'
        }).then(callback);

        Model.Offer.create({
          id:'1',    
          title:'save me ',
          location: 'sabe you location',
          companyId: '1'

        }).then(callback);

        Model.UserApplication.create({
          id:'1',
          applyDate: '2017-02-06 16:04:41.896-03',
          user_id: '1',
          offer_id:'1'

        }).then(callback);

        console.log("Tablas sincronizadas");
        
    });
}