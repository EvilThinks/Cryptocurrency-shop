import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Login from '../Login';
import { logout } from '../../ducks/Auth/actions';
import { connect } from 'react-redux';
//import TradeOperations from '../TradeOperations';

const MockedTradeOperations = connect(
  null,
  { logout }
)(props => <div onClick={props.logout}>TradeOperations</div>);

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <PrivateRoute
          path="/trade/:coins"
          component={MockedTradeOperations}
        ></PrivateRoute>
        <Redirect to="/" from="*"></Redirect>
      </Switch>
    );
  }
}

export default AppRouter;
