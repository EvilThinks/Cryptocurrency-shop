import { fakeJWT } from './Auth';
import { getUserByJwt } from './Currency';
import { Response } from 'miragejs';

export const recordTransaction = (
  user,
  time,
  operation,
  symbol,
  value,
  cost
) => {
  user.transactions.push({
    created_at: time,
    operation: operation,
    [symbol]: value,
    cost: cost,
    id: fakeJWT()
  });
};

export const getTransactions = (schema, request) => {
  const user = getUserByJwt(schema, request);
  return new Response(
    200,
    {},
    schema.db.users.findBy({ email: user.email }).transactions
  );
};
