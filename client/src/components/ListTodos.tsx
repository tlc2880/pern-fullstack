import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses }  from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableSortLabel from "@mui/material/TableSortLabel";
import { useTheme, styled } from '@mui/material/styles';
import EditTodo from "./EditTodo";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

import todoType from '../types'

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
  const [todos, setTodos] = useState<ToDoContainer>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch(
        `http://localhost:5000/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const completeTodo = async (id: string) => {
    try {
      const body = { completed: true };
      await fetch(
        `http://localhost:5000/todos/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      setTodos(
        todos.map((todo) => {
          return todo.todo_id === id ? { ...todo, completed: true } : todo;
        })
      );
      // window.location.href = "/";
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

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

  type orderType = "asc" | "desc";

  const [orderDirection, setOrderDirection] = useState<orderType>("asc");

  const sortAlphaArray = (arr: todoType[], orderBy: orderType) => {
    const sortedData = [...arr].sort((a, b) => {
      if (orderBy === 'asc') {
          return a.owner.localeCompare(b.owner);
      } else {
          return b.owner.localeCompare(a.owner);
      }
    });
    return sortedData;
  }

  const handleAlphaSort = () => {
    setTodos(sortAlphaArray(todos, orderDirection));
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  }

  const sortArray = (arr: todoType[], orderBy: orderType) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a: todoType, b: todoType) =>
          a.todo_id > b.todo_id ? 1 : b.todo_id > a.todo_id ? -1 : 0
        );
      case "desc":
        return arr.sort((a: todoType, b: todoType) =>
          a.todo_id < b.todo_id ? 1 : b.todo_id < a.todo_id ? -1 : 0
        );
    }
  };

  const handleSortRequest = () => {
    setTodos(sortArray(todos, orderDirection));
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="custom pagination table">
          <TableHead>
            <StyledTableRow>
            <StyledTableCell align="right" onClick={handleSortRequest}>
                <TableSortLabel active={true} direction={orderDirection}>
                  Id
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="right" onClick={handleAlphaSort}>
                <TableSortLabel active={true} direction={orderDirection}>
                  Owner
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell align="right">Priority</StyledTableCell>
              <StyledTableCell align="right">Day</StyledTableCell>
              <StyledTableCell align="right">Time</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
              <StyledTableCell align="right">Completed</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? todos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : todos
            ).sort((a, b) => +a.completed - +b.completed)
              .map((row: todoType) => (
                
              <StyledTableRow key={row.todo_id}>
                <StyledTableCell style={{ width: 75 }} align="right">
                  {row.todo_id}
                </StyledTableCell>
                <StyledTableCell 
                  style={
                    row.completed ? { textDecoration: "line-through", width: 450 } : { width: 450 }
                  }
                  component="th" 
                  scope="row"
                >
                  {row.description}
                </StyledTableCell>
                <StyledTableCell style={{ width: 250 }} align="right">
                  {row.owner}
                </StyledTableCell>
                <StyledTableCell style={{ width: 250 }} align="right">
                  {row.priority}
                </StyledTableCell>
                <StyledTableCell style={{ width: 250 }} align="right">
                  {row.day}
                </StyledTableCell>
                <StyledTableCell style={{ width: 350 }} align="right">
                  {row.morning? 'Morning, ': ''} 
                  {row.afternoon? 'Afternoon, ': ''} 
                  {row.evening? 'Evening': ''}
                </StyledTableCell>
                <StyledTableCell style={{ width: 100 }} align="right">
                    < EditTodo todo={row} />
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 100 }} align="right">
                    <IconButton
                      component="button"
                      onClick={() => deleteTodo(row.todo_id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                   <StyledTableCell  style={{ width: 100 }} align="right">
                    <IconButton
                      component="button"
                      onClick={() => completeTodo(row.todo_id)}
                      disabled={row.completed}
                      color="success"
                    >
                      <DoneIcon />
                    </IconButton>
                  </StyledTableCell>
              </StyledTableRow>
            ))}
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

export default ListTodos;