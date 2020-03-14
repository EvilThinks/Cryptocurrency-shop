import React, { PureComponent } from 'react';
import { LineChart } from 'react-easy-chart';
import moment from 'moment';
import styled from 'styled-components';
import Spinner from 'react-svg-spinner';

const offsets = {
  '2h': '2ч',
  '4h': '4ч',
  '8h': '8ч',
  '1d': '1д',
  '7d': '7д'
};

const ChartWrapper = styled.div`
  border: 2px solid #d3e9f1;
  height: 448px;
  margin-top: 15px;
  border-radius: 3px;
`;
const ChartBtn = styled.div`
  margin: 0 4px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: ${props => (props.selected ? '#6ab4dd' : 'transparent')};
  color: ${props => (props.selected ? 'white' : '#9998a1')};
  padding: 2px 16px;
`;
const ChartBtnWrapper = styled.div`
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  background-color: #d3e9f1;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const WrapperArticle = styled.article`
  min-width: 750px;
`;
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

class CoinsChart extends PureComponent {
  render() {
    const { currency } = this.props;
    const { selected, offset, error } = currency;
    const data = currency[selected];
    const isLoading = currency.isBtcLoading || currency.isEthLoading;
    const purchase = data.map(val => ({
      x: moment(val.mts).format('DD-MM HH:mm'),
      y: val.purchase
    }));
    const sell = data.map(val => ({
      x: moment(val.mts).format('DD-MM HH:mm'),
      y: val.sell
    }));
    return (
      <WrapperArticle>
        <h2>Окно графика</h2>
        <ChartWrapper>
          <ChartBtnWrapper>
            {Object.keys(offsets).map(key => (
              <ChartBtn
                key={key}
                selected={offset === key}
                name={key}
                onClick={this.handleChangeGraph}
              >
                {offsets[key]}
              </ChartBtn>
            ))}
          </ChartBtnWrapper>
          {isLoading && !error && (
            <LoaderWrapper>
              <Spinner color={'#d3e9f1'} width={'400'} height={'400'}></Spinner>
            </LoaderWrapper>
          )}
          {!error && !isLoading && data.length && (
            <LineChart
              lineColors={['blue', 'red']}
              axes
              grid
              verticalGrid
              interpolate={'cardinal'}
              xType={'time'}
              datePattern={'%d-%m %H:%M'}
              width={750}
              height={400}
              style={{
                '.axis path': {
                  stroke: '#EDF0F1'
                }
              }}
              data={[sell, purchase]}
            />
          )}
          {error && <ErrorWrapper>{error}</ErrorWrapper>}
        </ChartWrapper>
      </WrapperArticle>
    );
  }

  handleChangeGraph = event => {
    this.props.selectOffset(event.target.attributes.name.value);
  };
}

export default CoinsChart;
