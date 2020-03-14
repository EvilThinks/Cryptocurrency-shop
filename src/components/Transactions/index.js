import { connect } from 'react-redux';
import Transactions from './Transactions';
import { getSelectedCurrency } from '../../ducks/currency/selectors';

const mapStateToProps = state => ({
  transactions: state.user.transactions,
  selected: getSelectedCurrency(state)
});

export default connect(mapStateToProps)(Transactions);
