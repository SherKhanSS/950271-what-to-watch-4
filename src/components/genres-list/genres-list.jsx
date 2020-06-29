import React from "react";
import PropTypes from "prop-types";

const GenresList = (props) => {

  const {genres, currentGenre, onGenresItemClick} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre, index) => {
        return (
          <li
            onClick={(evt) => {
              evt.preventDefault();
              onGenresItemClick(genre);
            }}
            key={genre + index}
            className={`catalog__genres-item`
            + (genre === currentGenre ? ` catalog__genres-item--active` : ``)}>
            <a href="#" className="catalog__genres-link">{genre}</a>
          </li>
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
