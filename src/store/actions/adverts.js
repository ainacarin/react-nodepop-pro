import { getAdvertsLoaded, getAdvertState } from "../selectors/adverts";
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

  export const advertCreatedRequest = () => ({
    type: types.advertCreatedRequest
});

export const advertCreatedSuccess = advert => ({
    type: types.advertCreatedSuccess,
    payload: advert
});


export const advertCreatedError = error => ({
    type: types.advertCreatedError,
    payload: error
});

export const advertCreateAction = (newAdvert) => {
  return async function (dispatch, getState, { api, history }) {
    dispatch(advertCreatedRequest());
    try {
      const { id: advertId } = await api.adverts.createAdvert(newAdvert);
      const createdAdvert = await api.adverts.getAdvert(advertId)
      dispatch(advertCreatedSuccess(createdAdvert));
      return createdAdvert;
    } catch (error) {
        dispatch(advertCreatedError(error));
    }
  };
};

export const advertDetailSuccess = advert => {
  return {
    type: types.advertDetailSuccess,
    payload: advert
  };
};

export const advertDetailAction = advertId => {
  return async function (dispatch, getState, { api, history }) {
    const advertLoaded = getAdvertState(getState(), advertId);
    if (advertLoaded) {
      return;
    }
    // dispatch(advertDetailRequest());
    try {
      const advert = await api.adverts.getAdvert(advertId);
      dispatch(advertDetailSuccess(advert));
      return advert;
    } catch (error) {
      // dispatch(advertDetailError(error));
    }
  };
};