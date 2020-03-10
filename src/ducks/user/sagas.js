import { call, put, take, takeLatest } from 'redux-saga/effects';
import {
  getUserInfoFailure,
  getUserInfoSuccess,
  getUserInfoRequest
} from './actions';
import { getUserInfo } from '../../api';
import { loginSuccess, registrationSuccess } from '../Auth/actions';
import requestFlow from '../network/sagas';

function* fetchUserFlow() {
  try {
    const response = yield call(requestFlow, getUserInfo);
    yield put(getUserInfoSuccess(response.data));
  } catch (error) {
    yield put(getUserInfoFailure(error.message));
  }
}

export function* fetchUserWatch() {
  yield takeLatest(getUserInfoRequest, fetchUserFlow);
}

export function* userWatch() {
  while (true) {
    const action = yield take([loginSuccess, registrationSuccess]);

    if (
      action.type === loginSuccess.toString() ||
      action.type === registrationSuccess.toString()
    )
      yield put(getUserInfoRequest());
  }
}
