var UserMeta = require('./User.js'),
    OfferMeta = require('./Offer.js'),
    connection = require('../sequelize.js')

var User = connection.define('users', UserMeta.attributes, UserMeta.options)
var Offer = connection.define('offers', OfferMeta.attributes, OfferMeta.options)
// you can define relationships here

module.exports.User = User
module.exports.Offer = Offer