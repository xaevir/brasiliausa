import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import * as productActions from 'redux/modules/products';
import {isLoaded, load as loadProducts} from 'redux/modules/products';

@connect(
  state => ({
    products: state.products.data,
    error: state.products.error,
    loading: state.products.loading
  }),
  {...productActions })
export default
class Products extends Component {
  static propTypes = {
    products: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired,
  }

  static fetchDataDeferred(getState, dispatch) {
    if (!isLoaded(getState())) {
      return dispatch(loadProducts());
    }
  }

  render() {
    const {products, error} = this.props;
    return (
      <div className="container">
        <h1>
          Products
        </h1>
        <DocumentMeta title="React Redux Example: Widgets"/>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
        {products && products.length &&
        <table className="table table-striped">
          <thead>
          <tr>
            <th>ID</th>
            <th>Color</th>
            <th>Sprockets</th>
            <th>Owner</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {
            products.map((product) =>
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.color}</td>
                <td>{product.sprocketCount}</td>
                <td>{product.owner}</td>
                <td>
                </td>
              </tr>)
          }
          </tbody>
        </table>}
      </div>
    );
  }
}
