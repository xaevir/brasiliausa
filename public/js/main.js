require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    text: 'libs/require/text',
    order: 'libs/require/order',
  }
});


define(function(require) {
  require('order!jquery')
  require('order!underscore')
  require('order!backbone')
  require('order!libs/backbone.validation/backbone.validation')
  require('order!libs/utilities')
  require('order!libs/hogan.js/web/builds/2.0.0/hogan-2.0.0')
  require('order!libs/bootstrap/js/bootstrap-dropdown')
  require('order!libs/bootstrap/js/bootstrap-modal')
  require('order!libs/bootstrap/js/bootstrap-tab')
  require('order!libs/bootstrap/js/bootstrap-alert')
  require('order!libs/jquery-iframe-transport/jquery.iframe-transport')  
  
  var App = require('order!app')
                                                
  $.ajaxSetup({ cache: false });
  App.initialize();
  
})
