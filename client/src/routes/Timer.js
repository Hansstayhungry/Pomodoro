import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

import endOfBreakAudio from '../assets/end-of-break.wav';
import endOfFocusAudio from '../assets/end-of-focus.wav';

import { Button, TextField, Typography } from "@mui/material"
import Box from '@mui/material/Box';
import "../styles/Timer.scss"

const Timer = (props) => {
  const { workTime, setWorkTime, breakTime, setBreakTime, repeats, setRepeats, timeLeft, setTimeLeft, isActive, setIsActive, isBreakTime, setIsBreakTime, currentRepeat, setCurrentRepeat, endOfBreakAudioRef, endOfFocusAudioRef, pomodoros, setPomodoros, hasStarted, setHasStarted, cookies } = props;

  // set timer
  const minutes = Math.floor(timeLeft / 60);
  const seconds = (timeLeft - minutes * 60).toString().padStart(2, "0");

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // clear interval when time is up
    } else if (timeLeft === 0) {
      clearInterval(interval);

      // check if need to go ahead to break time, and vice versa
      if (currentRepeat < repeats * 2) {
        setIsBreakTime(!isBreakTime);
        setTimeLeft(isBreakTime ? workTime : breakTime);
        setCurrentRepeat((prevRepeat) => prevRepeat + 1);

        // Play audio based on timer type
        if (isBreakTime) {
          endOfFocusAudioRef.current.play();
        } else {
          endOfBreakAudioRef.current.play();
        }
      } else {
        handleEnd(); // All repeats completed, stop the timer
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, workTime, breakTime, isBreakTime, currentRepeat, repeats]);

  const handleToggle = () => {
    try {
      if (!hasStarted && !isActive) {
        const pomodoro = {
          user_id: cookies.user_id,
          task_id: null
        };
        async function createNewPomodoro() {
          let currentDate = new Date();
          let currentTime = currentDate.getTime();
          let workTimeMs = parseInt(workTime) * 1000;
          let breakTimeMs = parseInt(breakTime) * 1000;
          let totalTimeMs = (workTimeMs + breakTimeMs) * repeats;
          let endTimeMs = currentTime + totalTimeMs;
          let startDate = new Date(currentTime);
          let endDate = new Date(endTimeMs);

          // create new date objects with startDate and endDate
          let startTime = new Date(startDate);
          let endTime = new Date(endDate);

          // convert date objects to ISO strings
          let startTimeString = startTime.toISOString();
          let endTimeString = endTime.toISOString();

          const newPomodoro = {
            focus_time: `${workTime / 60} minutes`,
            break_time: `${breakTime / 60} minutes`,
            repeat: repeats,
            start_time: startTimeString,
            estimated_end_time: endTimeString,
            task_id: pomodoro['task_id'],
            user_id: parseInt(pomodoro['user_id'], 10)
          };
          console.log(newPomodoro);
          const response = await axios.post('/pomodoros', newPomodoro);
          setPomodoros({ id: response.data['pomodoros'][0]['id'], user_id: newPomodoro.user_id, task_id: newPomodoro.task_id, complete: false });
          console.log({ id: response.data['pomodoros'][0]['id'] });

        }
        createNewPomodoro();
      }
      if (!hasStarted) {
        setHasStarted(true);
      }
      setIsActive(!isActive);
    }
    catch (error) {
      console.error(error);
    }
  };

  const handleEnd = async () => {
    setIsActive(false);
    setCurrentRepeat(1);
    setTimeLeft(workTime);
    setIsBreakTime(false);
    setHasStarted(false);
    if (Object.keys(pomodoros).length > 0) {
      let currentDate = new Date();
      let currentTime = currentDate.getTime();
      let startDate = new Date(currentTime);

      // create new date objects with startDate and endDate
      let startTime = new Date(startDate);

      // convert date objects to ISO strings
      let startTimeString = startTime.toISOString();
      const response = await axios.post(`/pomodoros/${pomodoros['id']}/edit`, { end_time: startTimeString });
      setPomodoros({ ...pomodoros, complete: true });
      console.log(response.data);
    }
  };

  const handleWorkTimeChange = (event) => {
    setWorkTime(event.target.value * 60);
    if (!isActive && !isBreakTime) {
      setTimeLeft(event.target.value * 60);
    }
  };

  const handleBreakTimeChange = (event) => {
    setBreakTime(event.target.value * 60);
    if (!isActive && isBreakTime) {
      setTimeLeft(event.target.value * 60);
    }
  };

  const handleRepeatChange = (event) => {
    setRepeats(event.target.value);
  };

  return (
    <div className="timer">

      <audio ref={endOfBreakAudioRef}>
        <source src={endOfBreakAudio} type="audio/mpeg" />
      </audio>
      <audio ref={endOfFocusAudioRef}>
        <source src={endOfFocusAudio} type="audio/mpeg" />
      </audio>

      <Typography variant="h5">{isBreakTime ? "Break Time" : "Work Time"}</Typography>
      <Typography variant="h1">
        {minutes}:{seconds}
      </Typography>
      <div className="buttons">
        {hasStarted && ( // Show "Pause/Resume" and "End" buttons if the user has started the timer
          <>
            <Button onClick={handleToggle}>{isActive ? "Pause" : "Resume"}</Button>
            <Button onClick={handleEnd}>End</Button>
          </>
        )}
        {!hasStarted && ( // Show "Start" button if the user has not started the timer
          <Button onClick={handleToggle}>Start</Button>
        )}
      <div className="status">
        {hasStarted && (<p> Current set: {Math.round(currentRepeat /2)} / {repeats} </p>)}
      </div>
      </div>
      {!hasStarted && (<div className="settings">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '20ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-number"
            label=
            "Focus Time (minutes):"

            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ inputProps: { min: 1 } }}
            variant="standard"
            value={workTime / 60}
            onChange={handleWorkTimeChange}
          />
          <TextField
            id="outlined-number"
            label=
            "Break Time (minutes):"

            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ inputProps: { min: 1 } }}
            variant="standard"
            value={breakTime / 60}
            onChange={handleBreakTimeChange}
            min="1"
          />
          <TextField
            id="outlined-number"
            label=
            "Number of Repeats"

            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ inputProps: { min: 1 } }}
            variant="standard"
            value={repeats}
            onChange={handleRepeatChange}
          />
        </Box>
      </div>)}
    </div>
  );
};

export default Timer;
