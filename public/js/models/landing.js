define(function(require) {

  return Backbone.Model.extend({
    
    url: '/landing',

    validation: {
      email: {
        required: true,
        pattern: 'email',
        msg: 'Please enter a valid email'
      },
    }, 

  })
})
