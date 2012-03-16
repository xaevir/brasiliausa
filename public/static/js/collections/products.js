define(function(require) {
  var Product = require('models/product')
  
  return Backbone.Collection.extend({

    model: Product,

    url : 'products',

  })
})
