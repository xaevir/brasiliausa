define(function(require) {

var tpl = require('text!templates/files/upload.jade')
  , AlertView = require('views/site/alert')         

return Backbone.View.extend({

  template: jade.compile(tpl),

  events: {
    'change input[type="file"]':  'fileUpload',
  },

  initialize: function(options){
    _.bindAll(this); 
//    this.model.on('validated:valid', this.save, this) 
//    this.model.on('sync', this.synched, this)
  },

  fileUpload: function(e){
    var inputEl = $(e.currentTarget)
    inputEl.addClass("loading")
    self = this
    $.ajax('/upload', {
      files: inputEl,
      iframe: true,
      dataType: "json",
    }).always(function() {
      inputEl.removeClass("loading")
    }).done(function(res) {
      inputEl.val('')
      var files = _.clone(self.model.get('files'))
      files.push(res.data.name)
      self.model.set({'files': files}) 
      self.model.save() 
      self.model.trigger('change:files:added', res.data.name)
      self.success()
    });

  },

  render: function(){
    var locals = this.model.toJSON()
    var template = this.template(locals)
    $(this.el).html(template);
    return this; 
  },

  success: function(){
    var successAlert = new AlertView({
      message: '<strong>Uploaded</strong>',
      type: 'info'
    })
    successAlert.fadeOut()
  },


});

});
