import * as React from "react";
import {Link} from "react-router-dom";
import MoviesList from "../movies-list/movies-list";
import withMoviesList from "../../hocs/with-movies-list/with-movies-list";
import {Film} from "../../types";

const MoviesListWrapped = withMoviesList(MoviesList);

interface Props {
  films: Film[];
  onFilmCardClick: () => void;
}

const MyList: React.FunctionComponent<Props> = (props: Props) => {

  const {films, onFilmCardClick} = props;

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={`/`} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MoviesListWrapped
          films={films}
          onFilmCardClick={onFilmCardClick}
        />

      </section>
      <footer className="page-footer">
        <div className="logo">
          <Link to={`/`} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

export default MyList;
