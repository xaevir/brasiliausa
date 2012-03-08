define(function(require) {

var AlertView = require('views/site/alert')
  , tpl = require('text!templates/products/product.jade')




return Backbone.View.extend({

  className:  "details",

  template: jade.compile(tpl),

  initialize: function(){
    _.bindAll(this) 
  },

  getMainImage: function(){
  
  
  },

  getPdfs: function(files){
    files = _.map(files, function(filename){ 
      return {name: filename, contentType: getContentType(filename)}     
    })
    var pdfs = _.reduce(files, function(memo, file) {
      if (file.contentType == 'pdf') {
        memo.push(file)
      } 
      return memo
    }, [])
    
    return pdfs
  },

  render: function() {
    var pdfs = this.getPdfs(this.model.get('files'))
    var locals = this.model.toJSON()
    locals.pdfs = pdfs
    var template = this.template(locals)
    $(this.el).html(template);
    return this;
  },

});

})
