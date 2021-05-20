import { getAdvertsLoaded } from "../selectors/adverts";
import { types } from "../types/types";

export const advertsLoaded = (adverts) => {
    return {
        type: types.advertsLoadedSuccess,
        payload: adverts
    }
};


export const advertsLoadedRequest = () => ({
      type: types.advertsLoadedRequest
  });

  export const advertsLoadedSuccess = adverts => ({
      type: types.advertsLoadedSuccess,
      payload: adverts
  });
  

  export const advertsLoadedError = error => ({
      type: types.advertsLoadedError,
      payload: error
  });

export const advertsLoadAction = () => {
    return async function (dispatch, getState, { api }) {
      const advertsLoaded = getAdvertsLoaded(getState());
      if (advertsLoaded) {
        return;
      }
  
      dispatch(advertsLoadedRequest());
      try {
        const adverts = await api.adverts.getAdverts();
        console.log('adverts getapi', adverts);
        dispatch(advertsLoadedSuccess(adverts));
      } catch (error) {
        dispatch(advertsLoadedError(error));
      }
    };
  };