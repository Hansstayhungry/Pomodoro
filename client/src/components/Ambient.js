import React from 'react';
import AudioCard from './AudioCard';

import '../styles/Ambient.scss'

const Ambient = (props) => {
  const {audio, handleAudioClick} = props;

  return (
    <div className='cardContainer'>
      {audio.map((audio, index) => (
        <AudioCard key={index} name={audio.name} link={audio.link} picture={audio.picture}
        handleAudioClick={handleAudioClick}/>
      ))}
    </div>
  );
};

export default Ambient;
