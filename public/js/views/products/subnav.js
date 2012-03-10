define(function(require) {

var tpl = require('text!templates/products/subnav.jade')

return Backbone.View.extend({

  className: 'subnav',

  template: jade.compile(tpl),

  events: {
    "click a": "preventDefault",
    "click a": "compensateForStaticness",
  },

  preventDefault: function(e) {
    e.preventDefault() 
  },

  compensateForStaticness: function(e){
    var linkEl = $(e.currentTarget);
    var href = linkEl.attr("href");
    var section = $(href)
    var position = $(section).offset().top - 40
    $(document.body).animate({
        'scrollTop': position 
    }, 500);
  },

  initialize: function(options){
    _.bindAll(this, 'render') 
    $win = $(window)
    $nav = $(this.el)
    //navTop = $('.subnav').length && $('.subnav').offset().top - 40
    isFixed = 0
    $win.on('scroll', this.processScroll)
    this.render()
  },

  render: function(){
    var template = this.template()
    $(this.el).html(template);
    $('#app').before(this.el)
    this.processScroll()
  },

  processScroll: function() {
    //navTop = $('.subnav').length && $('.subnav').offset().top - 40
    //navy = $('.subnav').offset().top 
    var i, scrollTop = $win.scrollTop()
    if (scrollTop >= 40 && !isFixed) {
      isFixed = 1
      $nav.addClass('subnav-fixed')
    } else if (scrollTop <= 40 && isFixed) {
      isFixed = 0
      $nav.removeClass('subnav-fixed')
    }
  }

})
})
