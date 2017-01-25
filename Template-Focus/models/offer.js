
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var offerSchema = new mongoose.Schema({
    name: String,
    position: String,
    location: String,
    description: String
});

// Return model
module.exports = restful.model('Offers', offerSchema);
