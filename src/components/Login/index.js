import { connect } from 'react-redux';
import { loginRequest, registrationRequest } from '../../ducks/Auth/actions';
import Login from './Login';

const mapStateToProps = state => ({ ...state.auth });
const mapDispatchToProps = {
  loginRequest,
  registrationRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
