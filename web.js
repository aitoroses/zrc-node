var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')

var app = express();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.configure(function() {
	app.use(express.static(__dirname + '/public'))
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({ secret: 'keyboard cat' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.set('views', __dirname + '/views')
	app.set("view engine", "jade");
	app.use(stylus.middleware(
	  { src: __dirname + '/public'
	  , compile: compile
	  }
	))
	app.use(express.logger());
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/', function(request, response) {
  response.render('index', { title : 'Home' });
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});