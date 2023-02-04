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
  FormGroup,
  Checkbox,
  Button,
  Box,
  Grid
} from '@mui/material';

interface todoType {
  todo_id: Number,
  description: string,
  owner: string,
  priority: string,
  completed: boolean
}

const InputTodo = () => {
  const initialValues = {
    todo_id: 0,
    description: "",
    owner: "",
    priority: "low",
    completed: false
  };

  const [ formValues, setFormValues ] = useState<todoType>(initialValues);
  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { description, owner, priority } = formValues
    try {
      const body = { description, owner, priority };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // window.location.href = "/";
      window.location.reload();
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
          <Button variant="contained" color="primary" type="submit" style={{
            backgroundColor: "green",
            margin: "5px"
          }}>
            Submit
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default InputTodo;
