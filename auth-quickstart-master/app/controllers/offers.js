 var Model = require('../model/models.js')
 
 
   
module.exports.index = function(req, res) {
    Model.Offer.findAll()
      .then(function (offers) {
        res.status(200).json(offers);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  module.exports.show = function(req, res) {
    Model.Offer.findById(req.params.id)
    .then(function (offer) {
      res.status(200).json(offer);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  module.exports.create = function(req, res) {
    Model.Offer.create(req.body)
      .then(function (newOffer) {
        res.status(200).json(newOffer);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  module.exports.update = function(req, res) {
    Model.Offer.update(req.body, {
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
    Model.Offer.destroy({
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

