import React, { useState } from "react";
import { updateTodo } from "./todoSlice";
import { useAppDispatch,  } from "../../app/hooks";
import { SelectChangeEvent } from '@mui/material/Select';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormGroup,
  Checkbox,
  Button,
  Box,
  Grid
} from '@mui/material';
import todoType from '../../types';

type EditTodoProps = {
  todo: todoType;
}

const EditTodo = ( {todo}: EditTodoProps ) => {
  const [description, setDescription] = useState(todo.description);
  const [owner, setOwner] = useState(todo.owner);
  const [priority, setPriority] = useState(todo.priority);
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState(todo.day);
  const [time, setTime] = useState({
    morning: todo.morning,
    afternoon: todo.afternoon,
    evening: todo.evening
  });
  const [ duration, setDuration ] = useState(todo.duration);

  const dispatch = useAppDispatch();

  const handleEdit = (todo: todoType) => {
    dispatch(updateTodo({
      ...todo,
      owner,
      description,
      day,
      priority,
      morning,
      afternoon,
      evening,
      duration
    }));
    window.location.reload();
  };

  const handleDayChange = (event: SelectChangeEvent) => {
    setDay(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime({ ...time, [event.target.name]: event.target.checked });
  };

  const { morning, afternoon, evening } = time;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
      <DialogContent>
      <form onSubmit={() => handleEdit(todo)}>
      <Grid container alignItems="center" direction="column">
        <TextField
          autoFocus
          margin="normal"
          label="Todo description"
          variant="outlined"
          sx={{ width: 400 }}
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="normal"
          label="Todo owner"
          variant="outlined"
          sx={{ width: 400 }}
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
                key="low"
                value="low"
                control={<Radio size="small" />}
                label="Low"
              />
              <FormControlLabel
                key="medium"
                value="medium"
                control={<Radio size="small" />}
                label="Medium"
              />
              <FormControlLabel
                key="high"
                value="high"
                control={<Radio size="small" />}
                label="High"
              />
            </RadioGroup>
          </FormControl>
          <br />
          <Box sx={{ minWidth: 120 }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Day</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={day}
                label="Day"
                onChange={handleDayChange}
              >
                <MenuItem key={"Monday"} value={"Monday"}>Monday</MenuItem>
                <MenuItem key={"Tuesday"} value={"Tuesday"}>Tuesday</MenuItem>
                <MenuItem key={"Wednesday"} value={"Wednesday"}>Wednesday</MenuItem>
                <MenuItem key={"Thursday"} value={"Thursday"}>Thursday</MenuItem>
                <MenuItem key={"Friday"} value={"Friday"}>Friday</MenuItem>
                <MenuItem key={"Saturday"} value={"Saturday"}>Saturday</MenuItem>
                <MenuItem key={"Sunday"} value={"Sunday"}>Sunday</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <br />
          <FormLabel>Time Range</FormLabel>
          <FormGroup>
            <FormControlLabel 
              control={
                <Checkbox 
                  name="morning"
                  onChange={handleCheckboxChange}
                  checked = {morning}
                />} 
              label="Morning" 
            />
            <FormControlLabel 
              control={
                <Checkbox 
                  name="afternoon" 
                  onChange={handleCheckboxChange}
                  checked={afternoon}
                />} 
              label="Afternoon" 
            />
            <FormControlLabel 
              control={
                <Checkbox 
                  name="evening"  
                  onChange={handleCheckboxChange}
                  checked={evening}
                />}
              label="Evening" 
            />
          </FormGroup>
          <TextField
            autoFocus
            margin="normal"
            label="Todo duration"
            variant="outlined"
            sx={{ width: 400 }}
            value={duration}
            onChange={(event) => {
              setDuration(event.target.value);
            }}
          />
        </Grid>
        </form >
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => handleEdit(todo)}
            variant="contained" 
            color="primary" 
            type="submit" 
            style={{
              backgroundColor: "green",
              margin: "5px"
            }}>
            Submit
          </Button>
          <Button 
            onClick={handleClose}
            variant="contained"
            color="error"
            style={{
              backgroundColor: "error",
              margin: "5px"
            }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditTodo;