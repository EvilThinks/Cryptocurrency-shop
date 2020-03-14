import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './ducks/reducers';
import rootSaga from './ducks/sagas';

const sagaMiddleware = createSagaMiddleware();

const withAuthorized = ({ getState, dispatch }) => {
  return next => action => {
    console.log(action,getState());
    next(action);
  };
};

export default initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      //applyMiddleware(withAuthorized),
      window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
