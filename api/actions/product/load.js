import json from './product.json';

function getProducts(req) {
  let products = req.session.products;
  if (!products) {
    products = json;
    req.session.products = products;
  }
  return products;
}

export function load(req) {
  return new Promise((resolve) => {
    // make async call to database
    setTimeout(() => {
      resolve(getProducts(req));
    }, 100); // simulate async load
  });
}
