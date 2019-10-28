import { fork } from 'redux-saga/effects';
// import {
//   fetchWalletWatch,
//   fetchBtcWatch,
//   fetchEthWatch
// } from './currency/sagas';
import { authFlow, watchLoginFlow, watchRegistrationFlow } from './Auth/sagas';

export default function*() {
  yield fork(authFlow);
  yield fork(watchLoginFlow);
  yield fork(watchRegistrationFlow);
  // yield fork(fetchWalletWatch);
  // yield fork(fetchBtcWatch);
  // yield fork(fetchEthWatch);
}
