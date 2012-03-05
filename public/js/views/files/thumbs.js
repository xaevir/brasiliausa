define(function(require) {

var ItemView = Backbone.View.extend({

  tagName:  "li",

  template: function(filename){
    return '<img src="/images/thumbs/' + filename +'">'
  },

  initialize: function(options){
    this.filename = options.filename
    _.bindAll(this, 'render') 
  },

  render: function() {
    var template = this.template(this.filename)
    $(this.el).html(template)
    return this;
  },

});

return Backbone.View.extend({

  tagName: 'ul',
  className: 'thumbs',

  initialize: function() {
    _.bindAll(this); 
    this.model.on('change:files', this.render, this)
  },

  addOne: function(filename) {
    var view = new ItemView({filename: filename});
    var html = view.render().el
    $(this.el).append(html)
  },

  render: function() {
    var files = this.model.get('files')
    if (files)
      _.each(files, this.addOne, this);
    return this
  },
})

})
