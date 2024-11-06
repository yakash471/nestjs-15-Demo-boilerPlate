// /lib/store.js

import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../lib/features/todo/todoSlice';

// Create the store
export const store = () => {
  return configureStore({
    reducer: {
      todos: todosReducer,
    },
  });
};

// Types for store state and dispatch
export const selectTodos = (state) => state.todos.todos;
