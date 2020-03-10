import axios from 'axios';

axios.defaults.headers.post['Accept'] = '*/*';
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json'
  },
  withCredentials: false
});
const jsonInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});
instance.interceptors.response.use(
  response => response,
  error => {
    return error.response ? error.response : error;
  }
);
jsonInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return error.response ? error.response : error;
  }
);

/**
 * Registration & session functions
 */

export const setTokenApi = access_token => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
};

export const clearTokenApi = () => {
  instance.defaults.headers.common['Authorization'] = undefined;
};
export const logoutFromServer = email => {
  instance.post('/user/logout', { email: email });
};

export const login = auth =>
  jsonInstance.post('/user/login', { auth: auth }).then(response => {
    return response;
  });

export const registration = auth =>
  instance.post('/user/register', { auth: auth }).then(response => {
    return response;
  });

/**
 * Currency API calls
 */

export const buyCurrency = (currency, value) =>
  instance
    .get(`/stock/exchange?symbol=${currency}&operation=purchase&sum=${value}`)
    .then(response => {
      return response;
    });

export const sellCurrency = (currency, value) =>
  instance
    .get(`/stock/exchange?symbol=${currency}&operation=sell&sum=${value}`)
    .then(response => {
      return response;
    });

/**
 * Custom user functions
 */

export const candles = (symbol, offset) =>
  instance.get('/candles', { params: { symbol, offset } });
export const getWallet = () => instance.get('/users/wallet');
export const getUserInfo = () => instance.get('/users/me');
export const getUserTransactions = () =>
  instance.get('/transactions?limit=1000');
export const getUserFeedById = id => instance.get(`/history?user_id=${id}`);
export const getFeed = from =>
  instance.get(
    `/history_all?limit=20` + (from != null ? `&ceil_time=${from}` : '')
  );
