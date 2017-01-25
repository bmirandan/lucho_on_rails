
// Dependencies
var express = require('express');
var router = express.Router();

//Offer
var Offer = require('../models/offer');
Offer.methods(['get', 'put', 'post', 'delete']);
Offer.register(router, '/offers');

// Return router
module.exports = router;
