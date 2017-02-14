var bcrypt = require('bcrypt-nodejs'),
    Model = require('../model/models.js')

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

  module.exports.update= function(req, res) {
    
    Model.Company.update(req.body, {
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
