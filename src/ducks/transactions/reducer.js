import { handleActions } from 'redux-actions';
import {
  fetchUserTransactionsFailure,
  fetchUserTransactionsRequest,
  fetchUserTransactionsSuccess
} from './actions';

export default handleActions(
  {
    [fetchUserTransactionsRequest.toString()]: state => ({
      ...state,
      isLoading: true,
      error: null
    }),
    [fetchUserTransactionsSuccess.toString()]: (state, action) => ({
      ...state,
      isLoading: false,
      records: action.payload
    }),
    [fetchUserTransactionsFailure.toString()]: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error
    })
  },
  {
    isLoading: false,
    records: [],
    error: null
  }
);
