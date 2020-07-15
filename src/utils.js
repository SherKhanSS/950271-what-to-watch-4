export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getCurentFilm = (films, props) => {
  return films.find((movie) => movie.id === Number(props.match.params.id));
};

export const getNewFavoritesFilms = (favoritesFilms, curentFilm) => {
  let newFavoritesFilms = [...favoritesFilms];
  if (favoritesFilms.includes(curentFilm)) {
    newFavoritesFilms = newFavoritesFilms.filter((movie) => movie !== curentFilm);
  } else {
    newFavoritesFilms.push(curentFilm);
  }
  return newFavoritesFilms;
};
