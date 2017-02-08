var passport = require('passport'),
    signupController = require('../controllers/signupController.js'),
    companyController = require('../controllers/companyController.js'),
    userApplicationController = require('../controllers/userApplicationController.js'),
    offerController = require('../controllers/offerController.js');

module.exports = function(express) {
  var router = express.Router()

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next()
    req.flash('error', 'You have to be logged in to access the page.')
    res.redirect('/')
  }
  
  router.get('/signup', signupController.show)
  router.post('/signup', signupController.signup)
  
  
  router.get('/offers', offerController.index)
  router.get('/offers', offerController.show)
  router.post('/offers', offerController.create)
  router.put('/offers', offerController.update)
  router.delete('/offers', offerController.delete)

  router.get('/companies', companyController.index)
  router.get('/companies/:id', companyController.show);
  router.post('/companies', companyController.create);
  router.put('/companies', companyController.update);
  router.delete('/companies/:id', companyController.delete); 
    
  router.get('/userApplications', userApplicationController.index)
  router.get('/userApplications/:id', userApplicationController.show);
  router.post('/userApplications', userApplicationController.create);
  router.put('/userApplications', userApplicationController.update);
  router.delete('/userApplications/:id', userApplicationController.delete); 


  router.post('/login', passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/home',
      failureFlash: true 
  }))
  
  router.get('/', function(req, res) {
    res.sendFile('landpage.html', {
        root: './views'
    });
  })

  router.get('/home', function(req, res) {
    res.sendFile('home.html', {
        root: './views'
    });
  })

  router.get('/dashboard', isAuthenticated, function(req, res) {
    res.sendFile('dashboard.html', {
        root: './views'
    });
  })

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })
  

   
  router.get('/myapply', isAuthenticated, function(req, res) {
    res.sendFile('myapply.html', {
        root: './views'
    });
  })


  return router
}