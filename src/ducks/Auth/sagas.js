import { take, put, takeEvery, call, select } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registrationRequest,
  registrationSuccess,
  registrationFailure,
  logout
} from '../Auth/actions';
import { getIsAuthorized } from './selectors';
import { setTokenApi, clearTokenApi, login, registration } from '../../api';
import { setToken, clearToken } from '../../localStorage';
import requestFlow from '../network/sagas';

function* loginFlow(action) {
  try {
    const loginResponse = yield call(requestFlow, login, action.payload);
    const token = loginResponse.data.jwt;
    yield call(setTokenApi, token);
    yield call(setToken, token);
    yield put(loginSuccess());
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}
function* registrationFlow(action) {
  try {
    const registrationResponse = yield call(
      requestFlow,
      registration,
      action.payload
    );
    const token = registrationResponse.data.jwt;
    yield call(setTokenApi, token);
    yield call(setToken, token);
    yield put(registrationSuccess());
  } catch (error) {
    yield put(registrationFailure(error.message));
  }
}

export function* authFlow() {
  while (true) {
    const isAuthorized = yield select(getIsAuthorized);
    if (isAuthorized) {
      yield put(loginSuccess());
    }
    yield take(logout);
    yield call(clearToken);
    yield call(clearTokenApi);
  }
}
export function* watchLoginFlow() {
  yield takeEvery(loginRequest, loginFlow);
}

export function* watchRegistrationFlow() {
  yield takeEvery(registrationRequest, registrationFlow);
}
