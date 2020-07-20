import * as React from "react";
import {Link} from "react-router-dom";
import Tabs from "../tabs/tabs";
import withTabs from "../../hocs/with-tabs/with-tabs";
import MoviesList from "../movies-list/movies-list";
import withMoviesList from "../../hocs/with-movies-list/with-movies-list";
import history from "../../history";
import {getCurentFilm} from "../../utils";
import {Film, Review} from "../../types";

const MAX_FILMS_LENGHT = 4;

const TabsWrapped = withTabs(Tabs);
const MoviesListWrapped = withMoviesList(MoviesList);

interface Props {
  films: Film[];
  favoritesFilms: Film[];
  reviews: Review[];
  isAuthorized: boolean;
  onAddButtonClick: (id: number, status: number) => void;
  onFilmCardClick: () => void;
}

const MoviePage: React.FunctionComponent<Props> = (props: Props) => {
  const {films, favoritesFilms, reviews, isAuthorized, onAddButtonClick, onFilmCardClick} = props;
  const film = getCurentFilm(films, props);
  const {title, genre, year, poster, cover, id} = film;
  const isFavorites = !favoritesFilms.find((movie) => movie.id === id);

  return (
    <>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img
              src={cover}
              alt={title}
            />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <Link to={`/`} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <div className="user-block">
              {isAuthorized
                ? <Link
                  to={`/mylist`}
                  className="user-block__avatar"
                  style={{
                    display: `block`,
                  }}>
                  <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </Link>
                : <Link
                  to={`/login`}
                  className="user-block__link"
                >
                  Sign in
                </Link>
              }
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2
                className="movie-card__title">
                {title}
              </h2>
              <p className="movie-card__meta">
                <span
                  className="movie-card__genre">
                  {genre}
                </span>
                <span
                  className="movie-card__year">
                  {year}
                </span>
              </p>

              <div className="movie-card__buttons">
                <button
                  onClick={() => {
                    history.push(`/films/${id}/player`);
                  }}
                  className="btn btn--play movie-card__button"
                  type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  onClick={() => {
                    if (!isAuthorized) {
                      history.push(`/login`);
                    }
                    const status = isFavorites ? 1 : 0;
                    onAddButtonClick(id, status);
                  }}
                  className="btn btn--list movie-card__button" type="button">
                  {isFavorites
                    ? (<svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>)
                    : (<svg viewBox="0 0 18 14" width="18" height="14">
                      <use xlinkHref="#in-list"></use>
                    </svg>)
                  }
                  <span>My list</span>
                </button>
                {isAuthorized
                  ? (
                    <Link
                      to={`/films/${id}/review`}
                      className="btn movie-card__button"
                    >
                    Add review
                    </Link>
                  )
                  : null
                }
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img
                src={poster}
                alt={title}
                width="218" height="327" />
            </div>

            <TabsWrapped
              film={film}
              reviews={reviews}
            />

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MoviesListWrapped
            films={films.filter((movie) => movie.genre === genre).slice(0, MAX_FILMS_LENGHT)}
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
    </>
  );
};

export default MoviePage;
