var Model = require('../../app/model/models.js')
var Q = require('q')
var connection = require('../../app/sequelize.js')
module.exports = function(callback) {
    
    connection.sync().then(function () {
    
        
Q.fcall(Model.User.create({
        id:'1',
        email:'hola@hola.com',
        username: 'user',
       firstName:'go',
       lastName: 'jaja', password:'$2a$10$QaT1MdQ2DRWuvIxtNQ1i5O9D93HKwPKFNWBqiiuc/IoMtIurRCT36',
        salt: '$2a$10$QaT1MdQ2DRWuvIxtNQ1i5O'
        }),
       
       Model.User.create({
        id:'2',
        email:'hola@ho22la.com',
        username: 'us2er',
       firstName:'g2o',
       lastName: 'ja2ja', password:'$2a$20$QaT1MdQ2DRWuvIxtNQ1i5O9D93HKwPKFNWBqiiuc/IoMtIurRCT36',
        salt: '$2a$10$QaT1MdQ2DRWuvIxtNQ1i5O'
        })
       )
.then( Model.Company.create({
          id: '1',
          name: 'hh',
          username: 'ss',
          password: 'gg'
        }))
.then( Model.Offer.create({
          id:'1',    
          title:'save me ',
          location: 'sabe you location',
          companyId: '1'

        }))
.then(Model.UserApplication.create({
          id:'1',
          applyDate: '2017-02-06 16:04:41.896-03',
          userApplications_user_id_fkey: '1',
          userApplications_offer_id_fkexy:'1'

        }))
.catch(function (error) {
    // Handle any error from all above steps
})
.done();
        

        console.log("Tablas sincronizadas");
        
    });
}