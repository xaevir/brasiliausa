define(function(require) {

var AlertView = require('views/site/alert')         
  , tpl = require('text!templates/files/thumbs.jade')

var ItemView = Backbone.View.extend({

  tagName:  "li",

  events: {
    "click a.remove": "remove",
    "click a.setMainImage": 'setMainImage'
  },

  template: jade.compile(tpl),

  initialize: function(options){
    this.file = options.file
    _.bindAll(this)
  },

  setMainImage: function() {
    this.model.collection.parent.set({'mainImage': this.model.toJSON()})
    this.model.collection.parent.save()
    this.notice('Main image selected')
    this.model.collection.parent.trigger('mainImage:selected', this.model)
  },

  remove: function(e) {
    e.preventDefault()
    this.model.destroy({data: this.model})
    $(this.el).remove()
    this.notice('Removed')
  },

  render: function() {
    var locals = this.model.toJSON()
    var template = this.template(locals)
    $(this.el).html(template)
    this.model.view = this
    return this
  },

  notice: function(msg){
    var successAlert = new AlertView({
      message: '<strong>'+msg+'</strong>',
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
    this.model.on('mainImage:selected', this.addMainImageHeader, this)
  },

  addMainImageHeader: function(model){
    if(this.mainImageModel)
      this.mainImageModel.view.render()       
    this.mainImageModel = model
    $('.mainImage', model.view.el).html('<p class="main"><i class="icon-ok"></i> main image</p>')
  },

  getMainImage: function(files){
    var curMain = files.parent.get('mainImage')
    if (!curMain) return
    return files.find(function(model){ 
      if (model.get('name') == curMain.name)
        return model 
    })
  },

  addOne: function(model){
    var view = new ItemView({ model: model })
    $(this.el).append(view.render().el)
  },

  render: function() {
    var files = this.model.get('files')
    files.each(this.addOne, this)
    var mainImage = this.getMainImage(files)
    if (mainImage)
      this.addMainImageHeader(mainImage)
    return this
  },
})

})
