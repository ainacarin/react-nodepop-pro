import { types } from "../types/types";

const initialState = {
  loading: false,
  error: null,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLoginRequest:
    case types.authLogoutRequest:
    case types.advertsLoadedRequest:
    case types.tagsLoadedRequest:
    case types.advertDetailRequest:
    case types.advertDeleteRequest:
      return { ...state, loading: true, error: null };
    case types.authLoginSuccess:
    case types.authLogoutSuccess:
    case types.advertsLoadedSuccess:
    case types.tagsLoadedSuccess:
    case types.advertDetailSuccess:
    case types.advertDeleteSuccess:
      return { ...state, loading: false, error: null };
    case types.authLoginError:
    case types.authLogoutError:
    case types.advertsLoadedError:
    case types.tagsLoadedError:
    case types.advertDetailError:
    case types.advertDeleteError:
      return { ...state, loading: false, error: action.payload };
    case types.uiResetError:
      return { ...state, error: null };
    default:
      return state;
  }
};
