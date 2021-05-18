import { types } from "../types/types";

export const advertsLoaded = (adverts) => {
    return {
        type: types.advertsLoaded,
        payload: adverts
    }
};
