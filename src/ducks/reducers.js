import { combineReducers } from 'redux';
//import currency from './currency/reducer';
import auth from './Auth/reducer';
import network from './network/network';

export default combineReducers({ auth, network });
