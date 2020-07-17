import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {getCurentFilm} from "../../utils.js";
import history from "../../history.js";

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.reviewRef = createRef();
    this.formRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmitReview} = this.props;
    const {id} = getCurentFilm(this.props.films, this.props);

    evt.preventDefault();

    onSubmitReview(id, {
      rating: this.formRef.current.rating.value,
      comment: this.reviewRef.current.value,
    });
  }

  render() {
    const {films, showSendError, onReviewSuccess, isSent} = this.props;
    const film = getCurentFilm(films, this.props);
    const {title, poster, cover, id} = film;

    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img
              src={cover}
              alt={title}
            />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Link to={`/`} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`/films/${id}`} className="breadcrumbs__link">
                    {title}
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <div className="user-block">
              <Link
                to={`/mylist`}
                className="user-block__avatar"
                style={{
                  display: `block`,
                }}>
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </Link>
            </div>
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img
              src={poster}
              alt={title}
              width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form
            ref={this.formRef}
            onSubmit={this.handleSubmit}
            action="#"
            className="add-review__form">
            <div className="rating">
              <div className="rating__stars">
                <input disabled={isSent} className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input disabled={isSent} className="rating__input" id="star-2" type="radio" name="rating" value="2" />
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input disabled={isSent} className="rating__input" id="star-3" type="radio" name="rating" value="3" defaultChecked />
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input disabled={isSent} className="rating__input" id="star-4" type="radio" name="rating" value="4" />
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input disabled={isSent} className="rating__input" id="star-5" type="radio" name="rating" value="5" />
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
              {showSendError
                ? (<div
                  style={{
                    color: `red`,
                  }}
                  className="rating__stars">
                    You have broken the most reliable application in the world! They are coming for you!
                </div>)
                : null}
              {onReviewSuccess
                ? history.push(`/films/${id}`)
                : null}
            </div>

            <div className="add-review__text">
              <textarea
                ref={this.reviewRef}
                disabled={isSent}
                required
                minLength={50}
                maxLength={400}
                className="add-review__textarea"
                name="review-text"
                id="review-text"
                placeholder="Review text"></textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit">Post</button>
              </div>

            </div>
          </form>
        </div>

      </section>
    );
  }
}

AddReview.propTypes = {
  films: PropTypes.any,
  onSubmitReview: PropTypes.func.isRequired,
  showSendError: PropTypes.bool.isRequired,
  onReviewSuccess: PropTypes.bool.isRequired,
  isSent: PropTypes.bool.isRequired,
  match: PropTypes.any,
  params: PropTypes.any,
  id: PropTypes.any,
};

export default AddReview;
