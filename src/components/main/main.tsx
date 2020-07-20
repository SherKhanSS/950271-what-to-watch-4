import * as React from "react";
import {Link} from "react-router-dom";
import GenresList from "../genres-list/genres-list";
import MoviesList from "../movies-list/movies-list";
import withMoviesList from "../../hocs/with-movies-list/with-movies-list";
import ShowMore from "../show-more/show-more";
import history from "../../history";
import {Film} from "../../types";

const MoviesListWrapped = withMoviesList(MoviesList);

interface Props {
  films: Film[];
  film: Film;
  genres: string[];
  favoritesFilms: Film[];
  currentGenre: string;
  filmsLength: number;
  isAuthorized: boolean;
  onGenresItemClick: () => void;
  onShowMoreClick: () => void;
  onAddButtonClick: (id: number, status: number) => void;
  onFilmCardClick: () => void;
}

const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {
    films,
    film,
    genres,
    favoritesFilms,
    currentGenre,
    filmsLength,
    onGenresItemClick,
    onShowMoreClick,
    isAuthorized,
    onAddButtonClick,
    onFilmCardClick,
  } = props;
  const {title, genre, year, cover, poster, id} = film;

  const isFavorites = !favoritesFilms.find((movie) => movie.id === id);

  return (
    <>
      <section className="movie-card">
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
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img
                src={poster}
                alt={title + ` poster`}
                width="218" height="327"
              />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList
            genres={genres}
            currentGenre={currentGenre}
            onGenresItemClick={onGenresItemClick}
          />

          <MoviesListWrapped
            films={films.slice(0, filmsLength)}
            onFilmCardClick={onFilmCardClick}
          />

          {filmsLength < films.length
            ? <ShowMore
              onShowMoreClick={onShowMoreClick}
            />
            : null}

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

export default Main;
