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

  require('order!libs/jade/jade')
  require('order!jquery')
  require('order!libs/utilities')
  require('order!underscore')
  require('order!backbone')
  require('order!libs/backbone.validation/backbone.validation')
  require('order!/bootstrap/js/bootstrap-dropdown.js')
  require('order!/bootstrap/js/bootstrap-modal.js')
  require('order!/bootstrap/js/bootstrap-tab.js')
  require('order!/bootstrap/js/bootstrap-alert.js')
  require('order!libs/jquery-iframe-transport/jquery.iframe-transport')  

  var App = require('order!app')

  App.initialize();

});
