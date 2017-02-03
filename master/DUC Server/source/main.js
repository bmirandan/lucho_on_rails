var Sequelize = require('sequelize');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var epilogue = require('epilogue');
var models = require('./models');
var jwt = require('jsonwebtoken');
var methodOverride = require("method-override");
var cors = require('cors');
var app = express();
var reporter = require('./utils/reporter');



app.use(bodyParser.json());


app.use(bodyParser.urlencoded({
	extended: false
}));

app.set('secret', 'fVZ{hyQ9"g@v&SJQ');
/*
app.use(bodyParser.urlencoded());*/


//app.use(methodOverride());



app.use(cors());


var apiRoutes = express.Router();

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function (req, res) {

	if (req.body.username) {

		models.user.findOne({
			where: {
				name: req.body.username,
				hash: req.body.password
			}
		}).then(function (usr) {
			console.log("Login", usr.dataValues);

			var token = jwt.sign(usr.dataValues, app.get('secret'));
			res.json({
				success: true,
				message: 'Enjoy your token!',
				isAdmin: usr.dataValues.isAdmin,
				token: token
			});
			console.log('auth ok');
		}).catch(function (err) {

			res.json({
				success: false,
				message: 'Authentication failed. Wrong username or password.'
			});

			console.log('auth error', err);

		});
	} else {
		res.json({
			success: false,
			message: 'Authentication failed. Username not provided.'
		});

		console.log('auth error');
	}
});

// route middleware to verify a token
apiRoutes.use(function (req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (req.method == "POST") {
		console.log(req.path);
		console.log(req.body);
		console.log(req.query);
		console.log("=================================================0");
	}

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, app.get('secret'), function (err, decoded) {
			if (err) {
				return res.json({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});

	}
});



// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);


//var server = http.createServer(app);

epilogue.initialize({
	app: app,
	sequelize: models.sequelize,
	updateMethod: "PUT"
});

var userResource = epilogue.resource({
	model: models.user,
	endpoints: ['/api/user', '/api/user/:id']
});

var ducResource = epilogue.resource({
	model: models.duc,
	endpoints: ['/api/duc', '/api/duc/:id']
});

var driverResource = epilogue.resource({
	model: models.driver,
	endpoints: ['/api/driver', '/api/driver/:id']
});

var ducStateResource = epilogue.resource({
	model: models.ducstate,
	endpoints: ['/api/ducstate', '/api/ducstate/:id']
});

var eventoResource = epilogue.resource({
	model: models.processedEvent,
	endpoints: ['/api/processedEvent', '/api/processedEvent/:id'],
	search: [
		{
			param: 'fstart',
			operator: '$gte',
			attributes: ['start']
        },
		{
			param: 'ffinish',
			operator: '$lte',
			attributes: ['finish']
        }

        ]
});

var camionResource = epilogue.resource({
	model: models.truck,
	endpoints: ['/api/truck', '/api/truck/:id']
});

var destinatarioResource = epilogue.resource({
	model: models.recipient,
	endpoints: ['/api/recipient', '/api/recipient/:id']
});

var reporteResource = epilogue.resource({
	model: models.report,
	endpoints: ['/api/report', '/api/report/:id']
});

var turnoResource = epilogue.resource({
	model: models.workshift,
	endpoints: ['/api/workshift', '/api/workshift/:id']
});

function createAdminIfDoestExists(adminName)
{
	Object.keys(models).forEach(function (modelName) {
			console.log(modelName);
		});

		//crea admin si no existe
		models.user.findAll({
			where: {
				isAdmin: true
			}
		}).then(function(data){
			
			if(data.length == 0)
				{
					models.user
						.findOne({where:{name:adminName}}).then(function(u){
						if(u)
						{
							u.updateAttributes({isAdmin:true}).then(function(){})
						}
						else
						{
							models.user.create({name:adminName, hash:"1234", isAdmin:true}).then(function(){});
						}
						
					});
				}
		});
}


models.sequelize.authenticate()
	.then(function (err) {
		console.log('Conectado con BD!');
	})
	.catch(function (err) {
		console.log('Error de conexion a BD');
	});

models.sequelize.sync().then(function () {
	console.log("Tablas sincronizadas");
	app.listen(50123, function () {
		var host = app.address,
			port = app.port;
		console.log('Servidor corriendo en http://%s:%s', host, port);

		createAdminIfDoestExists("diego");	
		
		reporter.init(models);
	});
});