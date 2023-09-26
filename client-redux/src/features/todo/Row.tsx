import React, { useState}  from "react";
import { useAppDispatch } from "../../app/hooks";
import { deleteTodo, updateTodo } from "./todoSlice";
import EditTodo from "./EditTodo";
import todoType from '../../types'
import {
    Box,
    Table,
    TableBody,
    TableHead,
    Typography,
    Collapse,
  } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledTableCell, StyledTableRow } from './StyledTable';

function createData(
    todo_id: string,
    description: string,
    owner: string,
    priority: string,
    day: string | undefined,
    morning: boolean,
    afternoon: boolean,
    evening: boolean,
    duration: string,
    completed: boolean
    ) {
      return {
        todo_id,
        description,
        owner,
        priority,
        day,
        morning,
        afternoon,
        evening,
        duration,
        completed
    };
}
  
export default function Row(props: { 
    row: ReturnType<typeof createData>
  }) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
  
    const handleDelete = (id: string) => {
      dispatch(deleteTodo(id));
    };
    
    const completeTodo = (todo: todoType) => {
      const newTodo = {...todo}
      newTodo.completed = true;
      dispatch(updateTodo(newTodo));
      window.location.reload();
    }

    return (
        <>
          <StyledTableRow key={row.todo_id} sx={{ "& > *": { borderBottom: "unset" } }}>
            <StyledTableCell component="th" scope="row">
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
  
            <StyledTableCell align="right" style={{ width: 225 }}>{row.owner}</StyledTableCell>
            <StyledTableCell align="right" style={{ width: 225 }}>{row.priority}</StyledTableCell>
            <StyledTableCell align="right" style={{ width: 75 }}>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </StyledTableCell>
  
            <StyledTableCell style={{ width: 100 }} align="right">
                < EditTodo todo={row} />
            </StyledTableCell>
            <StyledTableCell style={{ width: 100 }} align="right">
            <IconButton
                component="button"
                onClick={() => handleDelete(row.todo_id)}
                color="error"
            >
                <DeleteIcon />
            </IconButton>
            </StyledTableCell>
            <StyledTableCell  style={{ width: 100 }} align="right">
            <IconButton
                component="button"
                onClick={() => completeTodo(row)}
                disabled={row.completed}
                color="success"
            >
                <DoneIcon />
            </IconButton>
            </StyledTableCell>
  
          </StyledTableRow>
  
          <StyledTableRow>
            <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Time
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell>Day</StyledTableCell>
                        <StyledTableCell align="right">Time Range</StyledTableCell>
                        <StyledTableCell align="right">Duration</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          {row.day}
                        </StyledTableCell>
                        <StyledTableCell align="right" style={{ width: 300 }}>                  
                          {row.morning? 'Morning, ': ''} 
                          {row.afternoon? 'Afternoon, ': ''} 
                          {row.evening? 'Evening': ''}
                        </StyledTableCell>
                        <StyledTableCell align="right" style={{ width: 200 }}>                  
                          {row.duration} 
                      </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </StyledTableCell>
          </StyledTableRow>
      </>
    )
  }