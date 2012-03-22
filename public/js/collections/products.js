define(function(require) {
  var Product = require('models/product')
  
  return Backbone.Collection.extend({

    model: Product,

    url : 'products',

    categories :  [
      {value: 'espresso-machines', label: 'Espresso Machines'}, 
      {value: 'espresso-grinders', label: 'Espresso Grinders'}, 
      {value: 'juicers', label: 'Juicers'}, 
      {value: 'panini-grills', label: 'Panini Grills'}
     ],
    
    subcategories: [
      {value: 'bar-line', label: 'Bar Line'}, 
      {value: 'compact', label: 'Compact'}
    ] 

  })
})
