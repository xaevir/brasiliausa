
/**
 * Module dependencies.
 */

var express = require('express')
  , mongo = require('mongoskin')
  , RedisStore = require('connect-redis')(express)
  , bcrypt = require('bcrypt')
  , imagemagick = require('imagemagick')
  , fs = require('fs')

db = mongo.db('localhost/brasiliausa?auto_reconnect');

var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "batman", store: new RedisStore }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

function isXhr(req, res, next) {
  if (!(req.xhr)) {
    if (req.session.user)
      res.render('layout', {body: '',  user: {username: req.session.user.username, _id:  req.session.user._id}});
    else 
      res.render('layout', {body: '', user: {}});
  }
  else
    next()
}

function showStatic(req, res, path, pageTitle){
  if (req.xhr) {
    res.render(path, function(err, html){
      res.send({title: pageTitle, body: html});
    });
  }
  else {
    if (req.session.user)
      var user = {username: req.session.user.username, _id:  req.session.user._id}
    else
      var user = {}
    res.render(path, {layout: true, pageTitle: pageTitle, user: user });
  }
}

app.get('/', function(req, res) {
  var pageTitle = 'Brasilia USA - For the Finest in Brasilia Espresso Machines';
  showStatic(req, res, 'index', pageTitle)
});

app.get('/support', function(req, res) {
  showStatic(req, res, 'static/support', 'Support')
});

app.get('/history', function(req, res) {
  showStatic(req, res, 'static/history', 'History')
});

app.get('/our-team', function(req, res) {
  showStatic(req, res, 'static/our-team', 'Our Team')
});

app.get('/technology', function(req, res) {
  showStatic(req, res, 'static/technology', 'Technology')
});

app.get('/what-we-do', function(req, res) {
  showStatic(req, res, 'static/what-we-do', 'What We Do')
});


app.get('/dash', isXhr, function(req, res) {});

app.get('/login', isXhr, function(req, res) {});

app.post('/session', function(req, res) {
  db.collection('users').findOne({email: req.body.email}, function(err, user){
    if (!user)
      return res.send({hi: 'hi'});
    bcrypt.compare(req.body.password, user.password, function(err, match) {
      if (!match) 
        return res.send({hi: 'hi'})
      req.session.user = user;
      user.password = '';
      res.send(user)
    })
  })
})

app.del('/session', function(req, res) {
  req.session.destroy(function(){
      res.send({success: true, 
                message: 'user logged out'
      })
  });
});

app.get('/signup', restrict, isXhr, function(req, res) { });

app.post('/signup', restrict, function(req, res){ 
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(req.body.password, salt, function(err, hash){
      req.body.password = hash;
      db.collection('users').insert(req.body, function(err, result){
        var user = result[0]
        req.session.user = user;
        user.password = '';
        res.send(user);
      })
    })
  }) 
})

app.get("/is-username-valid", function(req, res) {
  db.collection('users').findOne({username: req.body.username}, function(err, user){
    return user 
      ? res.send(false) 
      : res.send(true);
  })
})

app.get("/check-email", function(req, res){
  db.collection('users').findOne({email: req.body.email}, function(err, user){
    return user
      ? res.send(false)
      : res.send(true);
  })
})

app.get('/products', function(req, res) {
  db.collection('products').find().toArray(function(err, result) {
      if (err) throw err
      res.send(result)
  })
})

app.post('/products', restrict, function(req, res) {
  db.collection('products').insert(req.body, function(err, result){
    var product = result[0]
    res.send(product)
  })
})

app.put('/products', restrict, function(req, res) {
  req.body._id = db.ObjectID.createFromHexString(req.body._id)
  db.collection('products').save(req.body)
  res.send(req.body)
})



app.post('/upload', function(req, res){
  // the uploaded file can be found as `req.files.image` and the
//  res.send(req.files.file)

  var file = req.files.file
  var input = file.path
  var output = '/tmp/' + file.name

  options_regular = { "content_type": file.type, "root": 'images' }
  options_thumb = { "content_type": file.type, "root": 'images.thumbs' }
  options_original = { "content_type": file.type, "root": 'images.originals' }

  imagemagick.convert([input, '-resize', '400x500', output], function(err, metadata){
    db.gridfs().open(file.name, 'w', options_regular, function(err, gs) {
      gs.writeFile(output, function(err, reply) {
        fs.unlink(output)
        console.log('image resized to 400x500 and saved in mongo')

        createThumb() 
      })
    })
  })

  function createThumb(){
    imagemagick.convert(['-define', 'jpeg:size=350x310', input,  
                         '-thumbnail', '175x155', output], //'-unsharp',  '0x.5', 
    function(err, metadata){
      db.gridfs().open(file.name, 'w', options_thumb, function(err, gs) {
        gs.writeFile(output, function(err, reply) {
          fs.unlink(output)
          console.log('image thumbnail created and saved in mongo')
          saveOriginal()
        })
      })
    })
  }

  function saveOriginal(){
    db.gridfs().open(file.name, 'w', options_original, function(err, gs) {
      gs.writeFile(input, function(err, reply) {
        console.log('original image saved in mongo')
        fs.unlink(input)
        done()
      })
    })
  }
 
  function done() {
    console.log('image manipulation done and saved')
    res.send({'success': true, 'message': 'image resized and saved'})    
  }
   
})


app.get('/images/thumbs/:name', function(req, res){
  db.gridfs().open(req.params.name, 'r', {root: 'images.thumbs'}, function(err, file) {
    res.header('Content-Type', file.content_type);
    res.header('Content-Length', file.length);
    file.stream(true).pipe(res)
  })
})

app.get('/images/:name', function(req, res){
  db.gridfs().open(req.params.name, 'r', {root: 'images'}, function(err, file) {
    res.header('Content-Type', file.content_type);
    res.header('Content-Length', file.length);
    file.stream(true).pipe(res)
  })
})

app.get('/images/originals/:name', function(req, res){
  db.gridfs().open(req.params.name, 'r', {root: 'images.originals'}, function(err, file) {
    res.header('Content-Type', file.content_type);
    res.header('Content-Length', file.length);
    file.stream(true).pipe(res)
  })
})



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
