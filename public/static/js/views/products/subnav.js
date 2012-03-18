define(function(require) {

var tpl = require('text!templates/products/subnav.html')

return Backbone.View.extend({

  className: 'subnav',

  events: {
    "click a": "preventDefault",
    "click a": "compensateForStaticness",
  },

  preventDefault: function(e) {
    e.preventDefault() 
  },

  compensateForStaticness: function(e){
    var linkEl = $(e.currentTarget);
    var target = $(linkEl).data("target");
    var one = $('#'+target)
    var section = $('#espresso-grinders')
    var position = $(section).offset().top - 40
    $(document.body).animate({
        'scrollTop': 500 
    }, 500);
    e.preventDefault() 
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
    $(this.el).html(tpl);
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
