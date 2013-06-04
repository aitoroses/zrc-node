var passport = require('passport');

module.exports = function(app) {

	// Simple route middleware to ensure user is authenticated.
	//   Use this route middleware on any resource that needs to be protected.  If
	//   the request is authenticated (typically via a persistent login session),
	//   the request will proceed.  Otherwise, the user will be redirected to the
	//   login page.
	function ensureAuthenticated(req, res, next) {
	  if (req.isAuthenticated()) { return next(); }
	  res.redirect('/login')
	}

	app.get('/account', ensureAuthenticated, function(req, res){
	  res.send('Logged In');
	});

	// POST /login
	app.post('/login', function(req, res, next) {
	  passport.authenticate('local', function(err, user, info) {
	    if (err) { return next(err) }
	    if (!user) {
	      req.session.messages =  [info.message];
	      return res.send(JSON.stringify(info));
	    }
	    req.logIn(user, function(err) {
	      if (err) { return next(err); }
	      return res.redirect('/account');
	    });
	  })(req, res, next);
	});

	// GET /login
	app.get('/login', function(req, res, next) {
	  passport.authenticate('local', function(err, user, info) {
	    if (err) { return next(err) }
	    if (!user) {
	      req.session.messages =  [info.message];
	      return res.send(JSON.stringify(info));
	    }
	    req.logIn(user, function(err) {
	      if (err) { return next(err); }
	      console.log(user.username + ' has logged in.');
	      return res.redirect('/account');
	    });
	  })(req, res, next);
	});

	// GET /logout
	app.get('/logout', function(req, res){
	  console.log(req.user.username + " has logged out.")
	  req.logout();
	  res.redirect('/');
	});

	return app;
}