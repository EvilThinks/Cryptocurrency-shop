import { call, put, select } from 'redux-saga/effects';
import { networkError, clearNetworkError, getIsNetworkError } from './network';
import { logout } from '../Auth/actions';
export default function*(fn, args) {
  try {
    const response = yield call(fn, args);
    if (yield select(getIsNetworkError)) yield put(clearNetworkError());
    if (response.response.status !== 200) {
      yield put(networkError(response));
      yield put(logout());
      throw new Error('network Error');
    }
    if (response.response.status === 200 && response.data.result === 'error') {
      throw new Error(response.data.message);
    }
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
