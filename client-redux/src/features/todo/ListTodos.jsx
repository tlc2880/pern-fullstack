import React, { useEffect  } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getTodos, deleteTodo, updateTodo } from "./todoSlice";
import EditTodo from "./EditTodo";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

const ListTodos = () => {
  const todo = useAppSelector((state) => state.todo);
  const todos = [...todo.todos]
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  
  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };
  
  const completeTodo = (todo) => {
    const newTodo = {...todo}
    newTodo.completed = true;
    console.log(newTodo);
    dispatch(updateTodo(newTodo));
    window.location.reload();
  }

  return (
    <>
      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Day</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Edit</TableCell>
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
                    < EditTodo todo={todo} />
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
                  <TableCell>
                    <IconButton
                      component="button"
                      onClick={() => completeTodo(todo)}
                      disabled={todo.completed}
                      color="success"
                    >
                      <DoneIcon />
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
export default ListTodos