var companies = require('../controllers/companies');
var offers = require('../controllers/offers');
var users = require('../controllers/users');
var user_applications = require('../controllers/user_applications');

module.exports = function (router) {
  router.get('/companies', companies.index);
  router.get('/companies/:id', companies.show);
  router.post('/companies', companies.create);
  router.put('/companies', companies.update);
  router.delete('/companies/:id', companies.delete);
    
  router.get('/offers', offers.index);
  router.get('/offers/:id', offers.show);
  router.post('/offers', offers.create);
  router.put('/offers', offers.update);
  router.delete('/offers/:id', offers.delete);

  router.get('/users', users.index);
  router.get('/users/:id', users.show);
  router.post('/users', users.create);
  router.put('/users', users.update);
  router.delete('/users/:id', users.delete);

  router.get('/user_applications', user_applications.index);
  router.get('/user_applications/:id', user_applications.show);
  router.post('/user_applications', user_applications.create);
  router.put('/user_applications', user_applications.update);
  router.delete('/user_applications/:id', user_applications.delete);

  return router
};