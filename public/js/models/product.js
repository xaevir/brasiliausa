define(function(require) {

return Backbone.Model.extend({

  idAttribute: "_id",

  url: '/products',

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
