import mockedData from './mockedData';


 
  
  
  candles = ({ params: { symbol, offset } }) => {
    const coins = this.mockedData[symbol];
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
    const data = coins.filter(({ mts }) => {
      return mts > limitTime;
    });
    return {
      data: { result: data },
      response: { status: 200 }
    };
  };
  getWallet = () => {
    const { coins } = this.mockedData.users.find(
      ({ email }) => email === this.mockedData.currentuser
    );
    return {
      data: {
        result: coins
      },
      response: { status: 200 }
    };
  };
  parseUlrParams = url => {
    return url.split('&').map(elem => elem.split('='));
  };
  getUserTransactions = params => {
    const [, limit] = params.split('=');
    const { records } = this.mockedData.users.find(
      ({ email }) => email === this.mockedData.currentuser
    );
    const data = records.filter((elem, i) => i < limit - 1);
    return {
      data: data,
      response: { status: 200 }
    };
  };
  authUser = () =>
    this.mockedData.jwt !== '' &&
    this.defaults.headers.common.Authorization.split(' ')[1] ===
      this.mockedData.jwt;
  getUserInfo = () => {
    const { currentuser } = this.mockedData;
    return {
      data: {
        email: currentuser
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
