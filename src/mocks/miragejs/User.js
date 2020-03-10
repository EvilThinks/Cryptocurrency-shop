import { Response } from 'miragejs';

export const Walllet = (db, request) => {
  const user = db.users.findBy({
    jwt: request.requestHeaders.Authorization.split(' ')[1]
  });
  const { coins } = user;
  return new Response(200, {}, { result: { ...coins } });
};
