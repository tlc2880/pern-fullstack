import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  FormGroup,
  Checkbox,
  Button,
  Box,
  InputLabel
} from '@mui/material';
import { Grid } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import { createTodo, updateTodo } from "./todoSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getTodo } from "../api";

function InputTodo() {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { responseStatus, responseMessage } = useSelector(
    (state) => state.todos
  );

  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (params.id) {
      dispatch(
        updateTodo({
          _id: params.id,
          title: todo.title,
          description: todo.description,
        })
      );
    } else {
      dispatch(createTodo(todo));
    }

    return navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      console.log(params.id);
      const loadTodo = async () => {
        try {
          const response = await getTodo(params.id);
          setTodo(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      loadTodo();
    }
  }, [params.id]);

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-sm mx-auto">
      {/* {responseStatus === "success" && <Navigate to="/" />}
      {responseStatus === "rejected" && <p>{responseMessage}</p>} */}
      <form onSubmit={handleSubmit} className="bg-zinc-800 p-10">
        <label htmlFor="title" className="block text-sm font-medium py-1">
          Title
        </label>
        <input
          type="text"
          placeholder="Todo name"
          name="title"
          onChange={handleChange}
          className="p-2 w-full text-white bg-zinc-700 placeholder:text-neutral-400 rounded-md"
          autoFocus
          value={todo.title}
        />

        <label htmlFor="description" className="block text-sm font-medium py-1">
          Description:
        </label>
        <textarea
          name="description"
          rows="3"
          placeholder="Write a Description"
          onChange={handleChange}
          className="p-2 w-full text-white bg-zinc-700 placeholder:text-neutral-400 rounded-md"
          value={todo.description}
        ></textarea>

        <button className="block bg-indigo-500 px-2 py-1 w-full">Save</button>
      </form>
    </div>
  );
}
export default InputTodo;
