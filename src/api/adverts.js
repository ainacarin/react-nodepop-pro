import client from './client';
import { withFormData } from '../utils/converters';

const advertsPath = '/api/v1/adverts';

const mapAdvert = ({ photo, ...advert }) => ({
  ...advert,
  photo: photo ? `${process.env.REACT_APP_API_BASE_URL}${photo}` : photo,
});

export const getTags = () => {
  return client.get(`${advertsPath}/tags`);
};

export const getAdverts = () => {
  return client.get(`${advertsPath}`).then(ads => {return ads.map(mapAdvert)});
};

export const getAdvert = advertId => {
  return client.get(`${advertsPath}/${advertId}`).then(mapAdvert);
  // return client.get(`${advertsPath}/${advertId}`);
};

export const deleteAdvert = advertId => {
  return client.delete(`${advertsPath}/${advertId}`);
};

export const createAdvert = withFormData(newAdvert => {
  return client.post(advertsPath, newAdvert);
});

// export const createAdvert = newAdvert => {
//   return client.post(advertsPath, objectToFormData(newAdvert));
// };
