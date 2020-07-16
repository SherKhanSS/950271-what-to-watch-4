import NameSpace from "../name-space.js";
import {createSelector} from "reselect";
import {getCurrentGenre} from "../app-state/selectors.js";

export const getFilms = (state) => {
  return state[NameSpace.DATA].films;
};

export const getPromoFilm = (state) => {
  return state[NameSpace.DATA].promoFilm;
};

export const getGenres = (state) => {
  return state[NameSpace.DATA].genres;
};

export const getFilmsByGenre = createSelector(
    getCurrentGenre,
    getFilms,
    (genre, films) => {
      if (genre === `All genres`) {
        return films;
      }
      return films.filter((film) => film.genre === genre);
    }
);
