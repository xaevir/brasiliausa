var express = require('express')
  , mongo = require('mongoskin')
  , RedisStore = require('connect-redis')(express)
  , bcrypt = require('bcrypt')
  , imagemagick = require('imagemagick')
  , fs = require('fs')
  , check = require('validator').check
  , nodemailer = require("nodemailer")
  , httpProxy = require('http-proxy')
  , http = require('http')
  , static = require('node-static')
  , Hogan = require('hogan.js')


var fileServer = new(static.Server)('./public', { cache: 0 });

GridStore = require('mongodb').GridStore

var smtpTransport = nodemailer.createTransport("SMTP",{
    host: "localhost",
})

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

app.get('/*', function(req, res, next) {
  if (req.headers.host.match(/^www/) !== null ) {
    res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
  } else {
    next();     
  }
})

function userData(session){
  var data = {user: {}}
  if (session.user) {
    data.user = {
      username: session.user.username, 
      _id:  session.user._id
    }
  }
  return data
}

app.get('/*', function(req, res, next) { /* force xhr */
  if (!(req.xhr)) 
    res.render('layout', userData(req.session))
  else 
    next()
})

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.get('/', function(req, res) {
  res.render('index', function(err, html){
    res.send({title: 'Brasilia USA', body: html});
  });
})

app.get('/support', function(req, res) {
  res.render('static/support', function(err, html){
    res.send({title: 'Support', body: html});
  });
});

app.get('/history', function(req, res) {
  res.render('static/history', function(err, html){
    res.send({title: 'History', body: html});
  });
});

app.get('/our-team', function(req, res) {
  res.render('static/our-team', function(err, html){
    res.send({title: 'Our Team', body: html});
  });
});

app.get('/technology', function(req, res) {
  res.render('static/technology', function(err, html){
    res.send({title: 'Technology', body: html});
  });
});

app.get('/what-we-do', function(req, res) {
  res.render('static/what-we-do', function(err, html){
    res.send({title: 'What We Do', body: html});
  });
});

app.get('/dash', function(req, res) {});

app.get('/login', function(req, res) {});

app.get('/contact', function(req, res) {});

app.get('/new-product', function(req, res) {});

app.post('/contact', function(req, res) {
  // Message object
  var message = {
      
      // sender info
      from: 'Brasilia Contact Page <contact@brasiliausa.com>',
      
      // Comma separated list of recipients
      to: 'bobby.chambers33@gmail.com',
      
      // Subject of the message
      subject: 'Feedback from contact page', //
  }

  // TODO add cache from mailer code
  fs.readFile(__dirname + '/views/email.mustache', function(err, result){
    var template = result.toString()
    template = Hogan.compile(result.toString())
    message.html = template.render(req.body)
    // send mail with defined transport object
    smtpTransport.sendMail(message, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
        smtpTransport.close(); // shut down the connection pool, no more messages
        res.send({
          success: true, 
          message: 'email sent'
        })

    });
  })
})


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

app.get('/signup', restrict, function(req, res) { });

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
  db.collection('products').find().toArray(function(err, products) {
    res.send(products);
  })
})

app.post('/products', restrict, function(req, res) {
  req.body.slug = toSlug(req.body.name)
  db.collection('products').insert(req.body, function(err, result){
    var product = result[0]
    res.send(product)
  })
})

app.put('/products/:slug', restrict, function(req, res) {
  // Hack: this is repeated from post action
  req.body.slug = toSlug(req.body.name)
  req.body._id = db.ObjectID.createFromHexString(req.body._id)
  db.collection('products').save(req.body)
  res.send(req.body)
})

app.get('/products/:slug', function(req, res) {
  db.collection('products').findOne({slug: req.params.slug}, function(err, product){
    res.send(product);
  })
})

app.get('/products/:slug/edit', function(req, res) {})

app.get('/products/new', function(req, res) {})

function toSlug(text, options){
  return text
    .replace(/[^a-zA-z0-9_-]+/g, '')
    .replace(/ +/g, '-')
}


function toSlugFile(filename){
  // if this doesnt match. server stops
  // ie. pic.JPG was crashing server added A-Z to regex
  var regex = /^(.+)\.([a-zA-Z]+)/
  var match = regex.exec(filename);
  var name = match[1]
  var extension = match[2]
  name = toSlug(name) 
  return name + '.' + extension
}

