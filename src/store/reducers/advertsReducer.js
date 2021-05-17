
/**
 * Format auth state
 * {
 *  adverts: [] 
 * }
 */

 import { types } from "../types/types";

 export const advertsReducer = ( state = {}, action ) => {
 
     switch (action.type) {
         case types.adverts_loaded:
             return [
                 ...action.payload
             ]

         default:
             return state;
     }
 }