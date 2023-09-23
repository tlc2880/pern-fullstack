import React, { useState, useEffect  } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getTodos, deleteTodo, updateTodo } from "./todoSlice";
import EditTodo from "./EditTodo";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
// import TableSortLabel from "@mui/material/TableSortLabel";
import { useTheme, styled } from '@mui/material/styles';
import todoType from '../../types'

//interface ToDoContainer extends Array<todoType> {}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

// type orderType = "asc" | "desc";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ListTodos = () => {
  const todo = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();
  const todos: todoType[] = [...todo.todos];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
//  const [orderDirection, setOrderDirection] = useState<orderType>("asc");

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  
  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };
  
  const completeTodo = (todo: todoType) => {
    const newTodo = {...todo}
    newTodo.completed = true;
    dispatch(updateTodo(newTodo));
    window.location.reload();
  }

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
    <TableContainer component={Paper}>
    <Table sx={{ width: "100%" }}>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Owner</StyledTableCell>
            <StyledTableCell>Priority</StyledTableCell>
            <StyledTableCell>Day</StyledTableCell>
            <StyledTableCell>Time</StyledTableCell>
            <StyledTableCell>Edit</StyledTableCell>
            <StyledTableCell>Delete</StyledTableCell>
            <StyledTableCell>Completed</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
              ? todos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : todos
            ).map((todo) => {
              return (
                <StyledTableRow key={todo.todo_id}>
                  <StyledTableCell
                    style={
                      todo.completed ? { textDecoration: "line-through" } : {}
                    }
                  >
                    {todo.description}
                  </StyledTableCell>
                  <StyledTableCell>
                    {todo.owner}
                  </StyledTableCell>
                  <StyledTableCell>
                    {todo.priority}
                  </StyledTableCell>
                  <StyledTableCell>
                    {todo.day}
                  </StyledTableCell>  
                  <StyledTableCell>
                    {todo.morning? 'Morning, ': ''} 
                    {todo.afternoon? 'Afternoon, ': ''} 
                    {todo.evening? 'Evening': ''}
                  </StyledTableCell>
                  <StyledTableCell>
                    < EditTodo todo={todo} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      component="button"
                      onClick={() => handleDelete(todo.todo_id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                   <StyledTableCell>
                    <IconButton
                      component="button"
                      onClick={() => completeTodo(todo)}
                      disabled={todo.completed}
                      color="success"
                    >
                      <DoneIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={6} />
              </StyledTableRow>
            )}
        </TableBody>
        <TableFooter>
            <StyledTableRow>
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
            </StyledTableRow>
          </TableFooter>
      </Table>
      </TableContainer>
    </>
  );
};
export default ListTodos