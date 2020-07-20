import * as React from "react";
import MovieCard from "../movie-card/movie-card";
import {Film} from "../../types";

interface Props {
  films: Film[];
  title: string;
  onFilmCardMouseEnter: () => void;
  onFilmCardMouseLeave: () => void;
  onFilmCardClick: () => void;
}

const MoviesList: React.FunctionComponent<Props> = (props: Props) => {

  const {films, title, onFilmCardMouseEnter, onFilmCardMouseLeave, onFilmCardClick} = props;

  return (
    <div className="catalog__movies-list">
      {films.map((film, index) => {
        return (
          <MovieCard
            title={film.title}
            poster={film.previewImage}
            preview={film.preview}
            id={film.id}
            isPlaying={title === film.title}
            onFilmCardMouseEnter={onFilmCardMouseEnter}
            onFilmCardMouseLeave={onFilmCardMouseLeave}
            onFilmCardClick={onFilmCardClick}
            key={film.title + index}
          />
        );
      })}
    </div>
  );
};

export default MoviesList;
