import React, { useEffect, useState } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableFooter,
  TablePagination,
  Paper,
  TableSortLabel
} from "@mui/material";
import todoType, { ToDoContainer } from '../types'
import TablePaginationActions from './TablePaginationActions';
import Row from './Row';
import { StyledTableCell, StyledTableRow } from './StyledTable';

const ListTodos = () => {
  const [todos, setTodos] = useState<ToDoContainer>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error: any) {
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

  const sortNumberArray = (arr: todoType[], orderBy: orderType) => {
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

  const handleNumberSort = () => {
    setTodos(sortNumberArray(todos, orderDirection));
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="custom pagination table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="right" onClick={handleNumberSort}>
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
          ).map((row: todoType) => (
            <Row key={row.todo_id} row={row} setTodos={setTodos} todos={todos}/>
          ))}
          {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={4} />
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
  );
};

export default ListTodos;