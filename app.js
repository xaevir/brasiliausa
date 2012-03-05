
/**
 * Module dependencies.
 */

var express = require('express')
  , mongo = require('mongoskin')
  , RedisStore = require('connect-redis')(express)
  , bcrypt = require('bcrypt')
  , imagemagick = require('imagemagick')
  , fs = require('fs')
  , check = require('validator').check


_ = require('underscore')
Backbone = require('backbone')
require(__dirname + '/public/js/libs/backbone.validation/backbone.validation') 
_.extend(Backbone.Model.prototype, Backbone.Validation.mixin)

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

function forceXhr(req, res, next) {
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
    res.render('layout', {layout: true, pageTitle: pageTitle, user: user });
  }
}


app.get('/', forceXhr, function(req, res) {
  var pageTitle = 'Brasilia USA - For the Finest in Brasilia Espresso Machines';
  res.render('index', function(err, html){
    res.send({title: pageTitle, body: html});
  });
});

app.get('/support', forceXhr, function(req, res) {
  res.render('static/support', function(err, html){
    res.send({title: 'Support', body: html});
  });
});

app.get('/history', forceXhr, function(req, res) {
  res.render('static/history', function(err, html){
    res.send({title: 'History', body: html});
  });
});

app.get('/our-team', forceXhr, function(req, res) {
  res.render('static/our-team', function(err, html){
    res.send({title: 'Our Team', body: html});
  });
});

app.get('/technology', forceXhr, function(req, res) {
  res.render('static/technology', function(err, html){
    res.send({title: 'Technology', body: html});
  });
});

app.get('/what-we-do', forceXhr, function(req, res) {
  res.render('static/what-we-do', function(err, html){
    res.send({title: 'What We Do', body: html});
  });
});

app.get('/dash', forceXhr, function(req, res) {});

app.get('/login', forceXhr, function(req, res) {});

app.get('/new-product', forceXhr, function(req, res) {});

app.post('/session', function(req, res) {
  var key
  var spec = {}
  try {
    check(req.body.login).isEmail()
    key = 'email'
  } catch(e) {
    key = 'username'
  }
  spec[key] = req.body.login  

  db.collection('users').findOne(spec, function(err, user){
    if (!user)
      return res.send({message: 'user not found'});
    bcrypt.compare(req.body.password, user.password, function(err, match) {
      if (!match) 
        return res.send({message: 'user not found'});
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

app.get('/signup', restrict, forceXhr, function(req, res) { });

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

/* Products */
function getProducts(cat, res){
  db.collection('products').find({'category.slug': cat}).toArray(function(err, products) {
    res.send(products);
  })
}

app.get('/:category/:slug/edit', forceXhr, function(req, res) {})


app.get('/espresso-machines', forceXhr, function(req, res) { 
  getProducts('espresso-machines', res) 
})

app.get('/espresso-grinders', forceXhr, function(req, res) { 
  getProducts('espresso-grinders', res) 
})

/* Product */
function getProduct(slug, res){
  db.collection('products').findOne({slug: slug}, function(err, product){
    res.send(product);
  })
}

app.get('/espresso-machines/:slug', forceXhr, function(req, res) {
  getProduct(req.params.slug, res)
})

app.get('/espresso-grinders/:slug', forceXhr, function(req, res) {
  getProduct(req.params.slug, res)
})


/*
app.get('/products', function(req, res) {
  db.collection('products').find().toArray(function(err, result) {
      if (err) throw err
      res.send(result)
  })
})
*/
function toSlug(text, options){
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}
/*
app.post('/products', restrict, function(req, res) {
  req.body.slug = toSlug(req.body.name)
  db.collection('products').insert(req.body, function(err, result){
    var product = result[0]
    res.send(product)
  })
})
*/

app.put('/espresso-machines/:slug', restrict, function(req, res) {
  req.body._id = db.ObjectID.createFromHexString(req.body._id)
  db.collection('products').save(req.body)
  res.send(req.body)
})

function toSlugFile(filename){
  var regex = /^(.+)\.([a-z]+)/
  var match = regex.exec(filename);
  var name = match[1]
  var extension = match[2]
  name = toSlug(name) 
  return name + '.' + extension
}


app.post('/upload', restrict, function(req, res){
  req.files.file.name = toSlugFile(req.files.file.name)

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
        done(file.name)
      })
    })
  }
 
  function done(name) {
    console.log('image manipulation done and saved')
    res.send({
      success: true, 
      message: 'image resized and saved', 
      data: {name: name}
    })    
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
