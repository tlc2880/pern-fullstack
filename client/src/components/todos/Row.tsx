import React, { useState, Dispatch, SetStateAction } from 'react'
import EditTodo from './EditTodo'
import todoType, { ToDoContainer, todoCollapseType } from './types'
import {
  Box,
  Table,
  TableBody,
  TableHead,
  Typography,
  Collapse,
  IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { StyledTableCell, StyledTableRow } from './StyledTable'

export default function Row(props: {
  row: todoCollapseType
  setTodos: Dispatch<SetStateAction<ToDoContainer>>
  todos: todoType[]
}) {
  const { row, setTodos, todos } = props
  const [open, setOpen] = useState(false)

  const deleteTodo = async (rows: todoType[], id: string) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      })
      setTodos(rows.filter((todo: todoType) => todo.todo_id !== id))
    } catch (error: any) {
      console.error(error.message)
    }
  }

  const completeTodo = async (id: string) => {
    try {
      const body = { completed: true }
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      setTodos(
        todos.map((todo: todoType) => {
          return todo.todo_id === id ? { ...todo, completed: true } : todo
        })
      )
      // window.location.href = "/";
      window.location.reload()
    } catch (error: any) {
      console.error(error.message)
    }
  }

  return (
    <>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <StyledTableCell
          style={{ width: 50 }}
          align="right"
          component="th"
          scope="row"
        >
          {row.todo_id}
        </StyledTableCell>
        <StyledTableCell
          style={
            row.completed
              ? { textDecoration: 'line-through', width: 450 }
              : { width: 450 }
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
          <EditTodo todo={row} />
        </StyledTableCell>
        <StyledTableCell style={{ width: 100 }} align="right">
          <IconButton
            component="button"
            onClick={() => deleteTodo(todos, row.todo_id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </StyledTableCell>
        <StyledTableCell style={{ width: 100 }} align="right">
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

      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={3}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Time
              </Typography>
              <Table size="small" aria-label="time">
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
                    <StyledTableCell align="right" style={{ width: 250 }}>
                      {row.morning ? 'Morning, ' : ''}
                      {row.afternoon ? 'Afternoon, ' : ''}
                      {row.evening ? 'Evening' : ''}
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
