import './App.scss';

import { useState, useEffect } from 'react';

import Timer from './routes/Timer';
import TodoList from './routes/TodoList';
import Header from './components/Header';
import Footer from './components/Footer';
import Ambient from './components/Ambient';
import Login from './components/Login';
import axios from 'axios';
import './styles/App.scss';

// import { Typography, AppBar, Card, CardActions, CardContent, 
//   CardMedia, CssBaseline, Grid, Toolbar, Container } from '@mui/material';
import Dashboard from './components/Dashboard';
import SignUp from './components/Signup';

function App() {

  const GET_AUDIO = '/audio/api/'
  const GET_TASKS = '/tasks'
  const [loggedInUser, setLoggedInUser] = useState('');

  const [audio, setAudio] = useState([]);
  const [showAmbient, setShowAmbient] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [audioUrl, setAudioUrl] = useState([]);
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignUp] = useState(false)

  // Timer State 
  const [workTime, setWorkTime] = useState(45 * 60); // Default to 45 mins
  const [breakTime, setBreakTime] = useState(5 * 60); // Default to 15 mins
  const [repeats, setRepeats] = useState(4); // Default to 4 repeats (work + break sessions)
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [currentRepeat, setCurrentRepeat] = useState(1);

  // TodoList State
  const [todos, setTodos] = useState([]);
  const [pomodoros, setPomodoros] = useState([]);
  const [inputTitle, setInputTitle] = useState(''); // state for the title input
  const [inputDescription, setInputDescription] = useState(''); // state for the description input
  const [error, setError] = useState(false);
  const [open, setOpen] = useState({}); // state to keep track of which todo is expanded

  const handleAudioClick = (link) => {
    setAudioUrl(link)
  }

  const handleAmbientToggle = () => {
    setShowHome(false);
    setShowAmbient(true);
    setShowLogin(false)
    setShowSignUp(false)
  }

  const handleHomeToggle = () => {
    setShowAmbient(false);
    setShowHome(true);
    setShowLogin(false)
    setShowSignUp(false)
  }

  const handleSignIn = () => {
    setShowLogin(true);
    setShowAmbient(false);
    setShowHome(false);
    setShowSignUp(false)
  }

  const handleSignUp = () => {
    setShowSignUp(true)
    setShowHome(false);
    setShowAmbient(false);
    setShowLogin(false)
  }

  const handleSignOut = async () => {
    console.log('logging out 1');
    const response = await axios.post('/users/logout');
    console.log(response);
    setLoggedInUser('');
    setShowLogin(true);
    setShowAmbient(false);
    setShowHome(false);
    setShowSignUp(false);  
    console.log('logging out 3');
  }

  useEffect(() => {
    async function fetchAudioData() {
      const audioResponse = await fetch(GET_AUDIO);
      const audioData = await audioResponse.json();
      console.log(audioData)
      setAudio(audioData);
    }
    async function fetchTasksData() {
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

      <Header className='header' audioUrl={audioUrl} handleAmbientToggle={handleAmbientToggle} handleHomeToggle={handleHomeToggle}
        handleSignIn={handleSignIn} handleSignUp={handleSignUp} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} handleSignOut={handleSignOut}/>
      <div className='main-container'>
        {showHome && (
          <>
            <Timer workTime={workTime} setWorkTime={setWorkTime} breakTime={breakTime} setBreakTime={setBreakTime} repeats={repeats} setRepeats={setRepeats} timeLeft={timeLeft} setTimeLeft={setTimeLeft} isActive={isActive} setIsActive={setIsActive} isBreakTime={isBreakTime} setIsBreakTime={setIsBreakTime} currentRepeat={currentRepeat} setCurrentRepeat={setCurrentRepeat} />

            <TodoList todos={todos} setTodos={setTodos} pomodoros={pomodoros} setPomodoros={setPomodoros} inputTitle={inputTitle} setInputTitle={setInputTitle} inputDescription={inputDescription} setInputDescription={setInputDescription} error={error} setError={setError} open={open} setOpen={setOpen} />
          </>
        )}

        {showAmbient && <Ambient audio={audio} handleAudioClick={handleAudioClick}
        />}

        {showLogin && <Login open={showLogin} handleHomeToggle={handleHomeToggle} handleSignIn={handleSignIn} handleSignUp={handleSignUp} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>}
        {showSignup && <SignUp open={showSignup} handleHomeToggle={handleHomeToggle} handleSignUp={handleSignUp} handleSignIn={handleSignIn} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>}

        <Dashboard />
        <Footer />
      </div>
    </div >
  );
}

export default App;
