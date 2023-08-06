// import './App.css';
import { useState } from 'react';
import Timer from './routes/Timer';
import Todo from './routes/Todo';

function App() {

  const [todos, setTodos] = useState([])

  return (
    <div>
      <Timer
      />

      <Todo todos={todos}
      />
    </div>

  );
}

export default App;
