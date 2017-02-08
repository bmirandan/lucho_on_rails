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
  
  if (!username || !password || !password2) {
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
    password: hashedPassword
  }
  
  Model.User.create(newUser).then(function() {
    res.redirect('/home')
  }).catch(function(error) {
    req.flash('error', "Please, choose a different username.")
    res.sendFile('signup.html', {
        root: './views'
    });
  })
}