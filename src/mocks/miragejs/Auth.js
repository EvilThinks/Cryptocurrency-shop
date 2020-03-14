import { Response } from 'miragejs';
import { getUserByJwt } from './Currency';

export const fakeJWT = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
};

export const withAuth = handlerFn => {
  return (schema, request) => {
    const {
      requestHeaders: { Authorization }
    } = request;
   
    const isAuthenticated = schema.users.findBy(
      user =>
        user.jwt && user.jwt === (Authorization && Authorization.split(' ')[1])
    );
    console.log('miraje', Authorization,isAuthenticated);
    if (!isAuthenticated) {
      return new Response(
        401,
        {},
        { result: 'error', message: 'Unauthorized' }
      );
    }
    return handlerFn(schema, request);
  };
};

const validate = (email, password) => {
  if (!email || !password) {
    return {
      result: 'error',
      message: 'email or password cant be empty'
    };
  }
  return {
    result: 'success'
  };
};

export const LoginRequest = (schema, request) => {
  const requestBody = JSON.parse(request.requestBody);
  const { email, password } = requestBody.auth;
  const invalidInputs = validate(email, password);
  if (invalidInputs.result === 'error') {
    return new Response(200, {}, invalidInputs);
  }
  const User = schema.users.findBy({
    email: email,
    password: password
  });
  if (!User) {
    return new Response(
      200,
      {},
      {
        result: 'error',
        message: 'invalid email or password'
      }
    );
  }
  const jwt = '26o7ga42yynxzq14ziwu0'; //fakeJWT();
  User.update('jwt', jwt);
  return new Response(
    200,
    {},
    {
      result: 'logged in',
      jwt: jwt
    }
  );
};

export const RegisterRequest = (schema, request) => {
  const {
    auth: { email, password }
  } = JSON.parse(request.requestBody);
  const invalidInputs = validate(email, password);
  if (invalidInputs.result === 'error') {
    return invalidInputs;
  }
  const isExists = schema.users.findBy({
    email: email
  });
  if (isExists) {
    return new Response(
      200,
      {},
      {
        result: 'error',
        message: 'that user already exists'
      }
    );
  }

  const jwt = '26o7ga42yynxzq14ziwu0'; //fakeJWT();
  schema.users.create({
    email: email,
    password: password,
    jwt: jwt,
    coins: { usd: 8000, btc: 0, eth: 0 },
    transactions: []
  });
  return new Response(
    200,
    {},
    {
      result: 'registration Success',
      jwt: jwt
    }
  );
};

export const Logout = (schema, request) => {
  console.log('thissss')
  const User = getUserByJwt(schema, request);
  User.update('jwt', '');
  return new Response(200, {}, { result: 'jwt deleted' });
};
