var Sequelize = require('sequelize');
var Model = require('../model/models.js');

var attributes = {
    
    
    // info basica 
  username: {  
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
        len: {
            args: [10, 60],
            msg: 'El campo debe tener entre 10 y 60 caracteres de largo'
        },
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
      isEmail: true,
      len: {
            args: [10, 60],
            msg: 'El campo debe tener entre 10 y 60 caracteres de largo'
      }
    }
  },
  firstName: {
    type: Sequelize.STRING,
    validate: {
        len: {
            args: [2, 50],
            msg: 'El campo debe tener entre 2 y 50 caracteres de largo'
        }
    }
  },
  lastName: {
    type: Sequelize.STRING,
    validate: {
        len: {
            args: [2, 50],
            msg: 'El campo debe tener entre 2 y 50 caracteres de largo'
        }
    }
  },
  password: {
    type: Sequelize.STRING,
    validate: {
          len: {
                args: [20, 150],
                msg: 'El campo debe tener entre 20 y 150 caracteres de largo'
          }
    }
  },

    //Representative Info
    
    representative: {
        type: Sequelize.STRING
    },
    relationWithUser: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [20, 60],
                msg: 'El campo debe tener entre 20 y 60 caracteres de largo'
            }
        }
    },
    nameRepresentative: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [2, 50],
                msg: 'El campo debe tener entre 2 y 50 caracteres de largo'
            }
        }
    },
    mailRepresentative: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [10, 60],
                msg: 'El campo debe tener entre 10 y 60 caracteres de largo'
            }
        }
    },
    telephoneRepresentative: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [6, 20],
                msg: 'El campo debe tener entre 6 y 20 caracteres de largo'
            }
        }
    },

    // < begin info primer form.
    
  telephone:{ 
    type: Sequelize.STRING,
    validate: {
            len: {
                args: [6, 20],
                msg: 'El campo debe tener entre 6 y 20 caracteres de largo'
            }
    }
    },

  birthDate:{ 
    type: Sequelize.STRING,
    validate: {
            len: {
                args: [10, 10],
                msg: 'El campo debe tener 10 caracteres de largo'
            }
    }
    },
    
  address:{ 
    type: Sequelize.STRING,
    validate: {
            len: {
                args: [10, 60],
                msg: 'El campo debe tener largo entre 10 y 60 caracteres de largo'
            }
    }
  },
    
  state:{ 
    type: Sequelize.STRING,
    validate: {
            len: {
                args: [10, 60],
                msg: 'El campo debe tener largo entre 10 y 60 caracteres de largo'
            }
    }
  },  
    
     // begin info segundo form
    cargo:{ 
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [10, 60],
                msg: 'El campo debe tener largo entre 10 y 60 caracteres de largo'
            }
        }
    },
    
    
    // begin tercer form
    tipoD: {
    type: Sequelize.STRING},
    
    techelp: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [10, 60],
                msg: 'El campo debe tener largo entre 10 y 60 caracteres de largo'
            }
        }
    },
    
    registrado: {
    type: Sequelize.STRING},
    
    pension : {
    type: Sequelize.STRING},
    
    // begin cuarta form
    
    ecolaridad: {
        type: Sequelize.STRING},
    ocupacion: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [10, 60],
                msg: 'El campo debe tener largo entre 10 y 60 caracteres de largo'
            }
        }
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