import React from "react";
import PropTypes from "prop-types";
import GenresItem from "../genres-item/genres-item.jsx";

const GenresList = (props) => {

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

GenresList.propTypes = {
  genres: PropTypes.array.isRequired,
  currentGenre: PropTypes.string.isRequired,
  onGenresItemClick: PropTypes.func.isRequired,
};

export default GenresList;
