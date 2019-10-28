import React, { PureComponent } from 'react';
import { Redirect, Route } from 'react-router-dom';

class PrivateRoute extends PureComponent {
  render() {
    const { isAuthorized, component: Component, ...rest } = this.props;
console.log('renderinginside private ',this.props)
    return (
      <Route
        {...rest}
        render={() =>
          isAuthorized ? (
            <Component params={rest.computedMatch.params}></Component>
          ) : (
            <Redirect to="/"></Redirect>
          )
        }
      ></Route>
    );
  }
}

export default PrivateRoute;
