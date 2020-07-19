import * as React from "react";
import GenresItem from "../genres-item/genres-item";

interface Props {
  genres: string[];
  currentGenre: string;
  onGenresItemClick: () => void;
}

const GenresList: React.FunctionComponent<Props> = (props: Props) => {

  const {genres, currentGenre, onGenresItemClick} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre, index) => {
        return (
          <GenresItem
            genre={genre}
            isActive={genre === currentGenre}
            onGenresItemClick={onGenresItemClick}
            key={genre + index}
          />
        );
      })}
    </ul>
  );
};

export default GenresList;
