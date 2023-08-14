// TodoList.js
import React, { useEffect, useState } from 'react';
import { Button, TextField, List, ListItem, ListItemText, Checkbox, Collapse, Typography } from '@mui/material';

import axios from 'axios';
import '../styles/TodoList.scss';

const TodoList = (props) => {

  const { todos, setTodos, pomodoros, setPomodoros, inputTitle, setInputTitle, inputDescription, setInputDescription, error, setError, open, setOpen, loggedInUser, setLoggedInUser, cookies, workTime, breakTime, repeats, isActive, setIsActive, hasStarted, setHasStarted } = props;

  const handleAddTodo = async () => {
    if (inputTitle.trim() === '') {
      setError(true);
      return;
    }
    try {
      // create a new task in the database with the input title and description and default values
      const newTask = {
        title: inputTitle,
        description: inputDescription,
        status: 'pending',
        user_id: cookies.user_id
      };      
      const response = await axios.post('/tasks', newTask);
      // update the state with the new task
      setTodos([...todos, response.data['tasks'][0]])
      // todos.push(response.data['tasks'][0]);
      setInputTitle('');
      setInputDescription('');
      setError(false);
    } catch (error) {
      console.error(error);
    }

  };

  const handleToggleTodo = async (id) => {
    try {
      // find the task by id in the state
      const task = todos.find(todo => todo.id === id);
      // toggle its status between completed and pending
      task.status = task.status === 'completed' ? 'pending' : 'completed';
      // update the task in the database with the new status
      await axios.post(`/tasks/${id}/edit`, task);

      // add this line to update the state with the toggled task
      todos.splice(todos.indexOf(task), 1, task)
      setTodos([...todos]);
    } catch (error) {
      console.error(error);
    }
  };
  const handleStartTodo = async (id) => {
    try {
      // find the task by id in the state
      const task = todos.find(todo => todo.id === id);
      task.status = 'in progress';
      await axios.post(`/tasks/${id}/edit`, task);
      setTodos([...todos]);
      // const response = await axios.get(`/tasks/${id}/pomodoros`);
      // console.log(response.data);
      const pomodoro = {
        user_id: cookies.user_id,
        task_id: id
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
        setPomodoros({id: response.data['pomodoros'][0]['id'], user_id: cookies.user_id, task_id: id, complete: false});
        console.log({id: response.data['pomodoros'][0]['id']});
        if (!hasStarted) {
          setHasStarted(true);
        }
        setIsActive(!isActive);
      }
      createNewPomodoro();
    } catch (error) {
      console.error(error);
    }
  };

  const handleExpandTodo = (id) => {
    // toggle the open state of the todo with the given id
    setOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDeleteTodo = async (id) => {
    try {
      // delete the task by id in the database
      await axios.post(`/tasks/${id}/delete`);

      // remove the task by id from the state
      todos.splice(todos.findIndex(todo => todo.id === id), 1)
      setTodos([...todos]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='pomodoro-todo-list'>
      <Typography variant="h5">Todo List</Typography>
      <div className='add-todo'>
        <TextField style={{ width: '40vw' }}
          label='Add a new task title'
          variant='outlined'
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          error={error}
          helperText={error ? 'Task title cannot be empty' : ''}
          multiline
          rows={2}
        />
        <TextField style={{ width: '40vw' }}
          label='Add a new task description (optional)'
          variant='outlined'
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
          multiline
          rows={3}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={handleAddTodo}
        >
          Add Todo
        </Button>
      </div>
      <div className='todo-list'>
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id} >
              <div className='todo' style={{ backgroundColor: todo.status === 'in progress' ? 'orange' : 'transparent' }}>
                <div className='todo-superscript'>
                  <div className='todo-title'>
                    <Checkbox
                      checked={todo.status === 'completed'}
                      onChange={() => handleToggleTodo(todo.id)}
                    />
                    <ListItemText style={{ width: '15vw' }}
                      primary={todo.title}
                      className={todo.status === 'completed' ? 'completed' : ''}
                      onClick={() => handleExpandTodo(todo.id)}
                    />
                  </div>
                  <div className='todo-buttons'>
                    {todo.status === 'pending' && <Button
                      variant='outlined'
                      color='secondary'
                      onClick={() => handleStartTodo(todo.id)}
                    >
                      Do
                    </Button>}
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <Collapse in={open[todo.id]} timeout="auto" unmountOnExit>
                  <div className='todo-details'>
                    <p><strong>Status:</strong> {todo.status}</p>
                    <p><strong>Description:</strong> {todo.description || 'No description'}</p>
                  </div>

                </Collapse>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
    </div >
  );
}

export default TodoList;
