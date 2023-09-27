import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import todoType from '../../types'

const baseURL = "http://localhost:5000";

const initialState = {
  todos: [],
  responseStatus: "",
  responseMessage: "",
};

export const getTodo = async (id: number) =>
  await axios.get(`/todos/${id}`);

export const getTodos: any = createAsyncThunk("todos/getTodos", async () => {
  try {
    const response = await axios.get(`${baseURL}/todos`);
    return response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
});

export const deleteTodo: any = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/todos/${todoId}`);
      return todoId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createTodo: any = createAsyncThunk(
  "todos/createTodo",
  async (todo: todoType, { rejectWithValue }) => {
    try {
      const response = await axios.post( `${baseURL}/todos`, todo );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateTodo: any = createAsyncThunk(
  "todos/updateTodo",
  async (todo: todoType, { rejectWithValue }) => {
    try {
      const response = await axios.put( `${baseURL}/todos/${todo.todo_id}`, todo );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    sortAlphaTodos: (state, action: PayloadAction<string>) => {
      const sortData = [...state.todos];
      sortData.sort((a: todoType, b: todoType) => {
          if (action.payload === 'asc') {
          return a.owner.localeCompare(b.owner);
        } else {
          return b.owner.localeCompare(a.owner);
        }
      });
      state.todos = [...sortData];
    },

    sortNumTodos: (state, action: PayloadAction<string>) => {
      let sortData = [...state.todos];
      switch (action.payload) {
        case "asc":
        default:
          sortData.sort((a: todoType, b: todoType) =>
            a.todo_id > b.todo_id ? 1 : b.todo_id > a.todo_id ? -1 : 0
          );
          break;
        case "desc":
          sortData.sort((a: todoType, b: todoType) =>
            a.todo_id < b.todo_id ? 1 : b.todo_id < a.todo_id ? -1 : 0
          );
      }
      state.todos = [...sortData];
    }
  },

  extraReducers: {
    [getTodos.pending]: (state) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getTodos.fulfilled]: (state, action) => {
      return {
        ...state,
        todos: action.payload,
        responseStatus: "success",
      };
    },
    [getTodos.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    [deleteTodo.fulfilled]: (state, action) => {
      return {
        ...state,
        todos: state.todos.filter((todo: todoType) => todo.todo_id !== action.payload),
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
    [updateTodo.pending]: (state) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [updateTodo.fulfilled]: (state, action) => {
      return {
        ...state,
        todos: state.todos.map((todo: todoType) =>
          todo.todo_id === action.payload.todo_id ? action.payload : todo
        ),
        responseStatus: "success",
        responseMessage: "Todo updated successfully",
      };
    },
    [updateTodo.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    [createTodo.pending]: (state) => {
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
export const { sortNumTodos, sortAlphaTodos } = todoSlice.actions;