import NameSpace from "../name-space.js";

export const getFilms = (state) => {
  return state[NameSpace.DATA].films;
};

export const getPromoFilm = (state) => {
  return state[NameSpace.DATA].promoFilm;
};


// задание предлагает использовать реселект для выборки списка фильмов по жанрам, каким образом - не понятно
// export const getFilmsByGenre = (state) => {

//   if (state[NameSpace.APP_STATE].currentGenre === `All genres`) {
//     return state[NameSpace.DATA].films;
//   }

//   return state[NameSpace.DATA].filter((film) => film.genre === state[NameSpace.APP_STATE].currentGenre);
// };
