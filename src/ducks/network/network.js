import { handleActions, createActions } from 'redux-actions';

export const { networkError, clearNetworkError } = createActions(
  'NETWORK_ERROR',
  'CLEAR_NETWORK_ERROR'
);

export default handleActions(
  {
    [networkError.toString()]: (state, action) => ({
      error: action.payload,
      message: action.payload.response.statusText
    }),
    [clearNetworkError.toString()]: () => ({
      error: null,
      message: null
    })
  },
  {
    error: null,
    message: null
  }
);

export const getIsNetworkError = state => state.networkError;
