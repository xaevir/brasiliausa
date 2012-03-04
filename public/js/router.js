define(function(require) {

var SignupView = require('views/users/signup')
  , LoginView = require('views/users/login')         
  , Products = require('collections/products') 
  , Product = require('models/product') 
  , ProductView = require('views/products/product')
  , ProductsLinks = require('views/products/products-links')
  , ContextualMenu = require('views/products/contextual-menu')

function showStatic(path) {
    $.get(path, function(obj) {
      $('#app').html(obj.body);
       document.title = obj.title;
    });
}



return Backbone.Router.extend({

  initialize: function() {
    _.bindAll(this); 
    this.autoResetRouter()
    this.on('all', this.highlight)
    window.dispatcher.on('session:logout', this.logout, this)
    this.products = new Products()
    this.products.fetch()
  },

  autoResetRouter: function(){
    _(this.routes).each(function(destination) {
      _(this.routes).each(function(other) {
        if (destination === other) return;
        // route:x => reset_y
        if(_.has(this, 'reset_'+other))
          this.bind('route:'+destination, this['reset_'+other]);
      }, this);
    }, this);
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
    , 'login':          'login'
    , 'new-product':    'new-product'
    , 'espresso-machines': 'espresso-machines'
    , 'espresso-machines/:name': 'product'
  },

  home: function() { showStatic('/') },
   
  support: function(){ showStatic('/support') },

  technology: function(){ showStatic('/technology') },

  history: function(){ showStatic('/history') },

  'our-team': function(){ showStatic('/our-team') },

  'what-we-do': function(){ showStatic('/what-we-do')},

  'product': function(name){
    $.get('/espresso-machines/' + name, function(res) {
      $('#app').html(res.body)
      document.title = res.title 
      if (window.user.isLoggedIn()){ 
        this.contextualMenu = new ContextualMenu({doc: res.doc})  
        var template = this.contextualMenu.render().el
        $('.user-menu').before(template)
      }
    })
  },

  'reset_product': function(){
    if (this.contextualMenu)
      this.contextualMenu.remove()
  },

  'espresso-machines': function(){ 
    $.get('/espresso-machines', function(res) {
      $('#app').html(res.body);
      document.title = res.title 
      var productsLink = new ProductsLinks() 

    })
  },  

  'new-product': function(){
    if (!window.user.isLoggedIn()) 
      return this.navigate('/login', true)
    var productView = new ProductView({model: new Product, collection: this.products})
    $('#app').html(productView.renderEdit().el)
    document.title = 'New Product'
    // var productEditView = new ProductEditView({collection: collection, model: new Product()})
  },

  signup: function(){ 
//    if (window.user.isLoggedIn()) 
//      return this.navigate('/', true)
    this.signupView = new SignupView({context: 'main'})
    this.signupView.render();
    $('#app').html(this.signupView.el);
    document.title = 'Sign Up';
  },

  login: function(){ 
    if (window.user.isLoggedIn()) 
      return this.navigate('/', true)
    /* would cache but its not resetting password field */
    this.loginView = new LoginView({context: 'main'})
    this.loginView.render()
    $('#app').html(this.loginView.el);
    document.title = 'Login';
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
        parent.addClass('active');
    }
  },


});

});
