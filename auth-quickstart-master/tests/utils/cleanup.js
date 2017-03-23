var Model = require('../../app/model/models.js')
var Q = require('q')
var connection = require('../../app/sequelize.js')
module.exports = function(callback) {
    
    connection.sync().then(function () {
        
        Model.User.create({
          id:'1',
          email:'hol@hola.com',
          username: 'hola@hola.com',
          firstName:'asd',
          lastName: 'jajajajajajja', password:'$2a$10$QaT1MdQ2DRWuvIxtNQ1i5O9D93HKwPKFNWBqiiuc/IoMtIurRCT36',
          salt: '$2a$10$QaT1MdQ2DRWuvIxtNQ1i5O',
          password: '$2a$10$QaT1MdQ2DRWuvIxtNQ1i5O9D93HKwPKFNWBqiiuc/IoMtIurRCT36'
        }).then(callback);

        Model.Company.create({
          id: '1',
          name: 'hhhhhhhhh',
          username: 'sssssssss',
          password: 'gggggggggg'
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
          userApplications_user_id_fkey: '1',
          userApplications_offer_id_fkexy:'1'

        }).then(callback);

        console.log("Tablas sincronizadas");
        
    });
}