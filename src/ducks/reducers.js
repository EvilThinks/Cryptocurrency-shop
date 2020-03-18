import { combineReducers } from 'redux';
import auth from './Auth/reducer';
import network from './network/network';
import user from './user/reducer';
import currency from './currency/reducer';
import wallet from './wallet/reducer';
import transactions from './transactions/reducer';

const User = combineReducers({
  user,
  wallet,
  transactions,
  currency
});

export default combineReducers({ auth, network, user: User });
