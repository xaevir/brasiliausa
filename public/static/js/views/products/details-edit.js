define(function(require) {

var tpl = require('text!templates/products/product_details.jade')
  , AlertView = require('views/site/alert')
  , Product = require('models/product')
  , Products = require('collections/products')


return Backbone.View.extend({

  template: jade.compile(tpl),

  className: 'well',

  events: {
    'submit form' : 'submit',
  },

  initialize: function(options){
    _.bindAll(this); 
    Backbone.Validation.bind(this)
//    this.model.on('validated:valid', this.save, this) 
  },

  render: function(){
    var locals = this.model.toJSON()
    var template = this.template(locals)
    $(this.el).html(template);
    return this; 
  },

  submit: function(e) {
    if (!window.user.isLoggedIn()) 
      return this.navigate('/', true)
    e.preventDefault()
    var params = this.$('form').serializeObject();
    var catLabel = this.$('option[value="' + params.category + '"]').html()
    params.category = {slug: params.category, name: catLabel}

    //setting name even tho the form value is empty 
    if (params.subcategory)
      var subcatLabel = this.$('option[value="' + params.subcategory + '"]').html()
    else 
      var subcatLabel = ''
    params.subcategory = {slug: params.subcategory, name: subcatLabel}

    this.model.save(params);
    this.synched()
  },

  synched: function(){
    var successAlert = new AlertView({
      message: '<strong>Saved</strong>',
      type: 'info'
    })
    successAlert.fadeOut()
  },


});

});
