var companys = require('../controllers/companys');

module.exports = function (router) {
  router.get('/companys', companys.index);
  router.get('/companys/:id', companys.show);
  router.post('/companys', companys.create);
  router.put('/companys', companys.update);
  router.delete('/companys/:id', companys.delete);

  return router
};