import { connect } from 'react-redux';
import CoinsChart from './CoinsChart';
import { selectOffset } from '../../ducks/currency/actions';

const mapStateToProps = state => ({
  currency: state.user.currency
});

const mapDispatchToProps = {
  selectOffset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinsChart);
