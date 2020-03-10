import { call, put, take, takeLatest } from 'redux-saga/effects';
import {
  fetchUserTransactionsRequest,
  fetchUserTransactionsFailure,
  fetchUserTransactionsSuccess
} from './actions';
import { getUserTransactions } from '../../api';
import { loginSuccess, registrationSuccess } from '../Auth/actions';
import { buyCurrencySuccess, sellCurrencySuccess } from '../currency/actions';
import requestFlow from '../network/sagas';

function* fetchTransactionsFlow() {
  try {
    const response = yield call(requestFlow, getUserTransactions);
    yield put(fetchUserTransactionsSuccess(response.data));
  } catch (error) {
    yield put(fetchUserTransactionsFailure(error.message));
  }
}

export function* fetchTransactionsWatch() {
  yield takeLatest(fetchUserTransactionsRequest, fetchTransactionsFlow);
  yield takeLatest(buyCurrencySuccess, fetchTransactionsFlow);
  yield takeLatest(sellCurrencySuccess, fetchTransactionsFlow);
}

export function* transactionsWatch() {
  while (true) {
    const action = yield take([loginSuccess, registrationSuccess]);

    if (
      action.type === loginSuccess.toString() ||
      action.type === registrationSuccess.toString()
    )
      yield put(fetchUserTransactionsRequest());
  }
}
