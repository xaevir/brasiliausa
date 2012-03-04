define(function(require) {

return Backbone.View.extend({
  
  el: '.products',

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

})
})
