
export const getAdverts = (state) => state.adverts.data;
export const getAdvertsLoaded = (state) => state.adverts.loaded;
export const getAdvertState = (id) => (state) =>
  state.adverts.data.find((advert) => advert.id === id);

export const getAdvertDetail = (state, id) => {
  return state.adverts?.data.find((advert) => advert.id === id);
};
