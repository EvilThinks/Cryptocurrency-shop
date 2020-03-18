import { handleActions } from 'redux-actions';
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
import { logout } from '../Auth/actions';

const initialState ={
  selected: 'eth',
  offset: '4h',
  btc: [],
  eth: [],
  isBtcLoading: false,
  isEthLoading: false,
  error: null
}

export default handleActions(
  {
    [selectBtc.toString()]: state => ({ ...state, selected: 'btc' }),
    [selectEth.toString()]: state => ({ ...state, selected: 'eth' }),
    [fetchBtcRequest.toString()]: state => ({
      ...state,
      isBtcLoading: true,
      error: null
    }),
    [fetchEthRequest.toString()]: state => ({
      ...state,
      isEthLoading: true,
      error: null
    }),
    [fetchBtcSuccess.toString()]: (state, action) => ({
      ...state,
      btc: action.payload,
      isBtcLoading: false
    }),
    [fetchBtcFailure.toString()]: (state, action) => ({
      ...state,
      isBtcLoading: false,
      error: action.payload
    }),
    [fetchEthFailure.toString()]: (state, action) => ({
      ...state,
      isEthLoading: false,
      error: action.payload
    }),
    [fetchEthSuccess.toString()]: (state, action) => ({
      ...state,
      eth: action.payload,
      isEthLoading: false
    }),
    [selectOffset.toString()]: (state, action) => ({
      ...state,
      offset: action.payload
    }),
    [logout.toString()]: () => initialState
  },
  initialState
);
