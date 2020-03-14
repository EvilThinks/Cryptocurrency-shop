import { Response } from 'miragejs';
import { getUserByJwt } from './Currency';

export const Walllet = (db, request) => {
  const user = db.users.findBy({
    jwt: request.requestHeaders.Authorization.split(' ')[1]
  });
  const { coins } = user;
  return new Response(200, {}, { result: { ...coins } });
};

export const getUser = (schema, request) => {
  const user = getUserByJwt(schema, request);
  return new Response(200, {}, { email: user.email });
};
