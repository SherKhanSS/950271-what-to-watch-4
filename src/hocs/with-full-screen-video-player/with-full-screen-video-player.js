import React, {PureComponent, createRef} from 'react';
import PropTypes from "prop-types";

const withFullScreenVideoPlayer = (Component) => {
  class WithFullScreenVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlay: true,
        isFullscreen: false,
        timeElapsed: null,
        progress: null,
        duration: null,
      };

      this._videoRef = createRef();

      this.handlePlayPauseButtonClick = this.handlePlayPauseButtonClick.bind(this);
      this.handleFullScreenClick = this.handleFullScreenClick.bind(this);
    }

    componentDidMount() {
      const {poster, preview} = this.props;
      const video = this._videoRef.current;

      video.poster = poster;
      video.src = preview;

      video.ontimeupdate = () => this.setState({
        timeElapsed: Math.floor(video.duration - video.currentTime),
        progress: Math.floor(video.currentTime),
        duration: Math.floor(video.duration),
      });
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.poster = null;
      video.src = null;
      video.ontimeupdate = null;
    }

    componentDidUpdate() {
      const {isPlay, isFullscreen} = this.state;
      const video = this._videoRef.current;

      if (isPlay) {
        video.play();
      } else {
        video.pause();
      }

      if (isFullscreen) {
        video.requestFullscreen();
      }

      if (!Document.fullScreenElement) {
        this.setState({
          isFullscreen: false,
        });
      }
    }

    handlePlayPauseButtonClick() {
      const {isPlay} = this.state;

      this.setState({
        isPlay: !isPlay
      });
    }

    handleFullScreenClick() {
      const {isFullscreen} = this.state;

      this.setState({
        isFullscreen: !isFullscreen
      });
    }

    render() {
      const {onPlayerExitClick} = this.props;

      return (<Component
        {...this.props}
        isPlay={this.state.isPlay}
        timeElapsed={this.state.timeElapsed}
        currentProgress={Math.floor(this.state.progress * 100 / this.state.duration).toString()}
        onPlayPauseButtonClick={this.handlePlayPauseButtonClick}
        onFullScreenClick={this.handleFullScreenClick}
        onPlayerExitClick={onPlayerExitClick}
      >
        <video
          ref={this._videoRef}
          autoPlay={true}
          className="player__video"
        />
      </Component>
      );
    }
  }

  WithFullScreenVideoPlayer.propTypes = {
    poster: PropTypes.any,
    preview: PropTypes.any,
    onPlayerExitClick: PropTypes.any,
  };

  return WithFullScreenVideoPlayer;
};

export default withFullScreenVideoPlayer;
