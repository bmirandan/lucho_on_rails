var Model = require('../model/models.js')

module.exports= {
  //Get a list of all companies using model.findAll()
  index(req, res) {
    Model.Offer.findAll({
        
    })
      .then(function (companies) {
        res.status(200).json(companies);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Get an offer by the unique ID using model.findById()
  show(req, res) {
    Model.Offer.findById(req.params.id, {
    })
    .then(function (offer) {
      res.status(200).json(offer);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  //Create a new offer using model.create()
  create(req, res) {
    Model.Offer.create(req.body)
      .then(function (newOffer) {
        res.status(200).json(newOffer);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  //Edit an existing offer details using model.update()
  update(req, res) {
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

  //Delete an existing offer by the unique ID using model.destroy()
  delete(req, res) {
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
};