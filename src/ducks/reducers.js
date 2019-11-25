import { combineReducers } from 'redux';
import currency from './currency/reducer';
import auth from './Auth/reducer';
import network from './network/network';
import wallet from './wallet/reducer';

export default combineReducers({ auth, network, currency, wallet });
