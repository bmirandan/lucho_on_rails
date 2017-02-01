var companys = require('../controllers/companys');
var offers = require('../controllers/offers');
var users = require('../controllers/users');
var user_applications = require('../controllers/user_applications');

module.exports = function (router) {
  router.get('/companys', companys.index);
  router.get('/companys/:id', companys.show);
  router.post('/companys', companys.create);
  router.put('/companys', companys.update);
  router.delete('/companys/:id', companys.delete);
    
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