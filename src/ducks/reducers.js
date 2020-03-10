import { combineReducers } from 'redux';
import currency from './currency/reducer';
import auth from './Auth/reducer';
import network from './network/network';
import wallet from './wallet/reducer';
import transactions from './transactions/reducer';
import user from './user/reducer';

export default combineReducers({
  auth,
  network,
  currency,
  wallet,
  transactions,
  user
});
