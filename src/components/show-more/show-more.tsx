import * as React from "react";

interface Props {
  onShowMoreClick: () => void;
}

const ShowMore: React.FunctionComponent<Props> = (props: Props) => {
  const {onShowMoreClick} = props;

  return (
    <div className="catalog__more">
      <button
        onClick={() => {
          onShowMoreClick();
        }}
        className="catalog__button" type="button">Show more</button>
    </div>
  );
};

export default ShowMore;
