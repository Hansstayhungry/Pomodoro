import React, { useState, useEffect } from "react";

import { Button, TextField, Typography } from "@mui/material"
import "../styles/Timer.scss"

const Timer = (props) => {
  const {workTime, setWorkTime, breakTime, setBreakTime, repeats, setRepeats,timeLeft, setTimeLeft, isActive, setIsActive, isBreakTime, setIsBreakTime, currentRepeat, setCurrentRepeat} = props;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = (timeLeft - minutes * 60).toString().padStart(2, "0");

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      if (currentRepeat < repeats) {
        setIsBreakTime(!isBreakTime);
        setCurrentRepeat((prevRepeat) => prevRepeat + 1);
        setTimeLeft(isBreakTime ? workTime : breakTime);
      } else {
        setIsActive(false); // All repeats completed, stop the timer
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, workTime, breakTime, isBreakTime, currentRepeat, repeats]);

  const handleToggle = () => {
    if (!isActive) {
      setIsActive(true);
      if (timeLeft === 0) {
        setCurrentRepeat(0);
        setIsBreakTime(false);
        setTimeLeft(workTime);
      }
    } else {
      setIsActive(false);
    }
  };

  const handleEnd = () => {
    setIsActive(false);
    setCurrentRepeat(0);
    setTimeLeft(workTime);
    setIsBreakTime(false);
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
      <Typography variant='h5' >{isBreakTime ? "Break Time" : "Work Time"}</Typography>
      <Typography variant='h2'>
        {minutes}:{seconds}
      </Typography>
      <div className="buttons">
        <Button onClick={handleToggle}>{isActive ? "Pause" : "Start"}</Button>
        <Button onClick={handleEnd}>End</Button>
      </div>
      <div className="settings">
        <label>
          Work Time (minutes):
          <input
            type="number"
            value={workTime / 60}
            onChange={handleWorkTimeChange}
            min="1"
          />
        </label>
        <label>
          Break Time (minutes):
          <input
            type="number"
            value={breakTime / 60}
            onChange={handleBreakTimeChange}
            min="1"
          />
        </label>
        <label>
          Number of Repeats:
          <input
            type="number"
            value={repeats}
            onChange={handleRepeatChange}
            min="1"
          />
        </label>
      </div>
    </div>
  );
};

export default Timer;
