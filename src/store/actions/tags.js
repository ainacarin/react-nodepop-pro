import { getTagsLoaded } from "../selectors/tags";
import { types } from "../types/types";

export const tagsLoaded = (tags) => {
    return {
        type: types.tagsLoadedSuccess,
        payload: tags
    }
};


export const tagsLoadedRequest = () => ({
      type: types.tagsLoadedRequest
  });

  export const tagsLoadedSuccess = tags => ({
      type: types.tagsLoadedSuccess,
      payload: tags
  });
  

  export const tagsLoadedError = error => ({
      type: types.tagsLoadedError,
      payload: error
  });

export const tagsLoadAction = () => {
    return async function (dispatch, getState, { api }) {
      const tagsLoaded = getTagsLoaded(getState());
      if (tagsLoaded) {
        return;
      }
  
      dispatch(tagsLoadedRequest());
      try {
        const tags = await api.adverts.getTags();
        dispatch(tagsLoadedSuccess(tags));
      } catch (error) {
        dispatch(tagsLoadedError(error));
      }
    };
  };