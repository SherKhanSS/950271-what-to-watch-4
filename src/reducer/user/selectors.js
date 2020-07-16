import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.USER;


export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].authorizationStatus;
};

export const getShowSendError = (state) => {
  return state[NAME_SPACE].showSendError;
};

export const getFavoritesFilms = (state) => {
  return state[NAME_SPACE].favoritesFilms;
};
