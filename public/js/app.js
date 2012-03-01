define(function(require) {

var MainRouter = require('routers/main')
  , User = require('models/user')
  , NavBar = require('views/navbar/navbar')         

  function setUser(){
    if (window.config.user)  
      window.user.set(window.config.user)
  }

  var initialize = function(){
     
    window.dispatcher = _.clone(Backbone.Events)
  
    window.user = new User()
    setUser()

    var navBar = new NavBar()
    navBar.render()

    var mainRouter = new MainRouter()
    Backbone.history.start({pushState: true});
  }

  return {
    initialize: initialize
  };
});
