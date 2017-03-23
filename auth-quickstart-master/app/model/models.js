var UserMeta = require('./User.js'),
	CompanyMeta = require('./Company.js'),
    OfferMeta = require('./Offer.js'),
    WorkMeta = require('./work.js'),
    UserApplicationMeta = require('./UserApplication.js'),
    connection = require('../sequelize.js');

var User = connection.define('users', UserMeta.attributes, UserMeta.options);
var Offer = connection.define('offers', OfferMeta.attributes, OfferMeta.options);
var Company = connection.define('companies', CompanyMeta.attributes, CompanyMeta.options);
var Work = connection.define('works', WorkMeta.attributes, WorkMeta.options);
var UserApplication = connection.define('userApplications', UserApplicationMeta.attributes, UserApplicationMeta.options);
// you can define relationships here

module.exports.User = User;
module.exports.Offer = Offer;
module.exports.Company = Company;
module.exports.Work = Work;
module.exports.UserApplication = UserApplication;

Offer.belongsTo(Company, {foreignKey: 'companyId', targetKey: 'id'});

UserApplication.belongsTo(User);
UserApplication.belongsTo(Offer);
Work.belongsTo(User);