import { Response } from 'miragejs';
import { fakeJWT } from './Auth';

const recordTransaction = (user, time, operation, symbol, value, cost) => {
  user.records.push({
    created_at: time,
    operation: operation,
    [symbol]: value,
    cost: cost,
    id: fakeJWT()
  });
};

export const Currency = (schema, request) => {
  let { symbol, operation, sum } = request.queryParams;
  const {
    requestHeaders: { Authorization }
  } = request;
  const user = schema.users.findBy(
    user => user.jwt === Authorization.split(' ')[1]
  );
  let usdSum;
  sum = +sum;
  console.log(schema)
  debugger
  const { sell, purchase } = schema.db.mockedData.all()[0];
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
    const t = new Date().getTime();
    recordTransaction(user, t, operation, symbol, sum, usdSum);
  }
  return new Response(
    200,
    {},
    {
      ...user.coins
    }
  );
};
