import { getAdvertDetail, getAdverts, getAdvertsLoaded, getAdvertState } from "../selectors/adverts";
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

export const advertDetailRequest = () => ({
  type: types.advertDetailRequest
});

export const advertDetailError = error => ({
  type: types.advertDetailError,
  payload: error
});

export const advertDetailAction = advertId => {
  return async function (dispatch, getState, { api, history }) {
    const advertLoaded = getAdvertDetail(getState(), advertId);
    if (advertLoaded) {
      return;
    }
    dispatch(advertDetailRequest());
    try {
      const advert = await api.adverts.getAdvert(advertId);
      dispatch(advertDetailSuccess(advert));
      return advert;
    } catch (error) {
      dispatch(advertDetailError(error));
    }
  };
};

export const advertDeleteSuccess = adverts => {
  return {
    type: types.advertDeleteSuccess,
    payload: adverts
  };
};

export const advertDeleteRequest = () => ({
  type: types.advertDeleteRequest
});

export const advertDeleteError = error => ({
  type: types.advertDeleteError,
  payload: error
});

export const advertDeleteAction = advertId => {
  return async function (dispatch, getState, {api, history}) {
    dispatch(advertDeleteRequest());
    try {
      const advertDeleted = await api.adverts.deleteAdvert(advertId);
      const advertsState = getAdverts(getState());
      const newAdvertsState = advertsState.filter(advert => advert.id !== advertId);
      dispatch(advertDeleteSuccess(newAdvertsState));
      history.push('/');
    } catch (error) {
      dispatch(advertDeleteError(error))
    }
  }
}