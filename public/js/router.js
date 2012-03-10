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
  , SubnavView = require('views/products/subnav')

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



//    _.each(['newProduct'], function(method){ 
//      this[method] = _.wrap(this[method], restrict); 
//    }, this)

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
    , 'products':       'products'
    , 'products/:slug/edit': 'productEdit'
    , 'products/new'  : 'newProduct'
    , 'products/:slug': 'product'
    , 'files'         : 'files'
    , 'login'         : 'login'
  },

  newProduct: _.wrap(function(){
      var product = new Product()
      var productEditView = new ProductEditView({model: product})
      $('#app').html(productEditView.render().el)
      document.title = 'New Product'
    }, restrict),

  home: function() { showStatic('/') },
   
  support: function(){ showStatic('/support') },

  technology: function(){ showStatic('/technology') },

  history: function(){ showStatic('/history') },

  'our-team': function(){ showStatic('/our-team') },

  'what-we-do': function(){ showStatic('/what-we-do')},

  'files': function(){
    $.get('/files', function(files){
      _.each(files, function(file){
        $('body').append('<img src="/files/'+file.filename+'" />')    
      })  
    
    })   
  },

  productEdit: _.wrap(function(slug){
    var product = new Product({slug:slug})
    product.fetch({success: function(model, res){
      var productEditView = new ProductEditView({model: model})
      $('#app').html(productEditView.render().el)
      document.title = 'Edit Product'
    }})
  }, restrict),

  products: function(){ 
    var products = new Products()
    var self = this
    products.fetch({success: function(collection, res){
      this.productsView = new ProductsView({collection: collection})  
      var template = productsView.render().el
      $('#app').html(template)
      self.subnavView = new SubnavView()
      //self.pageHeaderView = new PageHeaderView({header: header}) 
      //self.pageHeaderView.render()
      document.title = 'Products' 
    }})
  },  

  'reset_products': function(){
    if (this.pageHeaderView)
      this.pageHeaderView.remove()
    if (this.subnavView)
      this.subnavView.remove()
  },

  contextualMenu: function(model){
    if (window.user.isLoggedIn()){ 
      this.contextualMenuView = new ContextualMenuView({model: model})
      var template = this.contextualMenuView.render().el
      $('.nav.main').after(template)
    }
  },

  product: function(slug){
    var product = new Product({slug: slug})
    self = this
    product.fetch({success: function(model, res){
      var productView = new ProductView({model: model})
      $('#app').html(productView.render().el)
      document.title = model.get('name')+' - '+model.get('category').name
      self.contextualMenu(model) 

      var header = model.get('category').name
      if (model.get('subcategory').name)
        header += ' / ' +model.get('subcategory').name

      self.pageHeaderView = new PageHeaderView({header: header}) 
      self.pageHeaderView.render()

    }})
  },

  'reset_product': function(){
    if (this.contextualMenuView)
      this.contextualMenuView.remove()
    if (this.pageHeaderView)    
      this.pageHeaderView.remove()
  },


  login: _.wrap(function(){
    this.loginView = new LoginView({context: 'main'})
    this.loginView.render()
    $('#app').html(this.loginView.el)
    document.title = 'Login'
  }, alreadyLoggedIn),


  signup: function(){ 
    if (window.user.isLoggedIn()) 
      return this.navigate('/', true)
    this.signupView = new SignupView({context: 'main'})
    this.signupView.render();
    $('#app').html(this.signupView.el)
    document.title = 'Sign Up'
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
