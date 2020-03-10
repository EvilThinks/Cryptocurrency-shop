import { fork } from 'redux-saga/effects';
import { authFlow, watchLoginFlow, watchRegistrationFlow } from './Auth/sagas';
import { currencyWatch, fetchBtcWatch, fetchEthWatch } from './currency/sagas';
import {
  fetchWalletWatch,
  sellCurrencyWatch,
  buyCurrencyWatch,
  walletWatch
} from './wallet/sagas';
import { fetchUserWatch, userWatch } from './user/sagas';
import { fetchTransactionsWatch, transactionsWatch } from './transactions/sagas';

export default function*() {
  yield fork(authFlow);
  yield fork(watchLoginFlow);
  yield fork(watchRegistrationFlow);
  yield fork(fetchWalletWatch);
  yield fork(fetchBtcWatch);
  yield fork(fetchEthWatch);
  yield fork(currencyWatch);
  yield fork(userWatch);
  yield fork(walletWatch);
  yield fork(transactionsWatch);
  yield fork(sellCurrencyWatch);
  yield fork(buyCurrencyWatch);
  yield fork(fetchUserWatch);
  yield fork(fetchTransactionsWatch);
}
