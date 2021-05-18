
/**
 * Format adverts state
 *  adverts: [] 
 */

 import { types } from "../types/types";

 export const advertsReducer = ( state = [], action ) => {
 
     switch (action.type) {
         case types.advertsLoaded:
             return [
                 ...action.payload
             ]

         default:
             return state;
     }
 }