import React, { PureComponent } from 'react';
import { Redirect, Route } from 'react-router-dom';

class PrivateRoute extends PureComponent {
  render() {
    const { isAuthorized, component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={() =>
          isAuthorized ? (
            <Component {...rest} params={rest.computedMatch.params}></Component>
          ) : (
            <Redirect to="/"></Redirect>
          )
        }
      ></Route>
    );
  }
}

export default PrivateRoute;
