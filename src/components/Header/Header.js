import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../static/media/Logo-white.svg';
import HeaderButton from '../HeaderButton/HeaderButton';
import { logoutFromServer } from '../../api';
import styled from 'styled-components';
import { HeaderBtn } from '../HeaderButton/HeaderButton';
const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  background-color: #2b2c2e;
  height: 80px;
  color: #fff;
`;

const HeaderContainer = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageLogo = styled.img`
  width: 180px;
`;
const StyledLink = props => (
  <HeaderBtn>
    <Link style={{ color: '#ffff' }} {...props}></Link>
  </HeaderBtn>
);

export default class Header extends PureComponent {
  componentDidMount() {
    this.handleChooseCurrency(this.props.selected);
  }

  render() {
    const { email, ethPrice, btcPrice, selected } = this.props;
    const buttons = [
      {
        name: 'btc',
        price: btcPrice
      },
      {
        name: 'eth',
        price: ethPrice
      }
    ];
    return (
      <HeaderWrapper>
        <HeaderContainer>
          <ImageLogo src={logo} alt="Logo" />

          <ButtonsContainer>
            {buttons.map(button => (
              <HeaderButton
                key={button.name}
                name={button.name}
                price={button.price}
                onChooseCurrency={this.handleChooseCurrency}
                disabled={selected === button.name}
              />
            ))}
          </ButtonsContainer>
          <StyledLink to="/users/me">{email ? email : '------'}</StyledLink>
          <HeaderBtn onClick={this.handleLogout}>Выйти</HeaderBtn>
          <HeaderBtn onClick={this.handleServerLogout}>Сервер логаут</HeaderBtn>
        </HeaderContainer>
      </HeaderWrapper>
    );
  }

  handleChooseCurrency = selected => {
    const { selectBtc, selectEth } = this.props;

    switch (selected) {
      case 'btc':
        selectBtc();
        return;
      case 'eth':
        selectEth();
        return;
      default:
        return;
    }
  };
  handleLogout = () => {
    this.props.logout();
  };
  handleServerLogout = () => {
    logoutFromServer('user123@mail.ru');
  };
}
