define(function(require) {

  return Backbone.Model.extend({

    validation: {
      email:        {required: true},
      password:     {required: true}
    }, 

  })
})
