define(function(require) {

//var hogan = require('libs/hogan.js/web/builds/1.0.5/hogan-1.0.5.min.amd')         
//  , Reply = require('models/reply') 

var ItemView = Backbone.View.extend({

  tagName:  "li",
  className: 'thumb',

  initialize: function() {
    _.bindAll(this, 'render');
  },

  render: function() {
    var body = this.model.get('body')
    var template = this.template.render({body: body});
    $(this.el).html(template);
    return this;
  },

})


return  Backbone.View.extend({

  className: 'messages',  
  tagName: 'ul',

  counter: 1,

  template: hogan.compile('<li {{#stripe}}class="{{className}}"{{/stripe}}>{{body}}</li>'),

  initialize: function() {
    _.bindAll(this, 'render');
    this.collection.bind('add', this.addOne, this)
  },

  addOne: function(model) {
    var tplVars = {
      body: model.get('body'),
    }
    if (!(this.counter % 2)) {
      tplVars.stripe = true;
      tplVars.className = 'even'
    }
    var template = this.template.render(tplVars)
    $(this.el).append(template)
    this.counter += 1
  },

  render: function() {
    this.collection.each(this.addOne, this);
    return this
  },
})

})
