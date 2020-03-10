import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, message: null };
  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, message: error.message });
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Ooops... Something went wrong.</h1>
          <span>{this.state.message}</span>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
