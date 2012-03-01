define(function(require) {

var tpl = require('text!templates/products/edit.jade')
  , AlertView = require('views/site/alert')         
  , Product = require('models/product') 

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
    'change input[type="file"]':  'fileUpload',
  },

  initialize: function(options){
    _.bindAll(this); 
    Backbone.Validation.bind(this);
//    this.model.on('validated:valid', this.save, this) 
    this.model.on('sync', this.synched, this)
  },

  fileUpload: function(e){
    var inputEl = $(e.currentTarget)
    inputEl.addClass("loading")
    self = this
    $.ajax('/upload', {
      files: inputEl,
      iframe: true,
      dataType: "json",
    }).always(function() {
      inputEl.removeClass("loading")
    }).done(function(data) {
      inputEl.val('')
      self.showThumb()
    });
  

  },

  showThumb: function(){
    this.$('.product-pics').append('<img src="/images/thumbs/biggie.jpg">')
    var el = 'hi'
  },

  render: function(){
    var locals = this.model.toJSON()
    var template = this.template(locals)
    $(this.el).html(template);
    return this; 
  },

  newProduct: function(){
    this.model = new Product()  
    this.render()
  },

  editProduct: function(model){
    this.model = model 
    this.render()
  },

  submit: function(e) {
    e.preventDefault()
    var params = this.$('form').serializeObject();
    this.model.set(params)
    if (this.model.isNew()) 
      this.collection.create(this.model);
    else 
      this.model.save();
  },

  synched: function(){
    this.newProduct()
    var successAlert = new AlertView({
      message: '<strong>Product Saved</strong>',
      type: 'info'
    })
    successAlert.fadeOut()
  },

  close: function(){
    this.remove()
  },

});

});
