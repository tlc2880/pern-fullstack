import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = "http://localhost:5000";
const initialState = {
  todos: [],
  responseStatus: "",
  responseMessage: "",
};

export const ListTodos = createAsyncThunk("todos/ListTodos", async () => {
  try {
    const response = await axios.get(`${baseURL}/todos`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});

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
  },
});

export default todoSlice.reducer;