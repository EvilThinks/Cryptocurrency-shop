import { handleActions } from 'redux-actions';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registrationRequest,
  registrationSuccess,
  registrationFailure,
  logout
} from './actions';

export const initalState = {
  isAuthorized: false,
  loginError: null,
  registrationError: null
};

export default handleActions(
  {
    [loginRequest.toString()]: state => ({
      ...state,
      isAuthorized: false,
      loginError: null,
      registrationError: null
    }),
    [loginSuccess.toString()]: state => ({
      ...state,
      isAuthorized: true,
      loginError: null
    }),
    [loginFailure.toString()]: (state, action) => ({
      ...state,
      isAuthorized: false,
      loginError: action.payload
    }),
    [registrationRequest.toString()]: (state, action) => ({
      ...state,
      registrationError: null,
      loginError: null
    }),
    [registrationSuccess.toString()]: state => ({
      ...state,
      isAuthorized: true,
      registrationError: null
    }),
    [registrationFailure.toString()]: (state, action) => ({
      ...state,
      registrationError: action.payload
    }),
    [logout.toString()]: state => ({
      ...state,
      isAuthorized: false
    })
  },
  initalState
);
