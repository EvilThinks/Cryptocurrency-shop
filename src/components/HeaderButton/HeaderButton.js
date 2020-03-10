import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: 80px;
  margin: 0 8px;
  text-decoration: none;
  cursor: pointer;
  color: #aaa;
  &b {
    text-transform: uppercase;
  }
`;

const DisabledHeaderBtn = HeaderBtn.extend`
  cursor: auto;
  color: white;
`;

class HeaderButton extends PureComponent {
  render() {
    const { price, name, disabled } = this.props;
    if (disabled) {
      return (
        <DisabledHeaderBtn onClick={this.handleClick}>
          {price && price.toFixed(1)}
          <b>{name}</b>
        </DisabledHeaderBtn>
      );
    } else {
      return (
        <Link style={{ textDecoration: 'none' }} to={`/trade/${name}`}>
          <HeaderBtn onClick={this.handleClick}>
            {price && price.toFixed(1)}
            <b>{name}</b>
          </HeaderBtn>
        </Link>
      );
    }
  }

  handleClick = () => {
    this.props.onChooseCurrency(this.props.name);
  };
}

export default HeaderButton;
