define(function(require) {

var tpl = require('text!templates/products/contextual-menu.jade')

return Backbone.View.extend({

  className: 'nav nav-pills',
  tagName: 'ul',

  template: jade.compile(tpl),

  events: {
    "click a": "preventDefault",
    "click a:not([href^='#'])": "pushState",
  },

  initialize: function(options){
    _.bindAll(this, 'render') 
  },

  render: function() {
    var locals =this.model.toJSON()
    var template = this.template(locals)
    $(this.el).html(template)
    return this
  },

  preventDefault: function(e) {
    e.preventDefault() 
  },

  pushState: function(e) {
    var linkEl = $(e.currentTarget);
    var href = linkEl.attr("href");
    var router = new Backbone.Router();
    router.navigate(href.substr(1), true)
  },

})
})
