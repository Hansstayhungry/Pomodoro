import React from "react";

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = (props) => {
  const { audioUrl } = props;

  return (
    <AudioPlayer
      autoPlay
      src= {audioUrl}
      onPlay={e => console.log("onPlay")}
      // other props here
    />    
  )
}




export default Player;