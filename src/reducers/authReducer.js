
/**
 * Format auth state
 * {
 *  auth: boolean 
 * }
 */

import { types } from "../types/types";

export const authReducer = ( state = {}, action ) => {

    switch (action.type) {
        case types.login:
            return {
                ...state,
                auth: true
            };
        case types.logout:
            return {
                ...state,
                auth: false
            }
        default:
            return state;
    }
}