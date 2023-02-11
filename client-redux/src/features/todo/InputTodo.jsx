import React, { useState } from "react";
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
  Grid
} from '@mui/material';

const InputTodo = () => {
  const initialValues = {
    todo_id: "",
    description: "",
    owner: "",
    priority: "low",
    day: "Monday",
    morning: true,
    afternoon: false,
    evening: false,
    completed: false
  };

  const [ formValues, setFormValues ] = useState(initialValues);
  const [ day, setDay ] = useState("Monday");
  const [ time, setTime ] = useState({
    morning: true,
    afternoon: false,
    evening: false
  })

  const handleChange = (event) => {
    setDay(event.target.value);
    setFormValues({
      ...formValues,
      // eslint-disable-next-line 
      ['day']: event.target.value,
    });
  };

  const handleCheckboxChange = (event) => {
    setTime({ ...time, [event.target.name]: event.target.checked });
    console.log('time: ', time);
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.checked,
    });
    console.log('formValues: ', formValues);
  };

  const dispatch = useAppDispatch();

  const onSubmitForm = async (event) => {
    event.preventDefault();
    dispatch(createTodo(formValues));
    window.location.reload();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const { morning, afternoon, evening } = time;
  return (
    <>
      <form onSubmit={onSubmitForm}>
      <Grid container alignItems="center" direction="column" >
        <Grid item>
          <TextField
            id="description"
            name="description"
            label="Enter description"
            type="text"
            value={formValues.description}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="owner"
            name="owner"
            label="Enter owner"
            type="text"
            value={formValues.owner}
            onChange={handleInputChange}
          />
        </Grid>
      

        <Grid item>
          <FormControl>
            <FormLabel>Priority</FormLabel>
              <RadioGroup
                name="priority"
                value={formValues.priority}
                onChange={handleInputChange}
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
        </Grid>

        <Grid item>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Day</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={day}
                label="Day"
                onChange={handleChange}
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
        </Grid>

        <Grid item>
          <FormLabel>Time</FormLabel>
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
        </Grid>

        <Grid item>
          <Button variant="contained" color="primary" type="submit" style={{
            backgroundColor: "green",
            margin: "5px"
          }}>
            Submit
          </Button>
        </Grid> 
        </Grid>
      </form>
    </>
  );
};

export default InputTodo;
