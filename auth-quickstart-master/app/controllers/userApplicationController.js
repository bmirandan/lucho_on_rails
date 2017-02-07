var Model = require('../model/models.js')
 
module.exports.index = function(req, res) {
    Model.UserApplication.findAll()
      .then(function (userApplications) {
        res.status(200).json(userApplications);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  module.exports.show = function(req, res) {
    Model.UserApplication.findById(req.params.id)
    .then(function (offer) {
      res.status(200).json(userApplication);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  module.exports.create = function(req, res) {
    Model.UserApplication.create(req.body)
      .then(function (newUser_application) {
        res.status(200).json(newUser_application);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  module.exports.update = function(req, res) {
    Model.UserApplication.update(req.body, {
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

  module.exports.delete = function(req, res) {
    Model.UserApplication.destroy({
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

