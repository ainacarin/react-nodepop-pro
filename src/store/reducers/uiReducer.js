import { types } from "../types/types";

const initialState = {
  loading: false,
  error: null
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLoginRequest:
    case types.authLogoutRequest:
      return { ...state, loading: true, error: null }
    case types.authLoginSuccess:
    case types.authLogoutSuccess:
      return { ...state, loading: false, error: null }
    case types.authLoginError:
    case types.authLogoutError:
      return {...state, loading: false, error: action.payload}
    case types.uiResetError:
      return {...state, error: null}
    default:
      return state;
  }
};
