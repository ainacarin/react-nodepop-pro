const mapAdvert = ({ photo, ...advert }) => ({
    ...advert,
    photo: photo ? `${process.env.REACT_APP_API_BASE_URL}${photo}` : photo,
  });

export const getAdverts = (state) => state.adverts;
export const getAdvertState = (id) => (state) => mapAdvert(state.adverts.find(advert => advert.id === id));