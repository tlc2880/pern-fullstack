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
import Box from '@mui/material/Box';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
import todoType from '../../types'

interface ToDoContainer extends Array<todoType> {}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const ListTodos = () => {
  const todo = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();
  const todos: todoType[] = [...todo.todos];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  
  // const handleDelete = (id: string) => {
  //   dispatch(deleteTodo(id));
  // };
  
  // const completeTodo = (todo: todoType) => {
  //   const newTodo = {...todo}
  //   newTodo.completed = true;
  //   dispatch(updateTodo(newTodo));
  //   window.location.reload();
  // }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - todos.length) : 0;

  const handleChangePage = (
    // @ts-ignore
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
            {/* <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>Completed</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
              ? todos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : todos
            ).sort((a, b) => +a.completed - +b.completed)
              .map((row: todoType) => (
                <TableRow key={row.todo_id}>
                  <TableCell
                    // style={
                    //   todo.completed ? { textDecoration: "line-through" } : {}
                    // }
                  >
                    {row.description}
                  </TableCell>
                  <TableCell>
                    {row.owner}
                  </TableCell>
                  <TableCell>
                    {row.priority}
                  </TableCell>
                  <TableCell>
                    {row.day}
                  </TableCell>  
                  <TableCell>
                    {row.morning? 'Morning, ': ''} 
                    {row.afternoon? 'Afternoon, ': ''} 
                    {row.evening? 'Evening': ''}
                  </TableCell>
                  {/* <TableCell>
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
                  </TableCell> */}
                </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
        </TableBody>
        <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[6, 12, 18, { label: 'All', value: -1 }]}
                colSpan={8}
                count={todos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
      </Table>
    </>
  );
};
export default ListTodos