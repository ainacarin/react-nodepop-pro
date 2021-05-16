import { Link } from 'react-router-dom';
import T from 'prop-types';

import { ConfirmationButton } from '../../shared';
import { logout } from '../../../api/auth';
import { connect } from 'react-redux';
import { authLogout } from '../../../actions/auth';
import { getIsLogged } from '../../../selectors/auth';

const AuthButton = ({ isLogged, onLogout:handleLogout }) => {
  
  const handleLogoutConfirm = async () => {
    await logout();
    handleLogout();
  };

  console.log(isLogged);
  return isLogged ? (
    <ConfirmationButton
      confirmation="Are you sure?"
      onConfirm={handleLogoutConfirm}
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
  onLogout: () => dispatch(authLogout()),
});
const mapStateToProps = (state, ownProps) => ({ isLogged: getIsLogged(state) });
export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
