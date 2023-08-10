import './App.scss';

import { useState, useEffect } from 'react';

import Timer from './routes/Timer';
import Todo from './routes/Todo';
import Header from './components/Header';
import Ambient from './components/Ambient';

import 'react-h5-audio-player/lib/styles.css';

import { Typography, AppBar, Card, CardActions, CardContent, 
  CardMedia, CssBaseline, Grid, Toolbar, Container } from '@mui/material';

function App() {

  const GET_AUDIO = '/audio/api/'

  const [todos, setTodos] = useState([]);
  const [audio, setAudio] = useState([]);
  const [showAmbient, setShowAmbient] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [audioUrl, setAudioUrl] = useState([]);

  const handleAudioClick = (link) => {
    setAudioUrl(link)
  }

  const handleAmbientToggle = () => {
    setShowHome(false);
    setShowAmbient(true);
  }

  const handleHomeToggle = () => {
    setShowAmbient(false);
    setShowHome(true);
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

      <Header audioUrl={audioUrl} handleAmbientToggle={handleAmbientToggle} handleHomeToggle={handleHomeToggle} />
      {showHome && (
        <>
          <Timer />
          <Todo todos={todos} />
        </>
      )}

      {showAmbient && <Ambient audio = {audio} handleAudioClick ={handleAudioClick}
      />}
    </div>

  );
}

export default App;
