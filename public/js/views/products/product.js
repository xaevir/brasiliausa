define(function(require) {

var AlertView = require('views/site/alert')
  , tpl = require('text!templates/products/product.jade')


return Backbone.View.extend({

  className:  "details",

  template: jade.compile(tpl),

  initialize: function(){
    _.bindAll(this, 'render') 
  },

  render: function() {
    var locals = this.model.toJSON()
    var template = this.template(locals)
    $(this.el).html(template);
    return this;
  },

});

})
