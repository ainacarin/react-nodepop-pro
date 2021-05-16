import { types } from "../types/types";

export const authLogin = () => ({
    type: types.login
  });

  export const authLogout = () => ({
    type: types.logout
  });