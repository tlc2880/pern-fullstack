import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = "http://localhost:5000";
const initialState = {
  todos: [],
  responseStatus: "",
  responseMessage: "",
};

export const getTodo = async (id) =>
  await axios.get(`/todos/${id}`);

export const ListTodos = createAsyncThunk("todos/ListTodos", async () => {
  try {
    const response = await axios.get(`${baseURL}/todos`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/todos/${todoId}`);
      return todoId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/todos`, todo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [ListTodos.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [ListTodos.fulfilled]: (state, action) => {
      return {
        ...state,
        todos: action.payload,
        responseStatus: "success",
      };
    },
    [ListTodos.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    [deleteTodo.fulfilled]: (state, action) => {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.todo_id !== action.payload),
        responseStatus: "success",
        responseMessage: "Todo deleted successfully",
      };
    },
    [deleteTodo.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    [createTodo.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [createTodo.fulfilled]: (state, action) => {
      return {
        ...state,
        todos: [...state.todos, action.payload],
        responseStatus: "success",
        responseMessage: "Todo created successfully",
      };
    },
    [createTodo.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
  },
});

export default todoSlice.reducer;