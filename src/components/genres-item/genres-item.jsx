import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class GenresItem extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {

    const {genre, isActive, onGenresItemClick} = this.props;

    return (
      <li
        onClick={(evt) => {
          evt.preventDefault();
          onGenresItemClick(genre);
        }}
        className={`catalog__genres-item`
        + (isActive ? ` catalog__genres-item--active` : ``)}>
        <a href="#" className="catalog__genres-link">{genre}</a>
      </li>
    );
  }
}

GenresItem.propTypes = {
  genre: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onGenresItemClick: PropTypes.func.isRequired,
};

export default GenresItem;
