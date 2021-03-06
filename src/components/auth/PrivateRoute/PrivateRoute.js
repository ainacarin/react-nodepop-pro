import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';

const PrivateRoute = props => {

  const isLogged = useSelector(state => state.auth);

  const location = useLocation();

  return isLogged ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  );
};

export default PrivateRoute;
