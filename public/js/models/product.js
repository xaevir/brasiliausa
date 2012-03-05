define(function(require) {

return Backbone.Model.extend({

  idAttribute: "_id",

/*  initialize: function(options){
    _.bindAll(this, 'url'); 
  },
*/
  isNew: function(){
    return this.get('slug') == null
  },

  url : function() {
    if (!this.get('slug')) throw 'model needs to be set first'
    var base = '/' + this.get('category').slug + '/'
    if (this.isNew()) return base;
    return base + this.get('slug');
  },

  defaults: {
    name: '',
    description: '',
    category: '',
    subcategory: '',
  },

  validation: {
    name: {required: true},
    description: {required: true},
    category: {required: true},
  },

})
})
