define(function(require) {

var SignupView = require('views/users/signup')
  , LoginView = require('views/users/login')         
  , ProductsNavView = require('views/products/products_nav')
  , ProductEditView = require('views/products/edit')
  , Products = require('collections/products') 
  , Product = require('models/product') 
  , ProductsRouter = require('routers/products') 
  
function showStatic(path) {
    $.get(path, function(obj) {
      $('#app').html(obj.body);
       document.title = obj.title;
    });
}

return Backbone.Router.extend({

  initialize: function() {
    _.bindAll(this, 'signup', 'login', 'logout'); 
    this.on('all', this.highlight)
    window.dispatcher.on('session:logout', this.logout, this)
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
    , 'dash':           'dash'
  }

  , home: function() { showStatic('/') }

  , support: function(){ showStatic('/support') }

  , technology: function(){ showStatic('/technology') }

  , history: function(){ showStatic('/history') }

  , 'our-team': function(){ showStatic('/our-team') }

  , 'what-we-do': function(){ showStatic('/what-we-do') },

  dash: function(){
    if (window.user.isLoggedIn() == false) 
      return this.navigate('/login', true)
    var collection = new Products()
    var router = new ProductsRouter({collection: collection})
    $('#app').html('<div class="row"><div class="span3"><div class="sidebar-nav"></div></div><div class="span4 product-edit"></div></div>')
    var productsNavView = new ProductsNavView({collection: collection})
    $('.sidebar-nav').html(productsNavView.el)
    document.title = 'Documents';
    var productEditView = new ProductEditView({collection: collection, model: new Product()})
    $('.product-edit').html(productEditView.render().el)
  },

  signup: function(){ 
    if (window.user.isLoggedIn()) 
      return this.navigate('/', true)
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
