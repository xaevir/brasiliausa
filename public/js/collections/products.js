define(function(require) {
  var Product = require('models/product')
  
  return Backbone.Collection.extend({

    model: Product,

    url : 'products',

    categories :  [
      {slug: 'espresso-machines', name: 'Espresso Machines'}, 
      {slug: 'espresso-grinders', name: 'Espresso Grinders'}, 
      {slug: 'juicers', name: 'Juicers'}, 
      {slug: 'panini-grills', name: 'Panini Grills'}
     ],
    
    subcategories: [
      {slug: 'bar-line', name: 'Bar Line'}, 
      {slug: 'compact', name: 'Compact'}
    ] 

  })
})
