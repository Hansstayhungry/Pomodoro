import React, { useState, useEffect, useRef } from "react";

import endOfBreakAudio from '../assets/end-of-break.wav';
import endOfFocusAudio from '../assets/end-of-focus.wav';

import { Button, TextField, Typography } from "@mui/material"
import Box from '@mui/material/Box';
import "../styles/Timer.scss"

const Timer = (props) => {
  const {workTime, setWorkTime, breakTime, setBreakTime, repeats, setRepeats,timeLeft, setTimeLeft, isActive, setIsActive, isBreakTime, setIsBreakTime, currentRepeat, setCurrentRepeat, endOfBreakAudioRef, endOfFocusAudioRef} = props;

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
      if (currentRepeat < repeats) {
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
    if (!hasStarted) {
      setHasStarted(true);
    }
    setIsActive(!isActive);
  };

  const handleEnd = () => {
    setIsActive(false);
    setCurrentRepeat(1);
    setTimeLeft(workTime);
    setIsBreakTime(false);
    setHasStarted(false);
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

  const [hasStarted, setHasStarted] = useState(false); // Track whether the user has clicked "Start"

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
              variant="standard"
              value={workTime / 60}
              onChange={handleWorkTimeChange}
              min="1"
            />
          <TextField
              id="outlined-number"
              label=
                "Break Time (minutes):"

              type="number"
              InputLabelProps={{
                shrink: true,
              }}
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
              variant="standard"
              value={repeats}
              onChange={handleRepeatChange}
              min="1"
            />                          
        </Box>
      </div>)}
    </div>
  );
};

export default Timer;
