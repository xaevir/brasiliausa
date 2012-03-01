define(function(require) {

var tpl = require('text!templates/navbar/main-menu.jade')

return Backbone.View.extend({
  
  template: jade.compile(tpl),

  initialize: function(){
    window.user.on('change', this.render, this)
    _.bindAll(this, 'render') 
  },

  render: function() {
    var loggedIn = window.user.isLoggedIn() 
    var template = this.template({user: loggedIn});
    $(this.el).html(template)
    return this
  },

})
})
