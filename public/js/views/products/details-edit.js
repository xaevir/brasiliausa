define(function(require) {

var tpl = require('text!templates/products/product_details.jade')
  , AlertView = require('views/site/alert')
  , Product = require('models/product')
  , Products = require('collections/products')

_.extend(Backbone.Validation.callbacks, {
  valid: function(view, attr, selector) {
    var el = view.$('[' + selector + '~=' + attr + ']')
    var errorEl = el.next() 
    if (errorEl.hasClass('error'))  
      errorEl.remove()
  },
  invalid: function(view, attr, error, selector) {
    // TODO add multiple errors
    var el = view.$('[' + selector + '~=' + attr + ']')
    if (el.next().hasClass('error')) return 
    el.after('<label class="error">' + error + '</label>')
  }
});

return Backbone.View.extend({

  template: jade.compile(tpl),

  className: 'well',

  events: {
    'submit form' : 'submit',
  },

  initialize: function(options){
    _.bindAll(this); 
    Backbone.Validation.bind(this);
//    this.model.on('validated:valid', this.save, this) 
    this.model.on('sync', this.synched, this)
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
    var subcatLabel = this.$('option[value="' + params.subcategory + '"]').html()
    params.subcategory = {slug: params.subcategory, name: subcatLabel}
    this.model.save(params);
  },

  synched: function(){
    //this.newProduct()
    // navigate to this product
    var successAlert = new AlertView({
      message: '<strong>Saved</strong>',
      type: 'info'
    })
    successAlert.fadeOut()
  },


});

});
