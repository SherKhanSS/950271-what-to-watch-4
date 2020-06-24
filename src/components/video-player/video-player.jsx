import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
  }

  componentDidMount() {
    const {poster} = this.props;
    const video = this._videoRef.current;

    video.poster = poster;
    video.src = null;
    video.width = 280;
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.poster = null;
    video.src = null;
    video.width = null;
  }

  render() {
    return (
      <video
        ref={this._videoRef}
        muted={true}
        autoPlay={true}
      />
    );
  }

  componentDidUpdate() {
    const {preview, isPlaying} = this.props;
    const video = this._videoRef.current;

    if (isPlaying) {
      video.src = preview;
    } else {
      video.src = null;
    }
  }
}

VideoPlayer.propTypes = {
  preview: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default VideoPlayer;
