import { Link } from 'react-router-dom';
import T from 'prop-types';

import { ConfirmationButton } from '../../shared';
import { logout } from '../../../api/auth';
import { connect } from 'react-redux';
import { authLogout, authLogoutAction } from '../../../store/actions/auth';
import { getIsLogged } from '../../../store/selectors/auth';

const AuthButton = ({ isLogged, onLogout }) => {


  return isLogged ? (
    <ConfirmationButton
      confirmation="Are you sure?"
      onConfirm={onLogout}
    >
      Logout
    </ConfirmationButton>
  ) : (
    <Link to="/login">Login</Link>
  );
};

AuthButton.propTypes = {
  onLogout: T.func.isRequired,
  isLogged: T.bool,
};

AuthButton.defaultProps = {
  isLogged: false,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLogout: () => dispatch(authLogoutAction()),
});
const mapStateToProps = (state, ownProps) => ({ isLogged: getIsLogged(state) });
export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);

export const AuthButtonTest = AuthButton;