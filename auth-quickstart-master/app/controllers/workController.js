var Model = require('../model/models.js')

module.exports= {
  //Get a list of all works using model.findAll()
  index(req, res) {
    Model.Work.findAll({
        
    })
      .then(function (works) {
        res.status(200).json(works);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Get an work by the unique ID using model.findById()
  show(req, res) {
    Model.Work.findById(req.params.id, {
    })
    .then(function (work) {
      res.status(200).json(work);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },
    
  showork(req, res) {
    Model.Work.findAll( {
      where: {
        userId: req.params.id
      }
    })
    .then(function (work) {
      res.status(200).json(work);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  //Create a new work using model.create()
  create(req, res) {
    Model.Work.create(req.body)
      .then(function (newWork) {
        res.status(200).json(newWork);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  //Edit an existing work details using model.update()
  update(req, res) {
    Model.Work.update(req.body, {
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

  //Delete an existing work by the unique ID using model.destroy()
  delete(req, res) {
    Model.Work.destroy({
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