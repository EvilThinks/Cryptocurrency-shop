import { Server, Model, Response, belongsTo } from 'miragejs';
import { LoginRequest, RegisterRequest, Logout, withAuth } from './Auth';
import { Currency, candles } from './Currency';
import { Walllet ,getUser} from './User';
import { createRandomPrice } from './utils';
import { getTransactions } from './Transactions';

const tmpFunc = (db, request) => {
  return new Response(503, {}, { response: 'e' });
};

const RoutesHandlers = [
  {
    type: 'post',
    url: '/user/login',
    handler: LoginRequest,
    response: { timing: 1400 }
  },
  {
    type: 'post',
    url: '/user/register',
    handler: RegisterRequest,
    response: { timing: 2300 }
  },
  {
    type: 'post',
    url: '/user/logout',
    handler: Logout,
    response: { timing: 100 }
  },
  {
    type: 'get',
    url: '/stock/exchange',
    handler: Currency,
    response: { timing: 3300 },
    auth: true
  },
  {
    type: 'get',
    url: '/candles',
    handler: candles,
    response: { timing: 2400 },
    auth: true
  },
  {
    type: 'get',
    url: '/users/wallet',
    handler: Walllet,
    response: { timing: 1400 },
    auth: true
  },
  {
    type: 'get',
    url: '/users/me',
    handler: getUser,
    response: { timing: 1400 },
    auth: true
  },
  {
    type: 'get',
    url: '/transactions',
    handler: getTransactions,
    response: { timing: 3400 },
    auth: true
  },
  {
    type: 'get',
    url: '/history',
    handler: tmpFunc,
    response: { timing: 5000 },
    auth: true
  },
  {
    type: 'get',
    url: '/history_all',
    handler: tmpFunc,
    response: { timing: 400 },
    auth: true
  }
];

const mirageJS = new Server({
  models: {
    user: Model,
    courses: Model,
    btc: Model,
    eth: Model,
    transactions: Model.extend({
      user: belongsTo()
    })
  },
  seeds(server) {
    server.db.loadData({
      btcs: createRandomPrice(4500, 4400, 3, 10),
      eths: createRandomPrice(230, 220, 5, 15),
      users: [
        {
          email: 'user1234@mail.ru',
          password: 'qweqweqwe',
          jwt: '26o7ga42yynxzq14ziwu0',
          coins: { usd: 8000, btc: 0, eth: 0 },
          transactions: []
        }
      ]
    });
  },
  routes() {
    console.log(this);
    this.namespace = '';
    RoutesHandlers.forEach(({ type, url, handler, response, auth }) => {
      this[type](url, auth ? withAuth(handler) : handler, response);
    });
  }
});

export default mirageJS;
