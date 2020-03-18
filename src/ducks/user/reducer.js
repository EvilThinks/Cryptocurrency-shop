import { handleActions } from 'redux-actions';
import {
  getUserInfoFailure,
  getUserInfoRequest,
  getUserInfoSuccess
} from './actions';
import { logout } from '../Auth/actions';

const initialState ={ info: null, isLoading: false, error: null }

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
    }),
    [logout.toString()]: () => initialState
  },
  initialState
);
