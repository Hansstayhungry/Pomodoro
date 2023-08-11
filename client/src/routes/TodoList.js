// TodoList.js
import React, { useState } from 'react';
import { Button, TextField, List, ListItem, ListItemText, Checkbox, Collapse } from '@mui/material';
import axios from 'axios';
import '../styles/TodoList.scss';

const TodoList = ({ todos, setTodos }) => {
  const [pomodoros, setPomodoros] = useState([]);
  const [inputTitle, setInputTitle] = useState(''); // state for the title input
  const [inputDescription, setInputDescription] = useState(''); // state for the description input
  const [error, setError] = useState(false);
  const [open, setOpen] = useState({}); // state to keep track of which todo is expanded

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
        user_id: 1 // change this to match your user id
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
  const handleContinueTodo = async (id) => {
    try {
      // find the task by id in the state
      const task = todos.find(todo => todo.id === id);
      const response = await axios.get(`/tasks/${id}/pomodoros`);

      setPomodoros([response.data['pomodoros']]);
      console.log(response.data)
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
      <h2>Todo List</h2>
      <div className='add-todo'>
        <TextField style={{width: '40vw', position: 'relative'}}
          label='Add a new task title'
          variant='outlined'
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          error={error}
          helperText={error ? 'Task title cannot be empty' : ''}
          multiline
          rows={2}
        />
        <TextField style={{width: '40vw' }}
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
        <List style={{ position: 'relative'}}>
          {todos.map((todo) => (
            <ListItem key={todo.id}>
              <div className='todo'>
                <div className='todo-superscript'>
                  <div className='todo-title'>
                    <Checkbox 
                      checked={todo.status === 'completed'}
                      onChange={() => handleToggleTodo(todo.id)}
                    />
                    <ListItemText style={{width: '15vw'}}
                      primary={todo.title}
                      className={todo.status === 'completed' ? 'completed' : ''}
                      onClick={() => handleExpandTodo(todo.id)}
                    />
                  </div>
                  <div className='todo-delete'>
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={() => handleContinueTodo(todo.id)}
                    >
                      Continue
                    </Button>
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
