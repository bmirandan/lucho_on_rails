var bcrypt = require('bcrypt-nodejs'),
 Model = require('../model/models.js');
var nodemailer = require("nodemailer");
var validator = require('validator');

module.exports.show = function(req, res) {
    //res.render('signup')
    res.sendFile('signup.html', {
        root: './views'
    });
}

    
module.exports.signup = function(req, res) {
  
    // por rapidez de implementacion se cambio username por email, se duplica la info para que no pierda transparencia al querer //acceder a email, por ejemplo
  var password = req.body.password
  var password2 = req.body.password2
  var email = req.body.email
  var telephone = req.body.telephone
  var representative = req.body.representative
  var relationWithUser = req.body.relationWithUser
  var nameRepresentative = req.body.nameRepresentative
  var mailRepresentative = req.body.mailRepresentative
  var telephoneRepresentative = req.body.telephoneRepresentative
  
  if (!password || !password2 || !email || !telephone || password.toString.length < 6 || password.toString.length > 12) {
    
      req.flash('error', "Porfavor, rellene todos los campos.")
      res.sendFile('signup.html', {
        root: './views'
      });
    
  }
    
  if (password != password2) {
    req.flash('error', "Por favor ingrese la misma constraseña.")
    console.log("saaa");
  }
  
  
  
  var salt = bcrypt.genSaltSync(10)
  var hashedPassword = bcrypt.hashSync(password, salt)
  
  var newUser = {
    username: email,
    salt: salt, 
    email: email,
    password: hashedPassword,
    telephone: telephone,
    representative: representative,
    relationWithUser: relationWithUser,
    nameRepresentative: nameRepresentative,
    mailRepresentative: mailRepresentative,
    telephoneRepresentative: telephoneRepresentative
  }
  
  Model.User.create(newUser).then(function() {
     res.redirect('/signup')
     req.flash('notify', "Usuario creado con exito")    
  }).catch(function(error) {
    req.flash('error', "Porfavor, escoga un email distinto.")
    res.sendFile('signup.html', {
        root: './views'
    });
  })

},



module.exports.index = function(req, res){

    Model.User.findAll({
        
    })
      .then(function (companies) {
        console.log(companies[1].id);
     res.status(200).json(companies);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },
    
    module.exports.send = function(req, res){

   var data;
   Model.User.findById(req.params.id).then(function(user) {
  // project will be an instance of Project and stores the content of the table entry
  // with id 123. if such an entry is not defined you will get null
    data= user;



  
    
  var smtpTransport = nodemailer.createTransport({
   service: "Gmail",  // sets automatically host, port and connection security settings
   auth: {
       user: "pilarproy0@gmail.com",
       pass: "123123as"
   }
});

    

smtpTransport.sendMail({  //email options
   from: data.email, // sender address.  Must be the same as authenticated user if using Gmail.
   to: "benjamin.miranda.12@sansano.usm.cl", // receiver
   subject: " Pilar Pánic Button id:"+  user.id , // subject
   text: " Información de Contacto " +"\n"+ "Email: " + data.email +"\n"+ "Número Telefónico: "+ user.telephone ,
    
}, function(error, response){  //callback
   if(error){
       console.log(error);
   }else{
       console.log("Message sent: " + response.message );
   }
   
   smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    }) ;
       
smtpTransport.sendMail({  //email options
   from: data.user, // sender address.  Must be the same as authenticated user if using Gmail.
   to: data.email, // receiver
   subject: "Solicitud de contacto Programa Amulekan" , // subject
   text:  "¡Gracias por contactarte con nosotros!" +"\n"+"Estamos procesando tu solicitud de contacto. Te llamaremos al número de teléfono con el que te registraste en nuestro , en un plazo máximo de 24 horas hábiles, luego del recibo de este correo. Nuestros horarios de contacto son de 10:00 a 18:00 horas de Lunes  a Viernes, excepto festivos."   // body
}, function(error, response){  //callback
   if(error){
       console.log(error);
   }else{
       console.log("Message sent: " + response.message );
   }
   
   smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    }) ;
    
});
    

  },

  module.exports.update = function(req, res) {

    
  Model.User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    
    .then(function (updatedRecords) {
           
      res.status(200).json(updatedRecords);
    })
    .catch(function (error){
      
    
  
  
      res.status(500).json(error);
    });
  }


