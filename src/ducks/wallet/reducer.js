import { handleActions } from 'redux-actions';

export default handleActions(
  {
    [`qwe`]: state => ({ ...state, asdqw: 'qweqw' })
  },
  { error: null }
);
export const getError = state => state.wallet.error;
