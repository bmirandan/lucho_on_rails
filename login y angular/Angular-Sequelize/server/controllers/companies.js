Company = require('../models/').Company;
Offer = require('../models/').Offer;
module.exports= {
  //Get a list of all companies using model.findAll()
  index(req, res) {
    Company.findAll({
        include: Offer
    })
      .then(function (companies) {
        res.status(200).json(companies);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Get an company by the unique ID using model.findById()
  show(req, res) {
    Company.findById(req.params.id, {
        include: Offer
    })
    .then(function (company) {
      res.status(200).json(company);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  //Create a new company using model.create()
  create(req, res) {
    Company.create(req.body)
      .then(function (newCompany) {
        res.status(200).json(newCompany);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  //Edit an existing company details using model.update()
  update(req, res) {
    Company.update(req.body, {
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

  //Delete an existing company by the unique ID using model.destroy()
  delete(req, res) {
    Company.destroy({
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