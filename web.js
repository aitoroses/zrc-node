var express = require('express')
var app = express();

var app = require('./api/mongodb')(app);

// CONFIGURATION

app = require('./config')(app);

// ROUTES

app = require('./api/controllers/user.js')(app);
app = require('./api/controllers/auth.js')(app);

app.get('/', function(request, response) {
  response.render('index', { title : 'Home' });
});

app.get('/mail', function(request, response){
	require('./api/mailer/mailer')();
	response.send(200);
})
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on port " + port);
});

