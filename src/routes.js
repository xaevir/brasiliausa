import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Home,
    Widgets,
    Survey,
    NotFound,
    Support,
    Technology,
    Team,
    History,
    Products
  } from 'containers';

export default () => {

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>


      { /* Routes */ }
      <Route path="support" component={Support}/>
      <Route path="technology" component={Technology}/>
      <Route path="history" component={History}/>
      <Route path="team" component={Team}/>
      <Route path="survey" component={Survey}/>
      <Route path="widgets" component={Widgets}/>
      <Route path="products" component={Products}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
