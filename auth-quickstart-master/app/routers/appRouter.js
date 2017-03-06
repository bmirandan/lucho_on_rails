var passport = require('passport'),
    signupController = require('../controllers/signupController.js'),
    companyController = require('../controllers/companyController.js'),
    userController = require('../controllers/userController.js'),
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
  
  router.get('/halp/:id', signupController.send)

 
  router.get('/signup', signupController.show)
  router.post('/signup', signupController.signup)
  router.get('/lista', signupController.index)
  router.put('/users/:id', signupController.update)
    
  router.get('/users', userController.index)
  router.get('/users/:id', userController.show)
  router.post('/users', userController.create)
  router.put('/users/:id', userController.update)
  router.delete('/users/:id', userController.delete)
  
  router.get('/offers', offerController.index)
  router.get('/offers/:id', offerController.show)
  router.post('/offers', offerController.create)
  router.put('/offers/:id', offerController.update)
  router.delete('/offers/:id', offerController.delete)

  router.get('/companies', companyController.index)
  router.get('/companies/:id', companyController.show);
  router.post('/companies', companyController.create);
  router.put('/companies/:id', companyController.update);
  router.delete('/companies/:id', companyController.delete); 
    
  router.get('/userApplications', userApplicationController.index)
  router.get('/userApplications/:id', userApplicationController.show);
  router.post('/userApplications', userApplicationController.create);
  router.put('/userApplications/:id', userApplicationController.update);
  router.delete('/userApplications/:id', userApplicationController.delete); 

    
  router.post('/login', passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/home',
      failureFlash: true 
  }))
  
  router.get('/', function(req, res) {
    res.sendFile('index.html', {
        root: './views'
    });
  })



  router.get('/home', function(req, res) {
    res.sendFile('home.html', {
        root: './views'
    });
  })

  router.get('/dashboard', isAuthenticated, function(req, res) {

         if(req.user.id == 18 || req.user.id == 19 )res.render('admin.html', {username: req.user.username, 
                                    id : req.user.id, 
                                    form1:req.user.form1,
                                    form2:req.user.form2,
                                    form3:req.user.form3,
                                    form4:req.user.form4
                                   })
         
         else{ res.render('dashboard.html',{username: req.user.username, 
                                    id : req.user.id, 
                                    form1:req.user.form1,
                                    form2:req.user.form2,
                                    form3:req.user.form3,
                                    form4:req.user.form4
                                   })
             
             
             
         }
  }) 

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })
  
 
   
  


  return router
}