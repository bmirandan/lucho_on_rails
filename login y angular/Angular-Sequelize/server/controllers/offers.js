Offer = require('../models/').Offer;

module.exports= {
  index(req, res) {
    Offer.findAll()
      .then(function (offers) {
        res.status(200).json(offers);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    Offer.findById(req.params.id)
    .then(function (offer) {
      res.status(200).json(offer);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    Offer.create(req.body)
      .then(function (newOffer) {
        res.status(200).json(newOffer);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  update(req, res) {
    Offer.update(req.body, {
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
    Offer.destroy({
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