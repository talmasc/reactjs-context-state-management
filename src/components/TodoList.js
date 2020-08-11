import React, { useEffect, useContext } from 'react';
import TodoContext from '../context/TodoContext';

const TodoList = () => {
  const { getTodos, todos, loading, deleteTodo } = useContext(TodoContext);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      {!loading &&
        todos &&
        todos.map(todo => (
          <div className='flex flex-row justify-between items-center todo-item'>
            <p>{todo.title}</p>
            <span className='remove-todo' onClick={() => deleteTodo(todo.id)}>
              &times;
            </span>
          </div>
        ))}
    </>
  );
};

export default TodoList;
