import React, { PureComponent, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Wallet from '../Wallet';
import Header from '../Header';
import CoinsChart from '../CoinsChart';
import Transactions from '../Transactions';
import TradeOperations from '../TradeOperations';
import User from '../User';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100% - 80px);
  background-color: #f2f3f5;
  margin-bottom: -100px;
  &::after {
    content: '';
    display: block;
    height: 100px;
  }
`;
const MainContainer = styled.div`
  width: 1200px;
  padding-top: 10px;
`;

const MainArticle = styled.article`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;
const StyledSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
class Main extends PureComponent {
  render() {
    const {
      params: { coins },path
    } = this.props;
    return (
      <Fragment>
        <ErrorBoundary>
          <Header selected={coins} path={path} />
          <MainWrapper>
            <MainContainer>
              <MainArticle>
                <Switch>
                  <Route exact path="/trade/:coins">
                    <Fragment>
                      <ErrorBoundary>
                        <Wallet></Wallet>
                      </ErrorBoundary>
                      <TradeOperations></TradeOperations>
                      <StyledSection>
                        <CoinsChart></CoinsChart>
                        <Transactions></Transactions>
                      </StyledSection>
                    </Fragment>
                  </Route>
                  <Route exact path="/users/me">
                    <User></User>
                  </Route>
                </Switch>
              </MainArticle>
            </MainContainer>
          </MainWrapper>
        </ErrorBoundary>
      </Fragment>
    );
  }
}

export default Main;
