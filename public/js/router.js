define(function(require) {

var SignupView = require('views/users/signup')
  , LoginView = require('views/users/login')         
  , Products = require('collections/products') 
  , Product = require('models/product') 
  , ProductsView = require('views/products/products')
  , ProductView = require('views/products/product')
  , ProductEditView = require('views/products/product-edit')
  , ContextualMenuView = require('views/products/contextual-menu')
  , PageHeaderView = require('views/site/page-header')

function showStatic(path) {
    $.get(path, function(obj) {
      $('#app').html(obj.body);
       document.title = obj.title;
    });
}

var alreadyLoggedIn = function(callback) { 
  if (window.user.isLoggedIn()) 
    return this.navigate('/', true)
  callback.apply(this, Array.prototype.slice.call(arguments,1)); 
}

var restrict = function(callback) { 
  if (!window.user.isLoggedIn()) 
    return this.navigate('/login', true)
  callback.apply(this, Array.prototype.slice.call(arguments,1)); 
}

function autoResetRouter(){ 
  _(this.routes).each(function(destination) {
    _(this.routes).each(function(other) {
      if (destination === other) return;
      // route:x => reset_y
      if(_.has(this, 'reset_'+other))
        this.bind('route:'+destination, this['reset_'+other]);
    }, this);
  }, this);
}

return Backbone.Router.extend({

  initialize: function() {

    this.on('all', this.highlight)
    _.bindAll(this); 
    autoResetRouter.call(this)
    window.dispatcher.on('session:logout', this.logout, this)

    this.route("login", "login", _.wrap( function(){
      this.loginView = new LoginView({context: 'main'})
      this.loginView.render()
      $('#app').html(this.loginView.el)
      document.title = 'Login'
    }, alreadyLoggedIn))

    this.route(':category/:slug/edit', 'edit', _.wrap( function(category, slug){
      var product = new Product()
      var url = '/'+category+'/'+slug
      product.fetch({url: url, success: function(model, res){
        var productEditView = new ProductEditView({model: model})
        $('#app').html(productEditView.render().el)
        document.title = 'Edit Product'
      }})
    }, restrict))

    this.route('espresso-machines', 'espresso-machines', function(){
      this.products('espresso-machines')
    })

    this.route('espresso-grinders', 'espresso-machines', function(){
      this.products('espresso-grinders')
    })

    this.route('espresso-machines/:slug', 'espresso-machines', function(slug){
      this.product('espresso-machines', slug )
    })

  },

  products: function(category){ 
    var products = new Products({category: category})
    var self = this
    products.fetch({success: function(collection, res){
      var productsView = new ProductsView({collection: products})  
      var template = productsView.render().el
      $('#app').html(template)
      var model = products.at(0)
      var header = model.get('category').name
      self.pageHeaderView = new PageHeaderView({header: header}) 
      self.pageHeaderView.render()
      document.title = header 
    }})
  },  

  'reset_products': function(){
    if (this.pageHeaderView)
      this.pageHeaderView.remove()
  },


  routes: {
      '':               'home'
    , 'support':        'support'
    , 'technology':     'technology'
    , 'history':        'history'
    , 'our-team':       'our-team'
    , 'technology':     'technology'
    , 'what-we-do':     'what-we-do'
    , 'signup':         'signup'
    , 'new-product':    'new-product'
    , 'products':       'products'
  },

  home: function() { showStatic('/') },
   
  support: function(){ showStatic('/support') },

  technology: function(){ showStatic('/technology') },

  history: function(){ showStatic('/history') },

  'our-team': function(){ showStatic('/our-team') },

  'what-we-do': function(){ showStatic('/what-we-do')},

  'new-product': function(){
    if (!window.user.isLoggedIn()) 
      return this.navigate('/login', true)
    var productView = new ProductView({model: new Product, collection: this.products})
    $('#app').html(productView.renderEdit().el)
    document.title = 'New Product'
    // var productEditView = new ProductEditView({collection: collection, model: new Product()})
  },

  product: function(category, slug){
    var product = new Product()
    var url = '/'+category+'/'+slug
    product.fetch({url: url, success: function(model, res){
      var productView = new ProductView({model: model})
      $('#app').html(productView.render().el)
      document.title = res.title 

      if (window.user.isLoggedIn()){ 
        this.contextualMenuView = new ContextualMenuView({model: model})
        var template = this.contextualMenuView.render().el
        $('#app').prepend(template)
        document.title = model.get('name') + ' - ' + model.get('category').name
      }
    }})
  },

  'reset_product': function(){
    if (this.contextualMenu)
      this.contextualMenu.remove()
  },



  signup: function(){ 
    if (window.user.isLoggedIn()) 
      return this.navigate('/', true)
    this.signupView = new SignupView({context: 'main'})
    this.signupView.render();
    $('#app').html(this.signupView.el);
    document.title = 'Sign Up';
  },


  logout: function(){
    console.log('router.logout.on->session:logout')
    $.ajax({
      type: "DELETE",
      url: "/session",
      success: function(){
        window.user.clear(); 
        var router = new Backbone.Router();
        router.navigate('login', {trigger: true})
      }
    });
  },

  highlight: function(route, section) {
    route = route.replace('route:', '/');
    if (route === '/home') 
      route = '/' 
    if (route == '/technology' || 
        route == '/history' ||
        route == '/our-team' ||
        route == '/what-we-do'){
          route = '#menu1' 
        }
    var hrefString = "a[href='" + route + "']"
    var el = $(hrefString, '.navbar');
    if (el.parent().hasClass('active')) 
        return;
    else {
        $('.navbar li.active').removeClass('active');
        var parent = el.parent(); 
        if (route== '/') return 
        parent.addClass('active');
    }
  },

});

});
