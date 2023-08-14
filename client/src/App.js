import { useState, useEffect, useRef } from 'react';

import Timer from './routes/Timer';
import TodoList from './routes/TodoList';
import Header from './components/Header';
import Footer from './components/Footer';
import Ambient from './components/Ambient';
import Login from './components/Login';
import axios from 'axios';
import { useCookies } from "react-cookie";

// import { Typography, AppBar, Card, CardActions, CardContent, 
//   CardMedia, CssBaseline, Grid, Toolbar, Container } from '@mui/material';
import Dashboard from './components/Dashboard';
import SignUp from './components/Signup';

import './styles/App.scss';

function App() {

  const GET_AUDIO = '/audio/api/'
  const [cookies, setCookie] = useCookies();
  const [loggedInUser, setLoggedInUser] = useState({});

  const [audio, setAudio] = useState([]);
  const [showAmbient, setShowAmbient] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [audioUrl, setAudioUrl] = useState([]);
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignUp] = useState(false)

  // Timer State 
  const [workTime, setWorkTime] = useState(45 * 60); // Default to 45 mins
  const [breakTime, setBreakTime] = useState(15 * 60); // Default to 15 mins
  const [repeats, setRepeats] = useState(4); // Default to 4 repeats (work + break sessions)
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // Track whether the user has clicked "Start"
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [currentRepeat, setCurrentRepeat] = useState(1);
  const endOfBreakAudioRef = useRef(null);
  const endOfFocusAudioRef = useRef(null);

  // TodoList State
  const [todos, setTodos] = useState([]);
  const [pomodoros, setPomodoros] = useState({});
  const [inputTitle, setInputTitle] = useState(''); // state for the title input
  const [inputDescription, setInputDescription] = useState(''); // state for the description input
  const [error, setError] = useState(false);
  const [open, setOpen] = useState({}); // state to keep track of which todo is expanded

  // Login State
  const [loginEmailError, setLoginEmailError] = useState(false);
  const [loginPasswordError, setLoginPasswordError] = useState(false);

  // Sign Up State
  const [signUpFirstNameError, setSignUpFirstNameError] = useState(false);
  const [signUpLastNameError, setSignUpLastNameError] = useState(false);
  const [signUpEmailError, setSignUpEmailError] = useState(false);
  const [signUpPasswordError, setSignUpPasswordError] = useState(false);

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
    try {
      console.log('logging out 1');
      const response = await axios.post('/users/logout');
      console.log(response);
      setCookie('user_id', null);

      setLoggedInUser({});
      setShowLogin(true);
      setShowAmbient(false);
      setShowHome(false);
      setShowSignUp(false)
      console.log('logging out 3');
    } catch (error) {
      console.error('Error during sign out', error)
    }
  }

  useEffect(() => {
    async function fetchUser() {
      console.log(cookies.user_id);
      if(cookies.user_id && cookies.user_id > 0){
        const response = await axios.get(`/users/${cookies.user_id}`);
        console.log(response.data);
        const userLoggedIn = {
          id: response.data['users'][0]['id'], 
          email: response.data['users'][0]['email']
        };
        setLoggedInUser(userLoggedIn);
      }      
    }    
    async function fetchAudioData() {
      const audioResponse = await fetch(GET_AUDIO);
      const audioData = await audioResponse.json();
      console.log(audioData)
      setAudio(audioData);
    }
    fetchUser();
    fetchAudioData();    
  }, [])

  useEffect(() => {
    async function fetchTasksData() {
      console.log('loggedInUser key length', Object.keys(loggedInUser).length);
      if (Object.keys(loggedInUser).length > 0) {
        try {
          const response = await axios.get(`/users/${loggedInUser['id']}/tasks`);
          console.log(response.data);
          setTodos(response.data['tasks']);          
        } catch (error) {
          console.error('Error during sign out', error)
        }
      } else {
        setTodos([]);  
      }
    }
    fetchTasksData();   
  }, [loggedInUser])

  useEffect(() => {
    async function completeTasks() {
      if(Object.keys(pomodoros).length > 0 && pomodoros['complete'] && pomodoros['task_id'] && pomodoros['task_id'] > 0){
        try {
          // find the task by id in the state
          const task = todos.find(todo => todo.id === pomodoros['task_id']);
          // toggle its status between completed and pending
          task.status = 'completed';
          // update the task in the database with the new status
          await axios.post(`/tasks/${pomodoros['task_id']}/edit`, task);
    
          // add this line to update the state with the toggled task
          todos.splice(todos.indexOf(task), 1, task)
          setTodos([...todos]);
        } catch (error) {
          console.error(error);
        }
        setPomodoros({});
      } else if(Object.keys(pomodoros).length > 0 && pomodoros['complete'] && !pomodoros['task_id']) {
        setPomodoros({});
      }     
    }
    completeTasks(); 
  }, [pomodoros]);

  return (
    <div className='app'>
      <Header className='header' audioUrl={audioUrl} handleAmbientToggle={handleAmbientToggle} handleHomeToggle={handleHomeToggle}
        handleSignIn={handleSignIn} handleSignUp={handleSignUp} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} handleSignOut={handleSignOut} />
      <div className='main-container'>
        {showHome && (
          <>
            <Timer workTime={workTime} setWorkTime={setWorkTime} breakTime={breakTime} setBreakTime={setBreakTime} repeats={repeats} setRepeats={setRepeats} timeLeft={timeLeft} setTimeLeft={setTimeLeft} isActive={isActive} setIsActive={setIsActive} isBreakTime={isBreakTime} setIsBreakTime={setIsBreakTime} currentRepeat={currentRepeat} setCurrentRepeat={setCurrentRepeat} endOfBreakAudioRef={endOfBreakAudioRef} endOfFocusAudioRef={endOfFocusAudioRef} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} pomodoros={pomodoros} setPomodoros={setPomodoros} hasStarted={hasStarted} setHasStarted={setHasStarted} cookies={cookies} />

            <TodoList todos={todos} setTodos={setTodos} pomodoros={pomodoros} setPomodoros={setPomodoros} inputTitle={inputTitle} setInputTitle={setInputTitle} inputDescription={inputDescription} setInputDescription={setInputDescription} error={error} setError={setError} open={open} setOpen={setOpen} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} cookies={cookies} workTime={workTime} breakTime={breakTime} repeats={repeats} isActive={isActive} setIsActive={setIsActive} hasStarted={hasStarted} setHasStarted={setHasStarted}/>
          </>
        )}

        {showAmbient && <Ambient audio={audio} handleAudioClick={handleAudioClick} />}

        {showLogin && <Login open={showLogin} handleHomeToggle={handleHomeToggle} handleSignIn={handleSignIn} handleSignUp={handleSignUp} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} loginEmailError={loginEmailError} setLoginEmailError={setLoginEmailError} loginPasswordError={loginPasswordError} setLoginPasswordError={setLoginPasswordError} setCookie={setCookie}/>}

        {showSignup && <SignUp open={showSignup} handleHomeToggle={handleHomeToggle} handleSignUp={handleSignUp} handleSignIn={handleSignIn} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} signUpFirstNameError={signUpFirstNameError} setSignUpFirstNameError={setSignUpFirstNameError} signUpLastNameError={signUpLastNameError} setSignUpLastNameError={setSignUpLastNameError} signUpEmailError={signUpEmailError} setSignUpEmailError={setSignUpEmailError} signUpPasswordError={signUpPasswordError} setSignUpPasswordError={setSignUpPasswordError} setCookie={setCookie}/>}

        <Dashboard />
        <Footer />
      </div>
    </div >
  );
}

export default App;
