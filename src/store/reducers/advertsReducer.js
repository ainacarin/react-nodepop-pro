
/**
 * Format adverts state
 *  adverts: {
 *      loaded: false,
 *      data: []
 * } 
 */

 import { types } from "../types/types";

 const initialState = {
     loaded: false,
     data: []
 };

 export const advertsReducer = ( state = initialState, action ) => {
 
     switch (action.type) {
         case types.advertsLoadedSuccess:
             return {
                 ...state, 
                 loaded: true,
                 data: [...action.payload]
             }
        case types.advertCreatedSuccess:
        case types.adevertDetailSuccess:
            return { ...state, loaded: false, data: [...state.data, action.payload] };
        case types.authLogoutSuccess:
            return {
                ...state,
                ...initialState
            }

         default:
             return state;
     }
 }