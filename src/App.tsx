import './App.css'

import React from 'react';
import TaskList from './TaskList';

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>AWS Summit London To-do App</h1>
      <TaskList />
    </div>
  );
};

export default App;