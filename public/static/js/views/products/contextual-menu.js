define(function(require) {

var tpl = require('text!templates/products/contextual-menu.mustache')

return Backbone.View.extend({

  className: 'contextual-menu',
  tagName: 'ul',

  template: Hogan.compile(tpl),

  events: {
    "click a": "preventDefault",
    "click a:not([href^='#'])": "pushState",
  },

  initialize: function(options){
    _.bindAll(this, 'render') 
  },

  render: function() {
    var locals =this.model.toJSON()
    var template = this.template.render(locals)
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