app.del('/files/:slug', restrict, function(req, res){
  GridStore.unlink(db.db, req.params.slug, function(err, gs) {
    console.log('orginal deleted')
    GridStore.unlink(db.db, req.body.thumb, function(err, gs) {
      console.log('thumbnail removed')
      GridStore.unlink(db.db, req.body.medium, function(err, gridStore) {
        console.log('medium removed')
        res.send({
          success: true, 
          message: 'file removed', 
          data: {name: req.params.slug }
        })
      })
    })
  })
})
/*
 * handling all me.jpg pics. Create folder 
 * for each person and save in 
 */ 

app.post('/upload/:product_id', restrict, function(req, res){
  req.files.file.name = toSlugFile(req.files.file.name)

  var file = req.files.file

  var regex = /^(.+)\.([a-zA-Z]+)/
  var match = regex.exec(file.name);
  var nameNoExt = match[1]
  var extension = match[2]

  if (file.type == 'application/pdf') {
    var thumbName = nameNoExt+'_thumb_pdf.png'
    var mediumName = nameNoExt+'_medium_pdf.png'
    var image_input = file.path + '[0]' 
    var input = file.path
    var output = '/tmp/'+file.name+'.png'
    var mediumSize = '300x400>'
    var thumbnailSize = '175x155>'
    var fs_opts = {"content_type": file.type, product_id: req.params.product_id, main_file: file.name}
    var fs_opts_thumb = {"content_type": 'image/png',  product_id: req.params.product_id, main_file: file.name}
    var fs_opts_medium = {"content_type": 'image/png', product_id: req.params.product_id, main_file: file.name}
  } else {
    var thumbName = nameNoExt+'_thumb.'+extension
    var mediumName = nameNoExt+'_medium.'+extension
    var input = image_input = file.path
    var output = '/tmp/'+file.name
    var mediumSize = '400x500>'
    var thumbnailSize = '175x155>'
    var fs_opts = fs_opts_thumb =  fs_opts_medium = {"content_type": file.type, product_id: req.params.product_id, main_file: file.name}
  }
 

  var gs_original = new GridStore(db.db, file.name, "w", fs_opts)
  var gs_medium = new GridStore(db.db, mediumName, "w", fs_opts_medium)
  var gs_thumb = new GridStore(db.db, thumbName, "w", fs_opts_thumb)

  startWithMedium()

  function startWithMedium(){
    imagemagick.convert([image_input, '-resize', mediumSize, '-quality', '100', output], function(err, metadata){
      gs_medium.open(function(err, gs) {
        gs.writeFile(output, function(err, reply) {
          fs.unlink(output, function (err) {
            console.log('image resized to 400x500 and saved')
            gs.close(function(err, reply){
              createThumb() 
            })
          })
        })
      })
    })
  }

  function createThumb(){
    imagemagick.convert([image_input, '-resize', thumbnailSize, '-quality', '100', output], function(err, metadata){
      gs_thumb.open(function(err, gs) {
        gs.writeFile(output, function(err, reply) {
          fs.unlink(output, function (err) {
            console.log('image thumbnail created and saved')
            gs.close(function(err, reply){
              saveOriginal()
            })
          })
        })
      })
    })
  }

  function saveOriginal(){
    gs_original.open(function(err, gs) {
      gs.writeFile(input, function(err, reply) {
        fs.unlink(input, function (err) {
          console.log('original saved')
          gs.close(function(err, reply){
            done(file.name)
          })
        })
      })
    })
  }
 
  function done(name) {
    console.log('image manipulation done and saved')
    res.send({
      success: true, 
      message: file.type+' resized and saved',
      data: {
        name: name, 
        type: file.type,
        medium: mediumName,
        thumb: thumbName,
      }
    })    
  }
})

app.get('/files', function(req, res){
  db.collection('fs.files').find().toArray(function(err, products) {
    res.send(products);
  })
})



httpProxy.createServer(function (req, res, proxy) {
  if (req.url.match(/^\/static/) !== null ) 
    return fileServer.serve(req, res)

  var match = /^\/files\/(.+)/.exec(req.url)
  if (match !== null)
    return serveDbFile(req, res, match[1]) 
  
  
  proxy.proxyRequest(req, res, {
    host: 'localhost',
    port: 8001
  })
  
}).listen(8000);


function serveDbFile(req, res, slug){
  db.gridfs().open(slug, 'r', function(err, file) {
    res.header('Content-Type', file.contentType);
    res.header('Content-Length', file.length);
    //res.header('Content-Disposition', 'attachment; filename='+req.params.slug)
    file.stream(true).pipe(res)
  })
}

app.listen(8001);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

