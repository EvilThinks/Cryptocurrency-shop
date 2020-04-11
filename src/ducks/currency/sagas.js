import {
  takeLatest,
  fork,
  take,
  select,
  put,
  cancel,
  call
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { loginSuccess, logout } from '../Auth/actions';
import { getOffset } from './selectors';
import {
  selectBtc,
  selectEth,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  fetchEthSuccess,
  selectOffset
} from './actions';
import { candles, getWallet } from '../../api';
import {
  fetchWalletRequest,
  fetchWalletSuccess,
  fetchWalletFailure
} from '../wallet/actions';
import requestFlow from '../network/sagas';

function* fetchBtcFlow(action) {
  try {
    const response = yield call(requestFlow, candles, 'btc', action.payload);

    yield put(fetchBtcSuccess(response.data));
  } catch (error) {
    yield put(fetchBtcFailure(error.message));
  }
}

function* fetchEthFlow(action) {
  try {
    const response = yield call(requestFlow, candles, 'eth', action.payload);
    yield put(fetchEthSuccess(response.data));
  } catch (error) {
    yield put(fetchEthFailure(error.message));
  }
}

function* loginCurrencyFlow() {
  while (true) {
    const offset = yield select(getOffset);
    yield put(fetchBtcRequest(offset));
    yield put(fetchEthRequest(offset));

    yield delay(15000);
  }
}

export function* currencyWatch() {
  let currencyTask;
  while (true) {
    const action = yield take([
      loginSuccess,
      logout,
      selectBtc,
      selectEth,
      selectOffset
    ]);

    if (currencyTask) {
      yield cancel(currencyTask);
      currencyTask = undefined;
    }
    if (action.type !== logout.toString())
      currencyTask = yield fork(loginCurrencyFlow);
  }
}

function* fetchWalletFlow() {
  try {
    const response = yield call(requestFlow, getWallet);
    yield put(fetchWalletSuccess(response.data));
  } catch (error) {
    yield put(fetchWalletFailure(error.message));
  }
}

export function* fetchWalletWatch() {
  yield takeLatest(fetchWalletRequest, fetchWalletFlow);
}

export function* fetchBtcWatch() {
  yield takeLatest(fetchBtcRequest, fetchBtcFlow);
}

export function* fetchEthWatch() {
  yield takeLatest(fetchEthRequest, fetchEthFlow);
}
