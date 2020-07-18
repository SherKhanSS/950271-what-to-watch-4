import NameSpace from "../name-space.js";

export const getCurrentGenre = (state) => {
  return state[NameSpace.APP_STATE].currentGenre;
};

export const getFilmsLength = (state) => {
  return state[NameSpace.APP_STATE].filmsLength;
};
