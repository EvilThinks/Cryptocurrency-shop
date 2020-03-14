import { connect } from 'react-redux';
import Wallet from './Wallet';


const mapStateToProps = state => ({
  wallet: state.user.wallet
});

export default connect(mapStateToProps)(Wallet);
