
/**
 * Format adverts state
 *  adverts: [] 
 */

 import { types } from "../types/types";

 const initialState = [];

 export const advertsReducer = ( state = initialState, action ) => {
 
     switch (action.type) {
         case types.advertsLoaded:
             return [
                 ...action.payload
             ]
        case types.authLogoutSuccess:
            return [
                ...initialState
            ]

         default:
             return state;
     }
 }