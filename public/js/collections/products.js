define(function(require) {
  var Product = require('models/product')
  
  return Backbone.Collection.extend({

    initialize: function(options) {
      this.category = options.category
    },

    model: Product,

    url : function() {
      return '/' + this.category + '/'
    },

  })
})
