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

export default handleActions(
  {
    [selectBtc.toString()]: state => ({ ...state, selected: 'btc' }),
    [selectEth.toString()]: state => ({ ...state, selected: 'eth' }),
    [fetchBtcRequest.toString()]: state => ({ ...state, isBtcLoading: true }),
    [fetchEthRequest.toString()]: state => ({ ...state, isEthLoading: true }),
    [fetchBtcSuccess.toString()]: (state, action) => ({
      ...state,
      btc: action.payload
    }),
    [fetchBtcFailure.toString()]: state => ({ ...state, isBtcLoading: false }),
    [fetchEthFailure.toString()]: state => ({ ...state, isEthLoading: false }),
    [fetchEthSuccess.toString()]: (state, action) => ({
      ...state,
      eth: action.payload
    }),
    [selectOffset.toString()]: (state, action) => ({
      ...state,
      offset: action.payload
    })
  },
  {
    selected: 'eth',
    offset: '4h',
    btc: [],
    eth: [],
    isBtcLoading: false,
    isEthLoading: false
  }
);

export const getOffset = state => state.currency.offset;
export const getSelectedCurrency = state => state.currency.selected;
export const getCurrentCurrencyPurchase = state => state.currency;
export const getCurrentCurrencySell = state => state.currency;