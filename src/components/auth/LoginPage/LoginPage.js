import React from 'react';
import T from 'prop-types';

import LoginForm from './LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { authLoginAction } from '../../../store/actions/auth';
import { getUi } from '../../../store/selectors/ui';
import { resetErrorAction } from '../../../store/actions/ui';

function LoginPage() {

  const dispatch = useDispatch();
  const { error, loading } = useSelector(getUi);

  const handleSubmit = credentials => {

    dispatch( authLoginAction(credentials) )

  };

  const resetError = () => dispatch(resetErrorAction());

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
      {loading && <p>...login in nodepop</p>}
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
