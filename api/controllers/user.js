module.exports = function(app) {
  app.get('/API/user', function(req, res){
    res.render('form', {title: 'register form'});
  });

  app.get('/API/user/get', function(req, res){
    app.models.User.find({}).exec(function(err, users){
      if(err) console.log('An error happened');
      res.json({count: users.length, users: users});
    });
  });

  app.post('/API/user', function(req, res){
    if(req.body.email == '') {
      console.log('Invalid User');
      res.redirect('/API/user');
      return;
    }
    app.models.User.create(req.body, function (err) {
      if (err) return console.log(err);
        // saved!
    });
    console.log(req.body);
    res.send(200);
  });

  return app;
}