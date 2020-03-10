import {
  call,
  select,
  put,
  takeLatest,
  take,
  cancel,
  fork
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  fetchWalletRequest,
  fetchWalletSuccess,
  fetchWalletFailure
} from './actions';
import {
  sellCurrencyFailure,
  sellCurrencySuccess,
  sellCurrencyRequest,
  buyCurrencyFailure,
  buyCurrencySuccess,
  buyCurrencyRequest
} from '../currency/actions';
import { getWallet, sellCurrency, buyCurrency } from '../../api';
import { loginSuccess, registrationSuccess, logout } from '../Auth/actions';
import { getSelectedCurrency } from '../currency/selectors';
import requestFlow from '../network/sagas';

function* fetchWalletFlow() {
  try {
    const response = yield call(requestFlow, getWallet);
    yield put(fetchWalletSuccess(response.data.result));
  } catch (error) {
    yield put(fetchWalletFailure(error.message));
    yield delay(5e3);
    yield put(fetchWalletRequest());
  }
}

function* buyCurrencyFlow(action) {
  try {
    const selectedCurrency = yield select(getSelectedCurrency);
    const response = yield call(
      requestFlow,
      buyCurrency,
      selectedCurrency,
      action.payload.value
    );
    yield put(buyCurrencySuccess(response.data));
  } catch (error) {
    yield put(buyCurrencyFailure(error.message));
  }
}

function* sellCurrencyFlow(action) {
  try {
    const selectedCurrency = yield select(getSelectedCurrency);
    const response = yield call(
      requestFlow,
      sellCurrency,
      selectedCurrency,
      action.payload.value
    );
    yield put(sellCurrencySuccess(response.data));
  } catch (error) {
    yield put(sellCurrencyFailure(error.message));
  }
}

export function* fetchWalletWatch() {
  yield takeLatest(fetchWalletRequest, fetchWalletFlow);
}

export function* buyCurrencyWatch() {
  yield takeLatest(buyCurrencyRequest, buyCurrencyFlow);
}

export function* sellCurrencyWatch() {
  yield takeLatest(sellCurrencyRequest, sellCurrencyFlow);
}

export function* walletWatch() {
  let currencyTask;
  while (true) {
    const action = yield take([loginSuccess, registrationSuccess, logout]);
    if (currencyTask) {
      yield cancel(currencyTask);
      currencyTask = undefined;
    }
    if (action.type !== logout.toString()) {
      currencyTask = yield fork(fetchWalletFlow);
    }
  }
}
