export const getOffset = state => state.user.currency.offset;
export const getSelectedCurrency = state => state.user.currency.selected;
export const getCurrentCurrencyPurchase = state =>
  state.user.currency[getSelectedCurrency(state)][0]
    ? state.user.currency[getSelectedCurrency(state)][0].purchase
    : 0;
export const getCurrentCurrencySell = state =>
  state.user.currency[getSelectedCurrency(state)][0]
    ? state.user.currency[getSelectedCurrency(state)][0].sell
    : 0;
export const getEthPrice = state =>
  state.user.currency.eth[0] && state.user.currency.eth[0].sell;
export const getBtcPrice = state =>
  state.user.currency.btc[0] && state.user.currency.btc[0].sell;
