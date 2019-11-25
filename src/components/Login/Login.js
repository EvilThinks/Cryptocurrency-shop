import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import Particles from 'react-particles-js';
import Particles_params from '../../particles-params';
import PadlockSVG from '../../static/media/padlock-unlock.svg';
import UserShapeSVG from '../../static/media/user-shape.svg';
import Logo from '../../static/media/Logo.svg';
import {
  LoginWrapper,
  MenuWrapper,
  MenuBlock,
  MenuLogo,
  WrappedMenuBlock,
  Column,
  InputWrapper,
  SpanImage,
  StyledInput,
  LoginButton
} from './Styled';

class Login extends PureComponent {
  state = {
    email: '',
    password: '',
    type: 'login'
  };
  render() {
    const { isAuthorized, loginError, registrationError } = this.props;
    const { type } = this.state;
    return isAuthorized ? (
      <Redirect to="/trade/btc" />
    ) : (
      <LoginWrapper>
        <MenuWrapper>
          <MenuBlock>
            <MenuLogo src={Logo}></MenuLogo>
            <WrappedMenuBlock>
              <Column>
                <InputWrapper>
                  <SpanImage image={PadlockSVG}></SpanImage>
                  <StyledInput
                    type="email"
                    placeholder="email"
                    name="email"
                    onChange={this.handleChangeOnInput}
                  ></StyledInput>
                </InputWrapper>
                <InputWrapper>
                  <SpanImage image={UserShapeSVG}></SpanImage>
                  <StyledInput
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={this.handleChangeOnInput}
                  ></StyledInput>
                </InputWrapper>
                <LoginButton onClick={this.onSubmit}>
                  {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
                </LoginButton>
                {loginError && <div>{loginError}</div>}
                {registrationError && (
                  <div>{registrationError}</div>
                )}
              </Column>
            </WrappedMenuBlock>
            <WrappedMenuBlock>
              {type === 'login' ? (
                <React.Fragment>
                  <p>
                    Впервые на сайте?{' '}
                    <a href="" onClick={this.makeRegisterFlow}>
                      Зарегистрироваться
                    </a>
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p>
                    Уже зарегистрированы?{' '}
                    <a href="" onClick={this.makeLoginFlow}>
                      Войти
                    </a>
                  </p>
                </React.Fragment>
              )}
            </WrappedMenuBlock>
          </MenuBlock>
        </MenuWrapper>
        <Particles params={Particles_params}></Particles>
      </LoginWrapper>
    );
  }
  makeRegisterFlow = event => {
    event.preventDefault();
    this.setState({ type: 'register' });
  };
  makeLoginFlow = event => {
    event.preventDefault();
    this.setState({ type: 'login' });
  };
  onSubmit = e => {
    const { email, password, type } = this.state;
    const { loginRequest, registrationRequest } = this.props;
    if (type === 'login') loginRequest({ email: email, password: password });
    if (type === 'register')
      registrationRequest({ email: email, password: password });
  };
  handleChangeOnInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
}

export default Login;
