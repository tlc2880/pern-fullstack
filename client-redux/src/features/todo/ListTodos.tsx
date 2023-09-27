import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getTodos, sortNumTodos, sortAlphaTodos } from "./todoSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import todoType from '../../types';
import Row from './Row';
import { StyledTableCell, StyledTableRow } from './StyledTable';
import TablePaginationActions  from './TablePaginationActions'

const ListTodos = () => {
  const todo = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const rows: todoType[] = [...todo.todos];

  type orderType = "asc" | "desc";

  const [orderDirection, setOrderDirection] = useState<orderType>("asc");

  const handleNumSort = () => {
    dispatch(sortNumTodos(orderDirection));
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  }

  const handleAlphaSort = () => {
    dispatch(sortAlphaTodos(orderDirection));
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  }

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    // @ts-ignore
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
            <StyledTableCell align="left" onClick={handleNumSort}>
                <TableSortLabel active={true} direction={orderDirection}>
                  Id
                </TableSortLabel>
                </StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="left" onClick={handleAlphaSort}>
                <TableSortLabel active={true} direction={orderDirection}>
                  Owner
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell align="left">Priority</StyledTableCell>
              <StyledTableCell align="right">Time</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
              <StyledTableCell>Completed</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
              ).map((row: todoType) => (
                  <Row key={row.todo_id} row={row} />
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
                count={rows.length}
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