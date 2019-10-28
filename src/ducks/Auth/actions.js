import { createActions } from 'redux-actions';

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registrationRequest,
  registrationSuccess,
  registrationFailure,
  logout
} = createActions(
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
  'REGISTRATION_REQUEST',
  'REGISTRATION_SUCCESS',
  'REGISTRATION_FAILURE',
  'LOGOUT',
);
