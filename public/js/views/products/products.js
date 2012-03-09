define(function(require) {

var AlertView = require('views/site/alert')
  , tpl = require('text!templates/products/product-item.jade')

var ItemView = Backbone.View.extend({

  tagName:  "li",

  template: jade.compile(tpl),

  events: {
    "click a": "preventDefault",
    "click a:not([href^='#'])": "pushState",
  },

  initialize: function(){
    _.bindAll(this, 'render') 
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

  render: function() {
    var template = this.template(this.model.toJSON())
    $(this.el).html(template);
    return this;
  },

});



return Backbone.View.extend({

  tagName: 'ul',

  className: 'products',

  initialize: function() {
    //this.collection.bind('reset', this.addAll, this)
  },

  addOne: function(model) {
    var view = new ItemView({model: model});
    $(this.el).append(view.render().el)
  },

  render: function() {
    this.collection.each(this.addOne, this);
    return this
  },
})

})
