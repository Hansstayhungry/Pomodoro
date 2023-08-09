import React from 'react';
import AudioCard from './AudioCard';

const Ambient = (props) => {
  const {audio, handleAudioClick} = props;

  return (
    <div>
      {audio.map((audio, index) => (
        <AudioCard key={index} name={audio.name} link={audio.link} picture={audio.picture}
        handleAudioClick={handleAudioClick}/>
      ))}
    </div>
  );
};

export default Ambient;
