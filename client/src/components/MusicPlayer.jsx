import React from "react";
import "react-h5-audio-player/lib/styles.css";
import AudioPlayer from "react-h5-audio-player";

const MusicPlayer = (props) => {
  const { songURL, setIsPlaying, isMusicPlayed } = props;

  return (
    <div
      style={{ visibility: isMusicPlayed ? "visible" : "hidden" }}
      className={`fixed z-10 bottom-0 w-full`}
    >
      <AudioPlayer
        autoPlay
        src={songURL}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default MusicPlayer;
