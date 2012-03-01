define(function(require) {

var ProductEditView = require('views/products/edit')
  , ProductsNavView = require('views/products/products_nav')
  , Product = require('models/product') 
  , Products = require('collections/products') 


return Backbone.Router.extend({

  initialize: function(options) {
    this.collection = options.collection
    _.bindAll(this, 'productEdit'); 
    this.on('all', this.highlight)
  },

  routes: {
    'dash': 'dash',
    'dash/products/new': 'productNew',
    'dash/products/:name': 'productEdit',
    //'products/new'
   },

  productNew: function(){
    var model = new Product()
    var productEditView = new ProductEditView({model: model, collection: this.collection}) 
    $('.product-edit').html(productEditView.render().el)
  },

  productEdit: function(name){
    var selectedModel = this.collection.find(function(model){
      return model.get('name') == name
    })
    var productEditView = new ProductEditView({model: selectedModel, collection: this.collection}) 
    $('.product-edit').html(productEditView.render().el)
  },

  highlight: function(route, section) {
    route = route.replace('route:', '/');
    var hrefString = "a[href='" + route + "']"
    var el = $(hrefString, '.sidebar-nav');
    if (el.parent().hasClass('active')) 
        return;
    else {
        $('.sidebar-nav li.active').removeClass('active');
        var parent = el.parent(); 
        parent.addClass('active');
    }
  },

});

});
