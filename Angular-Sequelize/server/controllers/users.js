User = require('../models/').User;
module.exports= {
  //Get a list of all users using model.findAll()
  index(req, res) {
    User.findAll({
    })
      .then(function (users) {
        res.status(200).json(users);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Get an company by the unique ID using model.findById()
  show(req, res) {
    User.findById(req.params.id, {
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
    User.create(req.body)
      .then(function (newUser) {
        res.status(200).json(newUser);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  //Edit an existing company details using model.update()
  update(req, res) {
    User.update(req.body, {
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
    User.destroy({
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