define(function(require) {
  var Product = require('models/product')

  return Backbone.Collection.extend({
      url: '/products',
      model: Product,
  })
})
