import React, { Fragment, useState } from "react";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import todoType from '../types'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Select,
  FormGroup,
  Checkbox,
  Button,
  Box,
  Grid
} from '@mui/material';

type EditTodoProps = {
  todo: todoType;
}

const EditTodo = ( {todo} : EditTodoProps) => {
  const [description, setDescription] = useState(todo.description);
  const [owner, setOwner] = useState(todo.owner);
  const [priority, setPriority] = useState(todo.priority);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateDescription = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const body = { description, owner, priority };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      // window.location.href = "/";
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <IconButton
        component="button"
        onClick={handleClickOpen}
        disabled={todo.completed}
        color="warning"
      >
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        onClick={() => setDescription(todo.description)}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent sx={{ width: 800, maxWidth: "100%" }}>
          <TextField
            autoFocus
            margin="normal"
            label="Todo description"
            variant="outlined"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            fullWidth
          />
          <TextField
            autoFocus
            margin="normal"
            label="Todo owner"
            variant="outlined"
            value={owner}
            onChange={(event) => {
              setOwner(event.target.value);
            }}
          />
        
          <FormControl>
            <FormLabel>Priority</FormLabel>
              <RadioGroup
             
                value={priority}
                onChange={(event) => {
                  setPriority(event.target.value);
                }}
                row
              >
              <FormControlLabel
                key="high"
                value="high"
                control={<Radio size="small" />}
                label="High"
              />
              <FormControlLabel
                key="medium"
                value="medium"
                control={<Radio size="small" />}
                label="Medium"
              />
              <FormControlLabel
                key="low"
                value="low"
                control={<Radio size="small" />}
                label="Low"
              />
            </RadioGroup>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={(event) => updateDescription(event)}>Save</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EditTodo;