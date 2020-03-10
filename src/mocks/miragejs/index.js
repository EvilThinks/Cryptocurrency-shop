import { Server, Model, Response } from 'miragejs';
import { LoginRequest, RegisterRequest, Logout, withAuth } from './Auth';
import { Currency } from './Currency';
import { Walllet } from './User';

const tmpFunc = (db, request) => {
  return new Response(503, {}, { response: 'e' });
};

const RoutesHandlers = [
  {
    type: 'post',
    url: '/user/login',
    handler: LoginRequest,
    response: { timing: 400 }
  },
  {
    type: 'post',
    url: '/user/register',
    handler: RegisterRequest,
    response: { timing: 400 }
  },
  {
    type: 'post',
    url: '/user/logout',
    handler: Logout,
    response: { timing: 400 }
  },
  {
    type: 'get',
    url: '/stock/exchange',
    handler: tmpFunc,
    response: { timing: 400 },
    auth: true
  },
  {
    type: 'get',
    url: '/candles',
    handler: tmpFunc,
    response: { timing: 400 },
    auth: true
  },
  {
    type: 'get',
    url: '/users/wallet',
    handler: Walllet,
    response: { timing: 400 },
    auth: true
  },
  {
    type: 'get',
    url: '/users/me',
    handler: tmpFunc,
    response: { timing: 400 },
    auth: true
  },
  {
    type: 'get',
    url: '/transactions',
    handler: tmpFunc,
    response: { timing: 400 },
    auth: true
  },
  {
    type: 'get',
    url: '/history',
    handler: tmpFunc,
    response: { timing: 400 },
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
    eht: Model
  },
  routes() {
    this.namespace = '';
    RoutesHandlers.forEach(({ type, url, handler, response, auth }) => {
      this[type](url, auth ? withAuth(handler) : handler, response);
    });
  }
});

export default mirageJS;
