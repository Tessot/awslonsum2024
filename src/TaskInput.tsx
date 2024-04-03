import React, { useState } from 'react';
import './TaskInput.css'

interface TaskInputProps {
  addTask: (text: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ addTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  const handleAddTask = () => {
    if (taskText.trim()) {
      addTask(taskText.trim());
      setTaskText('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={taskText}
        onChange={handleInputChange}
        placeholder="What do you need to do?"
      />
      <button onClick={handleAddTask}>Add task</button>
    </div>
  );
};

export default TaskInput;