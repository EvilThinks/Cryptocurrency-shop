import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 400px;
`;
const FlexRow = styled.span`
  display: flex;
  flex-direction: row;
`;
const ColoredBill = FlexRow.extend`
  color: #cabbbb;
  background-color: #2d2d2d;
  justify-content: center;
  flex-grow: 1;
  margin: 0em 1em 1em 0em;
  border-radius: 5px;
`;

const FlexColumn = styled.span`
  display: flex;
  flex-direction: column;
`;

class Wallet extends PureComponent {
  render() {
    const {
      wallet: { coins }
    } = this.props;
    return (
      <Wrapper>
        <h1>Ваш счёт</h1>
        <FlexColumn>
            {coins &&
              Object.keys(coins).map(name => {
                const { integer, fraction } = this.numberToFormatDigit(
                  coins[name]
                );
                return (
                  <FlexRow key={name}>
                    <ColoredBill>
                      <p style={{ color: 'white' }}>{integer}</p>
                      <p>.</p>
                      <p>{fraction}</p>
                    </ColoredBill>
                    <span>{name.toUpperCase()}</span>
                  </FlexRow>
                );
              })}
        </FlexColumn>
      </Wrapper>
    );
  }
  numberToFormatDigit = number => {
    const readyDigit = Number.isInteger(number)
      ? [number, 0]
      : number.toString().split('.');
    return {
      integer: readyDigit[0],
      fraction: readyDigit[1]
    };
  };
}

export default Wallet;
