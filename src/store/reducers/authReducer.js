
/**
 * Format auth state
 *  auth: boolean 
 */

import { types } from "../types/types";

export const authReducer = ( state = false, action ) => {

    switch (action.type) {
        case types.login:
            return true
        case types.logout:
            return false
        default:
            return state;
    }
}