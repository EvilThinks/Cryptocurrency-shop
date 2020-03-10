import { handleActions } from 'redux-actions';
import {
  getUserInfoFailure,
  getUserInfoRequest,
  getUserInfoSuccess
} from './actions';

export default handleActions(
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
