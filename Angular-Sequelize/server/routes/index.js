var companys = require('../controllers/companys');
var offers = require('../controllers/offers');
var users = require('../controllers/users');
module.exports = function (router) {
  router.get('/companys', companys.index);
  router.get('/companys/:id', companys.show);
  router.post('/companys', companys.create);
  router.put('/companys', companys.update);
  router.delete('/companys/:id', companys.delete);
    
  
    router.get('/users', users.index);
    router.post('/users', users.create);
     router.get('/users/:id', users.show);
  router.get('/offers/:id', offers.show);
  router.post('/offers', offers.create);
  router.put('/offers', offers.update);
  router.delete('/offers/:id', offers.delete);

  return router
};