export const getOffset = state => state.currency.offset;
export const getSelectedCurrency = state => state.currency.selected;
export const getCurrentCurrencyPurchase = state =>
  state.currency[getSelectedCurrency(state)][0]
    ? state.currency[getSelectedCurrency(state)][0].purchase
    : 0;
export const getCurrentCurrencySell = state =>
  state.currency[getSelectedCurrency(state)][0]
    ? state.currency[getSelectedCurrency(state)][0].sell
    : 0;
export const getEthPrice = state =>
  state.currency.eth[0] && state.currency.eth[0].sell;
export const getBtcPrice = state =>
  state.currency.btc[0] && state.currency.btc[0].sell;
