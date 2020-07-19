import * as React from "react";

interface Props {
  genre: string;
  isActive: boolean;
  onGenresItemClick: (genre: string) => void;
}

class GenresItem extends React.PureComponent<Props, {}> {
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

export default GenresItem;
