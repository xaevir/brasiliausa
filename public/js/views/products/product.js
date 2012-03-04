define(function(require) {

var AlertView = require('views/site/alert')         
  , ProductDetails = require('views/products/details') 
  , ProductDetailsEdit = require('views/products/details-edit') 
  , UploadView = require('views/files/upload') 

return Backbone.View.extend({

  className: 'product',

  initialize: function(options){
    $(this.el).append('<div class="details"></div>')
    $(this.el).append('<div class="files"></div>')
    _.bindAll(this, 'render'); 
  },

  render: function(){
    var productDetails = new ProductDetails({ el: this.$(".details"), model: this.model })
    return this; 
  },


  renderEdit: function(){
    var productDetailsEdit = new ProductDetailsEdit({ 
      el: this.$(".details"), 
      model: this.model,
      //collection: this.collection
    })
    productDetailsEdit.render()

    var uploadView = new UploadView({
      el: this.$('.files'), 
      model: this.model,
      collection
    
    })

    return this; 
  },


});

});
