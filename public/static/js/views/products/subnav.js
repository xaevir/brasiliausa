define(function(require) {

var tpl = require('text!templates/products/subnav.html')

return Backbone.View.extend({

  className: 'subnav',

  events: {
    "click a": "scroll",
  },

  scroll: function(e){
    e.preventDefault() 
    var anchor = $(e.currentTarget)
    // highlight
    var el = $(anchor).parent()
    if (el.hasClass('active')) return
    $('.subnav li').removeClass('active');
    el.addClass('active');
    var target = $(anchor).data("target");
    var position = $('#'+target).offset().top - 50
    $('html, body').animate({
      'scrollTop': position 
    }, 700)
  },

  initialize: function(options){
    _.bindAll(this, 'render', 'processScroll') 
  },

  render: function(){
    $(this.el).html(tpl);
    //$('#app').before(this.el)
    $win = $(window)
    isFixed = 0
    $win.on('scroll', this.processScroll)
    return this
  },
  
  processScroll: function() {
    if (typeof navTop === 'undefined')
      navTop =$(this.el).offset().top
    var i, scrollTop = $win.scrollTop();
    if (scrollTop >= navTop && !isFixed) {
      isFixed = 1;
      $(this.el).addClass('subnav-fixed');
    } else if (scrollTop <= navTop && isFixed) {
      isFixed = 0;
      $(this.el).removeClass('subnav-fixed');
    }
  }

})
})
