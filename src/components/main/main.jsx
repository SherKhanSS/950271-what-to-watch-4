import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import GenresList from "../genres-list/genres-list.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import withMoviesList from "../../hocs/with-movies-list/with-movies-list.js";
import ShowMore from "../show-more/show-more.jsx";
import history from "../../history.js";

const MoviesListWrapped = withMoviesList(MoviesList);

const Main = (props) => {

  const {title, genre, year, cover, poster} = props.film;
  const {films, genres, currentGenre, filmsLength, onFilmTitleClick, onGenresItemClick, onShowMoreClick, onPlayButtonClick, isAuthorized, filmsAddedToWatch, onAddButtonClick} = props;

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
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
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
                    onPlayButtonClick();
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

                    let newFilmsAddedToWatch = new Set([...filmsAddedToWatch]);
                    if (filmsAddedToWatch.has(title)) {
                      newFilmsAddedToWatch.delete(title);
                    } else {
                      newFilmsAddedToWatch.add(title);
                    }
                    onAddButtonClick(newFilmsAddedToWatch);
                  }}
                  className="btn btn--list movie-card__button" type="button">
                  {filmsAddedToWatch.has(title)
                    ? (
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                    )
                    : (<svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
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
            onFilmTitleClick={onFilmTitleClick}
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

Main.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    cover: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }),
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
  genres: PropTypes.array.isRequired,
  currentGenre: PropTypes.string.isRequired,
  filmsLength: PropTypes.number.isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
  onGenresItemClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  filmsAddedToWatch: PropTypes.object,
};

export default Main;
