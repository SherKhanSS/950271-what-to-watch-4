export const getAdaptedFilm = (film) => {
  return {
    id: film.id,
    title: film.name,
    poster: film.poster_image,
    genre: film.genre,
    year: film.released,
    runTime: film.run_time,
    cover: film.background_image,
    ratingScore: film.rating,
    ratingCount: film.scores_count,
    description: film.description,
    director: film.director,
    starring: film.starring,
    preview: film.preview_video_link,
    videoLink: film.video_link,
    isFavorite: film.is_favorite,
    backgroundColor: film.background_color,
    previewImage: film.preview_image,
  };
};
