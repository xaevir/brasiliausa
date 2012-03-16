define(function(require) {

var tpl = require('text!templates/site/contact.jade')
  , Contact = require('models/contact') 
  , AlertView = require('views/site/alert')         

return Backbone.View.extend({

  template: jade.compile(tpl),

  className: 'contact',

  events: {
    'submit form' : 'submit',
  },

  initialize: function(options){
    _.bindAll(this); 
    this.model = new Contact()
    Backbone.Validation.bind(this)
    this.model.on('sync', this.notice, this) 
  },

  render: function(){
    var template = this.template()
    $(this.el).html(template);
    return this; 
  },

  submit: function(e) {
    e.preventDefault()
    var params = this.$('form').serializeObject();
    this.model.save(params);
  },

  notice: function(){
    var successAlert = new AlertView({
      message: '<strong>Thank you for the message.</strong>',
      type: 'info'
    })
    successAlert.fadeOut()
  },

});


});
