import './App.scss';

import { useState } from 'react';

import Timer from './routes/Timer';
import Todo from './routes/Todo';
import Header from './components/Header';

function App() {

  const [todos, setTodos] = useState([])

  return (
    <div className='App'>
      <Header
      />

      <Timer
      />

      <Todo todos={todos}
      />
    </div>

  );
}

export default App;
