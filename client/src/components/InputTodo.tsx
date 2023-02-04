import React, { useState } from "react";
//import Typography from "@mui/material/Typography";
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
  InputLabel
} from '@mui/material';
import { Grid } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import todoType from '../types'

const InputTodo = () => {
  const initialValues = {
    todo_id: "",
    description: "",
    owner: "",
    priority: "low",
    day: "Monday",
    completed: false
  };

  const [ formValues, setFormValues ] = useState<todoType>(initialValues);
  const [day, setDay] = React.useState("Monday");
  const handleChange = (event: SelectChangeEvent) => {
    setDay(event.target.value);
    setFormValues({
      ...formValues,
      ['day']: event.target.value,
    });
  };
  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { description, owner, priority, day } = formValues;
    try {
      const body = { description, owner, priority, day };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // window.location.href = "/";
      window.location.reload();
      console.log('body:', body);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <h1>PERN using React material ui form</h1>
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
