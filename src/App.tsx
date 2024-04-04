import './App.css'

import React from 'react';
import TaskList from './TaskList';
import TodoList from './components/TodoList';

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const App: React.FC = () => {
  return (
    <div className="container">
      <TaskList />
      <TodoList />
    </div>
  );
};

export default withAuthenticator(App);