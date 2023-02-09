import React, { useEffect  } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ListTodos, deleteTodo } from "./todoSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const TodoView = () => {
  const todo = useAppSelector((state) => state.todo);
  const todos = [...todo.todos]
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/tasks/${id}`);
  };

  useEffect(() => {
    dispatch(ListTodos());
  }, [dispatch]);
  
  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };
  
  return (
    <>
      <h1>PERN Todo using Redux Toolkit</h1>
        <Table sx={{ mt: 4 }}>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Day</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos
              .sort((a, b) => +a.completed - +b.completed)
              .map((todo) => {
                return (
                  <TableRow key={todo.todo_id}>
                    <TableCell
                      style={
                        todo.completed ? { textDecoration: "line-through" } : {}
                      }
                    >
                      {todo.description}
                    </TableCell>
                    <TableCell>
                      {todo.owner}
                    </TableCell>
                    <TableCell>
                      {todo.priority}
                    </TableCell>
                    <TableCell>
                      {todo.day}
                    </TableCell>  
                    <TableCell>
                      {todo.morning? 'Morning, ': ''} 
                      {todo.afternoon? 'Afternoon, ': ''} 
                      {todo.evening? 'Evening': ''}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        component="button"
                        onClick={() => handleDelete(todo.todo_id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </>
  );
};
export default TodoView