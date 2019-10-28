import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';

const mapStateToProps = state => ({
  isAuthorized: state.auth.isAuthorized
});

export default connect(mapStateToProps)(PrivateRoute);
