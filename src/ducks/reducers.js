import { combineReducers } from 'redux';
import auth from './Auth/reducer';
import network from './network/network';
import user from './user/reducer';

export default combineReducers({ auth, network, user });
