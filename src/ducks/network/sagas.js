import { call, put, select } from 'redux-saga/effects';
import { networkError, clearNetworkError, getIsNetworkError } from './network';
import { logout } from '../Auth/actions';
import { showNotification } from '../../utils/notification';
export default function*(fn, ...args) {
  try {
    const response = yield call(fn, ...args);
    if (yield select(getIsNetworkError)) yield put(clearNetworkError());
    // console.log(
    //   'STATUS',
    //   response.status,
    //   'RESPONSE',
    //   response,
    //   localStorage.getItem('jwt')
    // );
    if (response.status !== 200) {
      // console.log('!==200');
      if (response.status === 401) {
        // console.log('401');
        yield put(logout());
        throw new Error('Unauthorized');
      } else {
        throw new Error(response.statusText);
      }
    }
    if (response.status === 200 && response.data.result === 'error') {
      throw new Error(response.data.message);
    }
    return response;
  } catch (error) {
    showNotification('error', 'Error!', error.message);
    yield put(networkError(error.message));
    throw new Error(error.message);
  }
}
