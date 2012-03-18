// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    text: 'libs/require/text',
    order: 'libs/require/order',
    templates: '../templates'
  }

});


/*
 *  calling them in order bc not amd.
 *  in order to call App, the fn has to be passed
 *  placeholder args
 */ 
define(function(require) {

  require('order!jquery')
  require('order!underscore')
  require('order!backbone')
  require('order!libs/backbone.validation/backbone.validation')
  require('order!libs/utilities')
  require('libs/hogan.js/web/builds/2.0.0/hogan-2.0.0')
  require('order!/static/bootstrap/js/bootstrap-dropdown.js')
  require('order!/static/bootstrap/js/bootstrap-modal.js')
  require('order!/static/bootstrap/js/bootstrap-tab.js')
  require('order!/static/bootstrap/js/bootstrap-alert.js')
  require('order!libs/jquery-iframe-transport/jquery.iframe-transport')  

  var App = require('order!app')

  App.initialize();

});
