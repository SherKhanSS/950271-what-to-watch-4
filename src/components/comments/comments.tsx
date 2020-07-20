import * as React from "react";
import {Review} from "../../types";

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

interface Props {
  comments: Review[];
}

const Comments: React.FunctionComponent<Props> = (props: Props) => {
  const {comments} = props;

  return (
    <div className="movie-card__reviews-col">
      {comments.map((comment, index) => {
        return (
          <div
            key={comment.id + index}
            className="review">
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>
              <footer className="review__details">
                <cite className="review__author">{comment.user.name}</cite>
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

export default Comments;
