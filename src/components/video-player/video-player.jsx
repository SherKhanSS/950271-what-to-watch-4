import React from "react";
import PropTypes from "prop-types";

const VideoPlayer = (props) => {
  const {preview, poster} = props;

  return (
    <video
      src={preview}
      poster={poster}
      muted="muted"
    />
  );
};

VideoPlayer.propTypes = {
  preview: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

export default VideoPlayer;
