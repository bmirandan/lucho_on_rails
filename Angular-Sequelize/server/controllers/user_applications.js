user_application = require('../models/').user_application;

module.exports= {
  index(req, res) {
    user_application.findAll()
      .then(function (user_applications) {
        res.status(200).json(user_applications);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    user_application.findById(req.params.id)
    .then(function (user_application) {
      res.status(200).json(user_application);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    user_application.create(req.body)
      .then(function (newuser_application) {
        res.status(200).json(newuser_application);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  update(req, res) {
    user_application.update(req.body, {
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
  },

  delete(req, res) {
    user_application.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  }
};