import React, { useEffect, useState, MouseEvent } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableRow,
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

type orderType = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T ) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(order: orderType, orderBy: Key): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index]  as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "Id"
  },
  { id: "description", numeric: false, disablePadding: true, label: "description" },
  { id: "owner", numeric: false, disablePadding: true, label: "Owner" },
  { id: "priority", numeric: false, disablePadding: true, label: "Priority" }
];

interface EnhancedTableProps {
  //numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  //onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: string;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
//    classes,
    order,
    orderBy,
    onRequestSort
  } = props;
  const createSortHandler = (property: any) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              //direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="right">Time</TableCell>
        <TableCell align="right">Edit</TableCell>
        <TableCell align="right">Delete</TableCell>
        <TableCell align="right">Completed</TableCell>
      </TableRow>
    </TableHead>
  );
}

const ListTodos = () => {
  const [todos, setTodos] = useState<ToDoContainer>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
              {/* <StyledTableCell align="right" onClick={handleNumberSort}>
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
              <StyledTableCell align="right">Priority</StyledTableCell> */}
            <EnhancedTableHead
              //classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={todos.length}
            />
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