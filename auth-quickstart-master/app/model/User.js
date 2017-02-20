var Sequelize = require('sequelize')

var attributes = {
    
    
    // info basica 
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-z0-9\_\-]+$/i,
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },


    // < begin info primer form.
    
  telephone:{ 
  type: Sequelize.STRING},

  birthDate:{ 
    type: Sequelize.STRING},
    
  address:{ 
    type: Sequelize.STRING},
    
  state:{ 
    type: Sequelize.STRING},  
    
     // begin info segundo form
    cargo:{ 
    type: Sequelize.STRING},
    
    
    // begin tercer form
    tipoD: {
    type: Sequelize.STRING},
    
    techelp: {
    type: Sequelize.STRING},
    
    registrado: {
    type: Sequelize.STRING},
    
    pension : {
    type: Sequelize.STRING},
    
    // begin cuarta form
    
    ecolaridad: {
        type: Sequelize.STRING},
    ocupacion: {
        type: Sequelize.STRING},
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