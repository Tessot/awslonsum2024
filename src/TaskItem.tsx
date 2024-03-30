import React from 'react';
import './TaskItem.css'

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  deleteTask: (id: number) => void;
  toggleTaskCompleted: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  deleteTask,
  toggleTaskCompleted,
}) => {
  const handleDeleteTask = () => {
    deleteTask(task.id);
  };

  const handleToggleTaskCompleted = () => {
    toggleTaskCompleted(task.id);
  };

  return (
    <li className={`task ${task.completed ? 'completed' : ''}`}>
      <div className="task-text" onClick={handleToggleTaskCompleted}>
        {task.text}
      </div>
      <div className="task-actions">
        <button onClick={handleToggleTaskCompleted}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={handleDeleteTask}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;