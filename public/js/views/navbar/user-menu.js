define(function(require) {

var hogan = require('libs/hogan.js/web/builds/2.0.0/hogan-2.0.0.min.amd')
  , userMenuTpl = require('text!templates/users/userNav.mustache')


return Backbone.View.extend({

  template: hogan.compile(userMenuTpl),

  events: {
    'click a[href="#logout"]': 'logout'
  },

  logout: function(){
    window.dispatcher.trigger('session:logout') 
    console.log('user-menu.logout.trigger->session:logout')
  },

  initialize: function(options){
    _.bindAll(this, 'render'); 
    window.user.on('change', this.render, this); 
  },

  render: function(user) {
    var template;
    if (window.user.isLoggedIn()) {
      template = this.template.render({user: {name: window.user.get('username') }})
    } else {
      template = this.template.render({user: false});
      $('.dropdown-toggle').dropdown()
    }
    $(this.el).html(template)
    return this;
  },
})

});  
