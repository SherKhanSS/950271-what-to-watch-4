import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.USER;


export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].authorizationStatus;
};

export const getShowSendError = (state) => {
  return state[NAME_SPACE].showSendError;
};

export const getOnReviewSuccess = (state) => {
  return state[NAME_SPACE].onReviewSuccess;
};

export const getFavoritesFilms = (state) => {
  return state[NAME_SPACE].favoritesFilms;
};

export const getReviews = (state) => {
  return state[NAME_SPACE].reviews;
};

export const getIsSent = (state) => {
  return state[NAME_SPACE].isSent;
};
