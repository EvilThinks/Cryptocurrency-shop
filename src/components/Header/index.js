import { connect } from 'react-redux';
import Header from './Header';
import { selectBtc, selectEth } from '../../ducks/currency/actions';
import { getBtcPrice, getEthPrice } from '../../ducks/currency/selectors';
import { getEmail } from '../../ducks/user/selectors';
import { getCoins } from '../../ducks/wallet/selectors';
import { logout } from '../../ducks/Auth/actions';
const mapStateToProps = state => ({
  ethPrice: getEthPrice(state),
  btcPrice: getBtcPrice(state),
  email: getEmail(state),
  coins: getCoins(state)
});

const mapDispatchToProps = {
  selectBtc,
  selectEth,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);