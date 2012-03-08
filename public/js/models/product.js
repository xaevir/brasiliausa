define(function(require) {

return Backbone.Model.extend({

  idAttribute: "_id",

  isNew: function(){
    return this.get('slug') == null
  },

  url : function() {
    var base = '/products/'
    if (this.isNew()) return base;
    return base + this.get('slug');
  },

  defaults: {
    name: '',
    description: '',
    category: '',
    subcategory: '',
    images: [],
    pdfs: []
  },

  validation: {
    name: {required: true},
    description: {required: true},
    category: {required: true},
  },

})
})
