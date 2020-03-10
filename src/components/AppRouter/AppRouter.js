import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Login from '../Login';
import Main from '../Main';
class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <PrivateRoute  path="/trade/:coins" component={Main}></PrivateRoute>
        <PrivateRoute  path="/users/me" component={Main}></PrivateRoute>
        <Redirect to="/" from="*"></Redirect>
      </Switch>
    );
  }
}

export default AppRouter;
