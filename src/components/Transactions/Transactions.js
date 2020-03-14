import React, { PureComponent } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const Table = styled.table`
  margin: 40px 0;
  width: 100%;
  text-align: right;
  border: 1px solid #edf0f1;
  border-collapse: collapse;
  border-radius: 3px;
  &th,
  td {
    border: 1px solid #edf0f1;
    padding: 5px 10px;
  }
`;
const TableTheadTr = styled.tr`
  background-color: #edf0f1;
  border: 1px solid #edf0f1;
`;

const TableTbodyTr = styled.tr`
  border: 1px solid #edf0f1;
`;
const ThLeft = styled.th`
  text-align: left;
`;
const TdLeft = styled.td`
  text-align: left;
`;

class Transactions extends PureComponent {
  render() {
    const { transactions, selected } = this.props;

    return (
      <article>
        <Table>
          <thead>
            <TableTheadTr>
              <th>Операция</th>
              <th>Дата</th>
              <ThLeft>{selected.toUpperCase()}</ThLeft>
              <ThLeft>USD</ThLeft>
            </TableTheadTr>
          </thead>
          <tbody>
            {Array.isArray(transactions.records) &&
              transactions.records.map(transaction => {
                if (!transaction[selected]) return null;
                const {
                  cost,
                  [selected]: delta,
                  created_at,
                  id,
                  operation
                } = transaction;
                console.log(cost, delta, created_at);
                return (
                  <TableTbodyTr key={id}>
                    <td>{operation === 'purchase' ? 'Покупка' : 'Продажа'}</td>
                    <td>{moment(created_at).format('DD.MM.YYYY HH:mm')}</td>
                    <TdLeft>{parseInt(delta, 10)}</TdLeft>
                    <TdLeft>{cost}</TdLeft>
                  </TableTbodyTr>
                );
              })}
            {Array.isArray(transactions.records) &&
              transactions.records.length === 0 && (
                <TableTbodyTr>
                  <td>There is no transactions yet...</td>
                </TableTbodyTr>
              )}
          </tbody>
        </Table>
      </article>
    );
  }
}

export default Transactions;
