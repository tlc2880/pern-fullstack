import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import { createTodo } from "./todoSlice";
import { useAppDispatch } from "../../app/hooks";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  FormGroup,
  Checkbox,
  Button,
  Box,
  InputLabel,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { SelectChangeEvent } from '@mui/material/Select';
import todoType from '../../types'

const InputDialog = () => {
  const initialValues = {
    todo_id: "",
    description: "",
    owner: "",
    priority: "Low",
    day: "",
    morning: false,
    afternoon: false,
    evening: false,
    completed: false,
    duration: ''
  };

  const [ open, setOpen ] = useState(false);
  const [ formValues, setFormValues ] = useState<todoType>(initialValues);
  const [ descriptionError, setDescriptionError ] = useState(false);
  const [ ownerError, setOwnerError ] = useState(false);
  const [ durationError, setDurationError ] = useState(false);
  const [ dayError, setDayError ] = useState(false);
  const [ time, setTime ] = useState({
    morning: false,
    afternoon: false,
    evening: false
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setFormValues({
      ...formValues,
      // eslint-disable-next-line 
      ['day']: event.target.value,
    });
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime({ ...time, [event.target.name]: event.target.checked as boolean });
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.checked,
    });
  };

  const dispatch = useAppDispatch();

  const onSubmitForm = async (event: SyntheticEvent) => {
    event.preventDefault();
    setDescriptionError(false);
    setOwnerError(false);
    setDurationError(false);
    setDayError(false);

    if (formValues.description === '') {
      setDescriptionError(true);
    }
    if (formValues.owner === '') {
      setOwnerError(true);
    }
    if (formValues.duration === '') {
      setDurationError(true);
    }
    if (formValues.day === '') {
      setDayError(true);
    }

    if (
      formValues.description && 
      formValues.owner &&
      formValues.duration &&
      formValues.day
    ) {
        dispatch(createTodo(formValues));
        window.location.reload();
        setFormValues(initialValues)
      }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const { morning, afternoon, evening } = time;
  return (
    <>
      <Button 
        onClick={handleClickOpen}
        variant="contained" 
        color="primary" 
        style={{
          backgroundColor: "green",
          margin: "5px"
        }}>
        + New Todo
      </Button>
      <Dialog open={open} onClose={handleClose}>
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
      <DialogTitle>Input New Todo</DialogTitle>
      <DialogContent>
          
      <form 
        onSubmit={onSubmitForm}
        noValidate
      >
        <Grid container alignItems="center" direction="column" >
          <br />
          <TextField
            id="description"
            name="description"
            label="Enter description"
            type="text"
            required
            error={descriptionError}
            value={formValues.description}
            onChange={handleInputChange}
          />
       
          <TextField
            id="owner"
            name="owner"
            label="Enter owner"
            type="text"
            required
            error={ownerError}
            value={formValues.owner}
            onChange={handleInputChange}
          />
          <br />
          <FormControl>
            <FormLabel>Priority</FormLabel>
              <RadioGroup
                name="priority"
                value={formValues.priority}
                onChange={handleInputChange}
                row
              >
              <FormControlLabel
                key="High"
                value="High"
                control={<Radio size="small" />}
                label="High"
              />
              <FormControlLabel
                key="Medium"
                value="Medium"
                control={<Radio size="small" />}
                label="Medium"
              />
              <FormControlLabel
                key="Low"
                value="Low"
                control={<Radio size="small" />}
                label="Low"
              />
            </RadioGroup>
          </FormControl>

          <br />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth required>
              <InputLabel id="simple-select-label">Day</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={formValues.day}
                label="Day"
                error={dayError}
                onChange={handleChange}
                required
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
              id="duration"
              name="duration"
              label="Enter duration"
              type="text"
              required
              error={durationError}
              sx={{ width: 400 }}
              value={formValues.duration}
              onChange={handleInputChange}
            />
          </Grid>
        </form>
        </DialogContent>
        
        <DialogActions>
          <Grid alignItems="center" >
            <Button 
              onClick={onSubmitForm}
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
          </ Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default InputDialog;