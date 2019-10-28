import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppRouter from './components/AppRouter';
import createStore from './store';

const store = createStore();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppRouter></AppRouter>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
