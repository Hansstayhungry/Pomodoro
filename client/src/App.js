import './App.scss';

import { useState, useEffect } from 'react';

import Timer from './routes/Timer';
import TodoList from './routes/TodoList';
import Header from './components/Header';
import Footer from './components/Footer';
import Ambient from './components/Ambient';

import { Typography, AppBar, Card, CardActions, CardContent, 
  CardMedia, CssBaseline, Grid, Toolbar, Container } from '@mui/material';

function App() {

  const GET_AUDIO = '/audio/api/'
  const GET_TASKS = '/tasks'

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
    async function fetchTasksData () {
      const tasksResponse = await fetch(GET_TASKS);
      let tasksData = await tasksResponse.json();
      tasksData = tasksData['tasks'];
      console.log(tasksData)
      setTodos(tasksData);
    }
    fetchAudioData();
    fetchTasksData();
  }, [])

  return (
    <div className='App'>

      <Header audioUrl={audioUrl} handleAmbientToggle={handleAmbientToggle} handleHomeToggle={handleHomeToggle} />
      {showHome && (
        <>
          <Timer />
          <TodoList todos={todos} setTodos={setTodos} />
        </>
      )}

      {showAmbient && <Ambient audio = {audio} handleAudioClick ={handleAudioClick}
      />}

      <Footer />

    </div>
  );
}

export default App;
