// application
var cleanup = require('./tests/utils/cleanup.js');

var express = require('express'),
    app = express(),
    setupHandlebars  = require('./app/setupHandlebars.js')(app),
    setupPassport = require('./app/setupPassport'),
    flash = require('connect-flash'),
    appRouter = require('./app/routers/appRouter.js')(express),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    jsonParser = bodyParser.json();

var pgtools = require('pgtools');
const config = {
  user: 'postgres',
  password: '',
  port: 5432,
  host: 'localhost'
};
console.log("test1");
/*
pgtools.dropdb(config, 'example', function (err, res) {
    console.log("test 3");
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    //console.log(res);
    console.log("Database already exist");
});*/
console.log("test2");
pgtools.createdb(config, 'example', function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
    else
    {
        cleanup(function() {
          console.log('Setup finished.')
          //process.exit()
        })
        console.log("Database created");
    }
        
});

var port = process.env.PORT || 8080

app.use(cookieParser())
app.use(session({ secret: '4564f6s4fdsfdfd', resave: false, saveUninitialized: false }))

app.use('/styles', express.static(__dirname + '/styles'))

app.use(flash())
app.use(function(req, res, next) {
    res.locals.errorMessage = req.flash('error')
    next()
});

app.use(jsonParser)
app.use(bodyParser.urlencoded({
  extended: true
}))

setupPassport(app)

app.use('/', appRouter)

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');






// start app
app.listen(port)
console.log('Server started on port ' + port)

module.exports.getApp = app



