define(function(require) {

var AlertView = require('views/site/alert')         
  , tpl = require('text!templates/files/thumbs.jade')

var ItemView = Backbone.View.extend({

  tagName:  "li",

  events: {
    "click a.remove": "remove",
    "click a.mainImage": 'setMainImage'
  },

  template: jade.compile(tpl),

  initialize: function(options){
    this.filename = options.filename
    this.contentType = options.contentType
    _.bindAll(this) 
  },

  setMainImage: function() {
  
  },

  remove: function(e) {
    e.preventDefault() 
    $.ajax('/files/' + this.filename, { type: 'DELETE' })
    var files = this.model.get('files')
    var arr = _.clone(files)
    var len=arr.length;
    for(var i=0; i<len; i++) {
      if (arr[i] == this.filename)
        arr.splice(i,1)
    }
    this.model.set({'files': arr})
    this.model.save()
    $(this.el).remove()
    this.notice()
  },

  render: function() {
    var path = this.getPath()
    var template = this.template({path: path})
    $(this.el).html(template)
    return this;
  },

  getPath: function(){
    var regex = /^(.+)\.([a-z]+)/
    var match = regex.exec(this.filename);
    var extension = match[2]
    if (extension == 'pdf')
      var path = '/pdf/' + this.filename + '.png' 
    else 
      var path = '/images/thumbs/'+ this.filename 
    return path
  },


  notice: function(){
    var successAlert = new AlertView({
      message: '<strong>Removed</strong>',
      type: 'info'
    })
    successAlert.fadeOut()
  },

});

return Backbone.View.extend({

  tagName: 'ul',
  className: 'thumbs',

  initialize: function() {
    _.bindAll(this); 
    this.model.on('change:files:added', this.addOne, this)
  },

  addOne: function(file){
    var view = new ItemView({ model: file });
    $(this.el).append(view.render().el)
  },


  render: function() {
    var files = this.model.get('files')
    _.each(files, this.addOne, this) 
    return this
  },
})

})
