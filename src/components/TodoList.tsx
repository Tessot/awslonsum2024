import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

export default function TodoList() {
  const client = generateClient<Schema>();

  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Schema["Todo"][]>([]);

  async function listTodos() {
    const { data } = await client.models.Todo.list();
    setTodos(data);
  }

  async function handleComplete(todo: Schema["Todo"]) {
    await client.models.Todo.update({ id: todo.id, done: !todo.done });
    listTodos();
  }

  async function handleDelete(todoId: string) {
    await client.models.Todo.delete({ id: todoId });
    listTodos();
  }

  useEffect(() => {
    listTodos();
  }, []);

  return (
    <div>
      <h1>AWS Summit London To-do App</h1>

      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="What do you need to do?"
      />

      <button
        onClick={async () => {
          await client.models.Todo.create({
            content: inputValue,
            done: false,
            priority: 'medium'
          });
          setInputValue('');
        }}
      >
        Add task
      </button>

      <div style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {todos.map((todo, index) => (
          <div
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#000000',
              color: '#fff',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '4px',
              marginTop: index === 0 ? '20px' : 0, // Add margin-top for the first todo item
            }}
          >
            <span style={{ flex: 1, textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.content}
            </span>
            <button
              onClick={() => handleComplete(todo)}
              style={{
                backgroundColor: '#f0f0f0',
                border: 'none',
                padding: '5px 10px',
                marginLeft: '10px',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            >
              {todo.done ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              style={{
                backgroundColor: '#f0f0f0',
                border: 'none',
                padding: '5px 10px',
                marginLeft: '10px',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}