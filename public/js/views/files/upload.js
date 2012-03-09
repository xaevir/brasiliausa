define(function(require) {

var tpl = require('text!templates/files/upload.jade')
  , AlertView = require('views/site/alert')         
  , File = require('models/file')

return Backbone.View.extend({

  template: jade.compile(tpl),

  events: {
    'change input[type="file"]':  'fileUpload',
  },

  initialize: function(options){
    _.bindAll(this); 
  },

  fileUpload: function(e){
    this.inputEl = $(e.currentTarget)
    this.inputEl.addClass("loading")
    $.ajax('/upload', {
      files: this.inputEl,
      iframe: true,
      dataType: "json",
      success: this.successUpload
    })
  },

  successUpload: function(res){
    var file = new File(res.data)
    this.inputEl.removeClass("loading")
    this.inputEl.val('')
    var files = this.model.get('files')
    files.add(file)
    this.model.save() 
    this.model.trigger('change:files:added', file)
    this.notice()
  },

  render: function(){
    var locals = this.model.toJSON()
    var template = this.template(locals)
    $(this.el).html(template);
    return this; 
  },

  notice: function(){
    var successAlert = new AlertView({
      message: '<strong>Uploaded</strong>',
      type: 'info'
    })
    successAlert.fadeOut()
  },


});

});
