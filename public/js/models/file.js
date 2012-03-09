define(function(require) {

return Backbone.Model.extend({

  url : function() {
    var base = '/files/'
    if (this.isNew()) return base;
    return base + this.get('name');
  },

  defaults: {
    name: '',
    type: '',
    medium: '',
    thumb: '',
  },


})
})
