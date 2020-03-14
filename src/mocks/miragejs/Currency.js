import { Response } from 'miragejs';
import { recordTransaction } from './Transactions';

export const getUserByJwt = (schema, request) => {
  const {
    requestHeaders: { Authorization }
  } = request;
  return schema.users.findBy(user => user.jwt === Authorization.split(' ')[1]);
};

export const Currency = (schema, request) => {
  let { symbol, operation, sum } = request.queryParams;
  const user = getUserByJwt(schema, request);
  let usdSum;
  sum = +sum;
  const { sell, purchase } = schema.db[`${symbol}s`][0];
  console.log(sell, purchase);
  const {
    coins: { usd }
  } = user;
  if (operation === 'purchase') {
    usdSum = purchase * sum;
    console.log(usd, usdSum, sum, purchase);
    if (usd < usdSum) {
      return new Response(
        200,
        {},
        {
          result: 'error',
          message: 'not enough values at your wallet'
        }
      );
    }
    user.coins.usd = +(user.coins.usd -= usdSum).toFixed(1);
    user.coins[symbol] += sum;
  }
  if (operation === 'sell') {
    usdSum = sell * sum;
    if (user.coins[symbol] < sum) {
      return new Response(
        200,
        {},
        {
          result: 'error',
          message: 'not enough values at your wallet'
        }
      );
    }
    user.coins.usd = +(user.coins.usd += usdSum).toFixed(1);
    user.coins[symbol] -= sum;
  }
  const t = new Date().getTime();
  recordTransaction(user, t, operation, symbol, sum, usdSum);
  return new Response(
    200,
    {},
    {
      ...user.coins
    }
  );
};

export const candles = (schema, request) => {
  const { symbol, offset } = request.queryParams;
  const courses = schema.db[`${symbol}s`];
  const hour = 1000 * 60 * 60;
  const day = hour * 24;
  const offsets = {
    '2h': hour * 2,
    '4h': hour * 4,
    '8h': hour * 8,
    '1d': day,
    '7d': day * 7
  };
  const limitTime = new Date().getTime() - offsets[offset];
  const data = courses.where(({ mts }) => {
    return mts > limitTime;
  });
  return new Response(200, {}, data);
};
