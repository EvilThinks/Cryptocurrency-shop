import mockedData from './mockedData';

const fakeJWT = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
};

export default class MockedAxios {
  constructor(config) {
    this.config = config;
  }
  post = (url, data) => {
    return this.getMockedDataByPath(url, data);
  };
  get = (url, data) => {
    return this.getMockedDataByPath(url, data);
  };
  getMockedDataByPath = (url, data) => {
    const isRandomNetworkError = () => {
      const rNumber = Math.round(Math.random() * (10 - 1)) + 1;
      return rNumber > 5;
    };

    const path = url.split('?');
    const result = arg => {
      console.log(arg,this.mockedData);
      return new Promise(resolve => {
        resolve(arg);
      });
    };
    if (isRandomNetworkError()) {
      return result({
        response: {
          status: 403,
          statusText: 'network error'
        }
      });
    }
    switch (path[0]) {
      case '/user/login':
        return result(this.LoginRequest(data));
      case '/user/register':
        return result(this.mockRegisterRequest(data));
      //   case 'stock/exchange':
      //     () => {};
      //     break;
      //   case '/candles':
      //     () => {};
      //     break;
      //   case '/transactions':
      //     () => {};
      //     break;
      //   case '/history':
      //     () => {};
      //     break;
      //   case '/history_all':
      //     () => {};
      //     break;
      //   case '/users/wallet':
      //     () => {};
      //     break;
      //   case '/users/me':
      //     () => {};
      //     break;

      default:
        return result({
          data: {
            result: 'error',
            message: 'unhandled Error'
          },
          response: {
            status: 200
          }
        });
    }
  };
  validate = (email, password) => {
    if (!email || !password) {
      return {
        data: {
          result: 'error',
          message: 'email or password cant be empty'
        },
        response: {
          status: 200
        }
      };
    }
    return {
      data: {
        result: 'valid'
      },
      response: {
        status: 200
      }
    };
  };
  LoginRequest = ({ auth: { email, password } }) => {
    const invalidInputs = this.validate(email, password);
    if (invalidInputs.data.result === 'error') {
      return invalidInputs;
    }
    const isValid = this.mockedData.users.find(elem => {
      return elem.email === email && elem.password === password;
    });
    if (!isValid) {
      return {
        data: {
          result: 'error',
          message: 'invalid email or password'
        },
        response: {
          status: 200
        }
      };
    }
    const jwt = fakeJWT();
    this.mockedData.jwt = jwt;
    return {
      data: {
        result: '',
        jwt: jwt
      },
      response: {
        status: 200
      }
    };
  };
  mockRegisterRequest = ({ auth: { email, password } }) => {
    const invalidInputs = this.validate(email, password);
    if (invalidInputs.data.result === 'error') {
      return invalidInputs;
    }
    const isExists = this.mockedData.users.find(elem => {
      return elem.email === email;
    });
    if (isExists) {
      return {
        data: {
          result: 'error',
          message: 'that user already exists'
        },
        response: {
          status: 200
        }
      };
    }
    this.mockedData.users.push({ email: email, password: password });
    return {
      data: {
        result: 'registration Success',
        jwt: fakeJWT()
      },
      response: {
        status: 200
      }
    };
  };
  config = {};
  defaults = {
    headers: {
      common: {
        Authorization: ''
      }
    }
  };
  mockedData = mockedData;
}
