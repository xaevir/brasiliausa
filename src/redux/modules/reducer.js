import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import {reducer as form} from 'redux-form';
import widgets from './widgets';
import products from './products';

export default combineReducers({
  router: routerStateReducer,
  form,
  widgets,
  products
});
