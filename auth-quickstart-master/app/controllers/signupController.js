        var bcrypt = require('bcrypt-nodejs'),
    Model = require('../model/models.js');
 var nodemailer = require("nodemailer");

module.exports.show = function(req, res) {
    //res.render('signup')
    res.sendFile('signup.html', {
        root: './views'
    });
}

    
module.exports.signup = function(req, res) {
  var username = req.body.username
  var password = req.body.password
  var password2 = req.body.password2
  var email = req.body.email
  var telephone = req.body.telephone
  
  if (!username || !password || !password2 || !email || !telephone) {
    req.flash('error', "Please, fill in all the fields.")
    res.sendFile('signup.html', {
        root: './views'
    });
  }
  
  if (password !== password2) {
    req.flash('error', "Please, enter the same password twice.")
    res.sendFile('signup.html', {
        root: './views'
    });
  }
  
  var salt = bcrypt.genSaltSync(10)
  var hashedPassword = bcrypt.hashSync(password, salt)
  
  var newUser = {
    username: username,
    salt: salt, 
    email: email,
    password: hashedPassword,
    telephone: telephone
  }
  
  Model.User.create(newUser).then(function() {
    res.redirect('/home')
  }).catch(function(error) {
    req.flash('error', "Please, choose a different username.")
    res.sendFile('signup.html', {
        root: './views'
    });
  })

},



module.exports.index = function(req, res){

    Model.User.findAll({
        
    })
      .then(function (companies) {
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
   to: "< benjamin.miranda.12@sansano.usm.cl", // receiver
   subject: " Pilar Pánic Button id:"+  user.id , // subject
   text: "El usuario: " + user.username + " requiere su ayuda \n"+ "Información de contacto. \n"+"\n"+"Teléfono: " + user.telephone +"\n"+ "Correo: "+ user.email      // body
}, function(error, response){  //callback
   if(error){
       console.log(error);
   }else{
       console.log("Message sent: " + response.message );
   }
   
   smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    });
    
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


