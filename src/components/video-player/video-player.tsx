import * as React from "react";

interface Props {
  preview: string;
  poster: string;
}

class VideoPlayer extends React.PureComponent<Props, {}> {
  private _videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
  }

  componentDidMount() {
    const {poster, preview} = this.props;
    const video = this._videoRef.current;

    video.poster = poster;
    video.src = preview;
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
}

export default VideoPlayer;
