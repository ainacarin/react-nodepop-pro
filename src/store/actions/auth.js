import { types } from "../types/types";

export const authLoginRequest = () => ({
    type: types.authLoginRequest
  });

  export const authLoginSuccess = () => ({
      type: types.authLoginSuccess
  });

  export const authLoginError = error => ({
      type: types.authLoginError,
      payload: error
    });

  export const authLogoutRequest = () => ({
    type: types.authLogoutRequest
  });

  export const authLogoutSuccess = () => ({
    type: types.authLogoutSuccess
  });

    export const authLogoutError = error => ({
      type: types.authLogoutError,
      payload: error
    });
  
  export const authLoginAction = credentials => {
    return async function (dispatch, getState, { api, history }) {
      dispatch(authLoginRequest()); //loading
      try {
        await api.auth.login(credentials);
        dispatch(authLoginSuccess());
        // Redirect
        const { from } = history.location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (error) {
        dispatch(authLoginError(error));
      }
    };
  };

  export const authLogoutAction = () => {
    return async function (dispatch, getState, { api, history }) {
      dispatch(authLogoutRequest()); //loading
      try {
        await api.auth.logout();
        dispatch(authLogoutSuccess());
      } catch (error) {
        dispatch(authLogoutError(error));
      }
    };
  };
