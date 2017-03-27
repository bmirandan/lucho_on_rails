var Sequelize = require('sequelize');
var Model = require('../model/models.js');

var attributes = {
    
    
    // info basica 
  username: {  
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
        isUnique: function(value, next){
            var self = this;
            Model.User.find({where: {username: {$iLike: value}}})
               .then(function (user) {
                            // reject if a different user wants to use the same email
                            if (user && self.id !== user.id) {
                                return next('El correo ya existe!');
                            }
                            return next();
                        })
                        .catch(function (err) {
                            return next(err);
                        });
        }
    }
    
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },

    //Representative Info
    
    representative: {
        type: Sequelize.STRING
    },
    relationWithUser: {
        type: Sequelize.STRING
    },
    nameRepresentative: {
        type: Sequelize.STRING
    },
    mailRepresentative: {
        type: Sequelize.STRING
    },
    telephoneRepresentative: {
        type: Sequelize.STRING
    },

    // < begin info primer form.
    
  telephone:{ 
    type: Sequelize.STRING
    },

  birthDate:{ 
    type: Sequelize.STRING
    },
    
  address:{ 
    type: Sequelize.STRING
  },
    
  state:{ 
    type: Sequelize.STRING
  },  
    
     // begin info segundo form
    cargo:{ 
        type: Sequelize.STRING
    },
    
    
    // begin tercer form
    tipoD: {
    type: Sequelize.STRING},
    
    techelp: {
        type: Sequelize.STRING
    },
    
    registrado: {
    type: Sequelize.STRING},
    
    pension : {
    type: Sequelize.STRING},
    
    // begin cuarta form
    
    ecolaridad: {
        type: Sequelize.STRING},
    ocupacion: {
        type: Sequelize.STRING
    },
    omil: {
        type: Sequelize.STRING},
    experiencialab: {
        type: Sequelize.STRING},
    // end info primer form >
    
  // Variables de control form completado. 
  form1:{
      type: Sequelize.BOOLEAN,
      defaultValue : false
      
    },
      
    form2:{
      type: Sequelize.BOOLEAN,
        defaultValue : false
    },  
      
    form3:{
      type: Sequelize.BOOLEAN,
        defaultValue : false
    },
      
    form4:{
      type: Sequelize.BOOLEAN,
        defaultValue : false
    },
      
    //    
    
   salt: {
    type: Sequelize.STRING
  }
};

var options = {
  freezeTableName: true
};

module.exports.attributes = attributes;
module.exports.options = options;