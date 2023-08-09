// import './App.scss';

import { useState, useEffect } from 'react';

import Timer from './routes/Timer';
import Todo from './routes/Todo';
import Header from './components/Header';
import Player from './components/Player';
import Ambient from './components/Ambient';

import 'react-h5-audio-player/lib/styles.css';


function App() {

  const GET_AUDIO = '/audio/api/'

  const [todos, setTodos] = useState([]);
  const [audio, setAudio] = useState([]);
  const [showAmbient, setShowAmbient] = useState(false);
  const [audioUrl, setAudioUrl] = useState([]);

  const handleAudioClick = (link) => {
    setAudioUrl(link)
  }

  const handleAmbientToggle = () => {
    setShowAmbient(!showAmbient);
  }

  
  useEffect(() => {
    async function fetchAudioData () {
      const audioResponse = await fetch(GET_AUDIO);
      const audioData = await audioResponse.json();
      console.log(audioData)
      setAudio(audioData);
    }
    fetchAudioData();
  }, [todos])

  return (
    <div className='App'>
      <Header audioUrl = {audioUrl} handleAmbientToggle={handleAmbientToggle}
      />

      <Timer
      />

      {showAmbient && <Ambient audio = {audio} handleAudioClick ={handleAudioClick}
      />}

      <Todo todos={todos}
      />
    </div>

  );
}

export default App;
