import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  getUserInfoFailure,
  getUserInfoRequest,
  getUserInfoSuccess
} from './actions';
import currency from '../currency/reducer';
import wallet from '../wallet/reducer';
import transactions from '../transactions/reducer';

const user = handleActions(
  {
    [getUserInfoRequest.toString()]: state => ({
      ...state,
      isLoading: true,
      error: null
    }),
    [getUserInfoSuccess.toString()]: (state, action) => ({
      ...state,
      info: action.payload,
      isLoading: false
    }),
    [getUserInfoFailure.toString()]: (state, action) => ({
      ...state,
      error: action.error,
      isLoading: false
    })
  },
  {
    info: null,
    isLoading: false,
    error: null
  }
);

export default combineReducers({
  user,
  wallet,
  transactions,
  currency
});
