import * as React from "react";
import Comments from "../comments/comments";
import {Film, Review} from "../../types";

interface Props {
  film: Film;
  tabCurrent: string;
  onTabClick: (tab: string) => void;
  reviews: Review[];
}

class Tabs extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);

    this.getRatingLevel = this.getRatingLevel.bind(this);
    this.getComponentByTab = this.getComponentByTab.bind(this);
  }

  getRatingLevel(rating) {
    if (rating >= 0 && rating < 3) {
      return `Bad`;
    }
    if (rating < 5) {
      return `Normal`;
    }
    if (rating < 8) {
      return `Good`;
    }
    if (rating < 10) {
      return `Very good`;
    }
    if (rating === 10) {
      return `Awesome`;
    }
    return null;
  }

  formatTime(time) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}h ${minutes}m`;
  }

  getComponentByTab(tab) {


    const {reviews} = this.props;
    const {genre, year, runTime, ratingScore, ratingCount, description, director, starring} = this.props.film;

    switch (tab) {

      case `Overview`:
        return (
        <>
        <div className="movie-rating">
          <div
            className="movie-rating__score">
            {ratingScore}
          </div>
          <p className="movie-rating__meta">
            <span
              className="movie-rating__level">
              {this.getRatingLevel(ratingScore)}
            </span>
            <span
              className="movie-rating__count">
              {ratingCount} ratings
            </span>
          </p>
        </div>

        <div className="movie-card__text">
          <p>{description}</p>
          <p className="movie-card__director">
            <strong>
            Director: {director}
            </strong></p>
          <p className="movie-card__starring">
            <strong>
            Starring: {starring.map((actor) => {
                return (
                  <React.Fragment key={actor}>
                    {actor}{`, `}
                  </React.Fragment>
                );
              })}
            </strong>
          </p>
        </div>
        </>
        );


      case `Details`:
        return (
          <div className="movie-card__text movie-card__row">
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Director</strong>
                <span className="movie-card__details-value">{director}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Starring</strong>
                <span className="movie-card__details-value">
                  {starring.map((actor) => {
                    return (
                      <React.Fragment key={actor}>
                        {actor} <br/>
                      </React.Fragment>
                    );
                  })}
                </span>
              </p>
            </div>

            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Run Time</strong>
                <span className="movie-card__details-value">
                  {this.formatTime(runTime)}
                </span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Genre</strong>
                <span className="movie-card__details-value">{genre}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Released</strong>
                <span className="movie-card__details-value">{year}</span>
              </p>
            </div>
          </div>
        );


      case `Reviews`:
        return (
          <div className="movie-card__reviews movie-card__row">

            <Comments
              comments={reviews.slice(0, 3)}
            />
            <Comments
              comments={reviews.slice(3, 7)}
            />

          </div>
        );

      default:
        return null;
    }
  }

  render() {
    const {tabCurrent, onTabClick} = this.props;
    const tabs = [`Overview`, `Details`, `Reviews`];

    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {tabs.map((tab, index) => {
              return (
                <li
                  onClick={(evt) => {
                    evt.preventDefault();
                    onTabClick(tab);
                  }}
                  key={tab + index}
                  className={`movie-nav__item`
                  + (tabCurrent === tab ? ` movie-nav__item--active` : ``)}>
                  <a href="#" className="movie-nav__link">{tab}</a>
                </li>
              );
            })}
          </ul>
        </nav>

        {this.getComponentByTab(tabCurrent)}

      </div>
    );
  }
}

export default Tabs;
