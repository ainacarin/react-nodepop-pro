import React from 'react';
import T from 'prop-types';

import usePromise from '../../../hooks/usePromise';
import { login } from '../../../api/auth';
import LoginForm from './LoginForm';
import { useDispatch } from 'react-redux';
import { authLogin } from '../../../actions/auth';

function LoginPage({ location, history }) {
  const { isPending: isLoading, error, execute, resetError } = usePromise();
  const dispatch = useDispatch();

  const handleSubmit = credentials => {
    execute(login(credentials))
      .then(() => {
        // modify state auth
        dispatch( authLogin() )
      }
      )
      .then(() => {
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      });
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
      {isLoading && <p>...login in nodepop</p>}
      {error && (
        <div onClick={resetError} style={{ color: 'red' }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

LoginPage.propTypes = {
  location: T.shape({ state: T.shape({ from: T.object.isRequired }) })
    .isRequired,
  history: T.shape({ replace: T.func.isRequired }).isRequired,
};

export default LoginPage;
