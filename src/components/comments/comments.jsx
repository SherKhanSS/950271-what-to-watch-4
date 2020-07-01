import React from "react";
import PropTypes from "prop-types";

const formatDate = (date) => {
  const MONTH_NAMES = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`,
  ];

  return `${MONTH_NAMES[date.getMonth()]}
    ${date.getDate()},
    ${date.getFullYear()}`;
};

const Comments = (props) => {
  const {comments} = props;

  return (
    <div className="movie-card__reviews-col">
      {comments.map((comment, index) => {
        return (
          <div
            key={comment.author + index}
            className="review">
            <blockquote className="review__quote">
              <p className="review__text">{comment.text}</p>

              <footer className="review__details">
                <cite className="review__author">{comment.author}</cite>
                <time className="review__date" dateTime={comment.date}>
                  {formatDate(new Date(comment.date))}
                </time>
              </footer>
            </blockquote>

            <div className="review__rating">{comment.rating}</div>
          </div>
        );
      })}
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default Comments;
