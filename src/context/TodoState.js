import React, { useReducer } from 'react';
import TodoContext from './TodoContext';
import TodoReducer from './TodoReducer';
import {
  SET_TODO_TITLE,
  GET_TODOS,
  CREATE_TODO,
  DELETE_TODO,
  CLEAR_TODO_TITLE,
} from './TodoTypes';

const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    title: '',
    loading: true,
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState);

  const setTodoTitle = payload => {
    dispatch({ type: SET_TODO_TITLE, payload });
  };

  const getTodos = async () => {
    try {
      const todos = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=5'
      );
      const toJSON = await todos.json();

      dispatch({ type: GET_TODOS, payload: toJSON });
    } catch (err) {
      console.error(err.message);
    }
  };

  const createTodo = async title => {
    const newTodo = {
      title,
      completed: false,
    };

    try {
      const todo = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      const toJSON = await todo.json();

      dispatch({ type: CLEAR_TODO_TITLE });
      dispatch({ type: CREATE_TODO, payload: toJSON });
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async id => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: DELETE_TODO, payload: id });
    } catch (err) {
      console.error(err.message);
    }
  };

  const { todos, title, loading } = state;

  return (
    <TodoContext.Provider
      value={{
        todos,
        title,
        loading,
        getTodos,
        setTodoTitle,
        createTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoState;
