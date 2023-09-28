import React, { useState, ChangeEvent } from "react";
import { createTodo } from "./todoSlice";
import { useAppDispatch } from "../../app/hooks";import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormGroup,
  DialogTitle
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SelectChangeEvent } from '@mui/material/Select';
import todoType from '../../types'

export default function InputStepperDialog() {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [ day, setDay ] = useState("Monday");
  const [ time, setTime ] = useState({
    morning: false,
    afternoon: false,
    evening: false
  });

  const initialValues = {
    todo_id: "",
    description: "",
    owner: "",
    priority: "low",
    day: "Monday",
    morning: false,
    afternoon: false,
    evening: false,
    completed: false,
    duration: ""
  };

  const [ formValues, setFormValues ] = useState<todoType>(initialValues);

  const steps = ["Step 1", "Step 2", "Step 3"];
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(createTodo(formValues));
    window.location.reload();
  };

  
  const handleSelectChange = (event: SelectChangeEvent) => {
    setDay(event.target.value);
    setFormValues({
      ...formValues,
      // eslint-disable-next-line 
      ['day']: event.target.value,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime({ ...time, [event.target.name]: event.target.checked as boolean });
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.checked,
    });
  };

  const { morning, afternoon, evening } = time;

  return (
    <div>
      <Button 
        variant="outlined" 
        style={{
          backgroundColor: "blue",
          margin: "5px"
        }}
        onClick={handleClickOpen}
      >
        + New Stepper Todo
      </Button>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Stepper Todo Input</DialogTitle>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <DialogContent>
        <form onSubmit={onSubmitForm}>
          <Container maxWidth="md" sx={{ mt: 8 }}>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item xs={12}>
                {activeStep === 0 && (
                  <>
                    <Typography variant="h6">Step 1</Typography>
                    <br />
                    <TextField
                      autoFocus
                      id="description"
                      type="text"
                      margin="normal"
                      label="Todo description"
                      name="description"
                      value={formValues.description}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <TextField
                      id="owner"
                      label="Enter owner"
                      name="owner"
                      value={formValues.owner}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                  </>
                )}
                {activeStep === 1 && (
                  <>
                  <Grid alignItems="center" direction="column" >
                  <Typography variant="h6">Step 2</Typography>
                    <br />
                    <Box sx={{ minWidth: 400 }}>
                      <FormControl>
                        <FormLabel>Priority</FormLabel>
                          <RadioGroup
                            name="priority"
                            value={formValues.priority}
                            onChange={handleInputChange}
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
                      <FormControl sx={{ m: 1, minWidth: 400 }}>
                        <InputLabel id="demo-simple-select-label">
                          Day
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={day}
                          label="Day"
                          onChange={handleSelectChange}
                        >
                        <MenuItem key={"Monday"} value={"Monday"}>
                          Monday
                        </MenuItem>
                        <MenuItem key={"Tuesday"} value={"Tuesday"}>
                          Tuesday
                        </MenuItem>
                        <MenuItem key={"Wednesday"} value={"Wednesday"}>
                          Wednesday
                        </MenuItem>
                        <MenuItem key={"Thursday"} value={"Thursday"}>
                          Thursday
                        </MenuItem>
                        <MenuItem key={"Friday"} value={"Friday"}>
                          Friday
                        </MenuItem>
                        <MenuItem key={"Saturday"} value={"Saturday"}>
                          Saturday
                        </MenuItem>
                        <MenuItem key={"Sunday"} value={"Sunday"}>
                          Sunday
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  </Grid>
                </>
              )}
              {activeStep === 2 && (
                <>
                  <Typography variant="h6">Step 3</Typography>
                  <br />
                  <Grid alignItems="center" direction="column" >
                  <FormLabel>Time Range</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="morning"
                          onChange={handleCheckboxChange}
                          checked = {morning}
                        />
                      }
                      label="Morning"
                    />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="afternoon"
                            onChange={handleCheckboxChange}
                            checked={afternoon}
                          />
                        }
                        label="Afternoon"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="evening"
                            onChange={handleCheckboxChange}
                            checked={evening}
                          />
                        }
                        label="Evening"
                      />
                    <TextField
                      id="duration"
                      name="duration"
                      label="Enter duration"
                      type="text"
                      sx={{ width: 400 }}
                      value={formValues.duration}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  </Grid>
                 
                </>
              )}
              </Grid>
              <Grid item xs={12}>
                {activeStep > 0 && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleBack}
                    sx={{ marginRight: 8 }}
                  >
                    Back
                  </Button>
                )}
                {activeStep === steps.length - 1 ? (
                  <>
                    <Button 
                      variant="contained"
                      color="primary"
                      onClick={onSubmitForm}
                      style={{
                        backgroundColor: "green",
                        margin: "5px"
                      }}
                    >
                      Submit
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </Container>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}