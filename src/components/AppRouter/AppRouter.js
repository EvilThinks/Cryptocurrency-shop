import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Login from '../Login';
import TradeOperations from '../TradeOperations';



class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <PrivateRoute
          path="/trade/:coins"
          component={TradeOperations}
        ></PrivateRoute>
        <Redirect to="/" from="*"></Redirect>
      </Switch>
    );
  }
}

export default AppRouter;
