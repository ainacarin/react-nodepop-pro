import { types } from "../types/types";

export const advertsLoaded = (adverts) => {
    return {
        type: types.adverts_loaded,
        payload: adverts
    }
};