import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppRouter from './components/AppRouter';
import createStoreWithSaga from './store';
import mirageJS from './mocks/miragejs/index';
import { getToken } from './localStorage';
import { setTokenApi } from './api';
import { initialState } from './ducks/Auth/reducer';

const withAuthorized = getToken()
  ? (setTokenApi(getToken()), { auth: { ...initialState, isAuthorized: true } })
  : void 0;

let store = createStoreWithSaga(withAuthorized);

// eslint-disable-next-line
mirageJS;

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppRouter></AppRouter>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
