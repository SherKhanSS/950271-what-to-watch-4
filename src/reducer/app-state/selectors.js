import NameSpace from "../name-space.js";

export const getCurrentGenre = (state) => {
  return state[NameSpace.APP_STATE].currentGenre;
};

export const getActiveFilm = (state) => {
  return state[NameSpace.APP_STATE].activeFilm;
};

export const getIsPlayingFilm = (state) => {
  return state[NameSpace.APP_STATE].isPlayingFilm;
};

export const getFilmsLength = (state) => {
  return state[NameSpace.APP_STATE].filmsLength;
};

export const getFilmsAddedToWatch = (state) => {
  return state[NameSpace.APP_STATE].filmsAddedToWatch;
};
