require('babel-core/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  port: process.env.PORT,
  apiPort: process.env.APIPORT,
  app: {
    title: 'BrasiliaUSA Espresso Machines',
    description: 'Espresso Machines',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'BrasiliaUSA',
        'og:locale': 'en_US',
        'og:title': 'BrasiliaUSA',
        'og:description': 'Espresso Machines',
      }
    }
  }
}, environment);
