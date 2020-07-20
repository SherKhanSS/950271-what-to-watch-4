export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getCurentFilm = (films, props) => {
  return films.find((movie) => movie.id === Number(props.match.params.id));
};

export const noop = () => {
  // do nothing
};
