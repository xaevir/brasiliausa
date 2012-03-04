define(function(require) {

var tpl = require('text!templates/products/contextual-menu.jade')

return Backbone.View.extend({

  className: 'contextual-menu nav',
  tagName: 'ul',

  template: jade.compile(tpl),

  events: {
    "click a": "preventDefault",
    "click a:not([href^='#'])": "pushState",
  },

  initialize: function(options){
    this.doc = options.doc
    _.bindAll(this, 'render') 
  },

  render: function() {
    var template = this.template({
      slug: this.doc.slug, 
      category: this.doc.category
    })
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
