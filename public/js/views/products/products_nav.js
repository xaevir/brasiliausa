define(function(require) {

var AlertView = require('views/site/alert')
  , hogan = require('libs/hogan.js/web/builds/1.0.5/hogan-1.0.5.min.amd')

var LinksView = Backbone.View.extend({
  events: {
    "click a": "preventDefault",
    "click a:not([href^='#'])": "pushState",
  },
  preventDefault: function(e) {
    e.preventDefault() 
  },

  pushState: function(e) {
    var linkEl = $(e.currentTarget)
    var href = linkEl.attr("href")
    var router = new Backbone.Router()
    router.navigate(href.substr(1), true)
  },
})

var ItemView = LinksView.extend({

  tagName:  "li",

  template: hogan.compile('<a href="/dash/products/{{name}}">{{name}}</a>'),


  initialize: function(){
    _.bindAll(this, 'render') 
  },

  render: function() {
    var name = this.model.get('name')
    var template = this.template.render({name: name});
    $(this.el).html(template);
    return this;
  },

});


var NewLinkView = LinksView.extend({

  tagName:  "li",

  initialize: function() {
    $(this.el).append('<a href="/dash/products/new" class="btn new">New Product</a>')
  },

  render: function(){
    return this 
  }
})

return Backbone.View.extend({

  className: 'nav nav-list',

  initialize: function() {
    this.collection.bind('reset', this.addAll, this)
    this.collection.fetch()
    _.bindAll(this, 'addAll') 
    this.collection.on('add', this.addOne, this)
  },

  addOne: function(model) {
    var view = new ItemView({model: model});
    $(this.el).append(view.render().el)
  },

  addAll: function() {
    var linkView = new NewLinkView()
    $(this.el).append(linkView.render().el)
    this.collection.each(this.addOne, this);
  },
})

})
