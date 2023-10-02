import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import {
  StepButton,
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Stepper,
  Step,
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
import todoType from '../types'

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
    duration: ""
  };

export default function InputStepperDialog() {
  const [ open, setOpen ] = useState(false);
  const [ activeStep, setActiveStep ] = useState(0);
  const [ descriptionError, setDescriptionError ] = useState(false);
  const [ ownerError, setOwnerError ] = useState(false);
  const [ dayError, setDayError ] = useState(false);
  const [ durationError, setDurationError ] = useState(false);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const [ time, setTime ] = useState({
    morning: false,
    afternoon: false,
    evening: false
  });

  const [ formValues, setFormValues ] = useState<todoType>(initialValues);
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7"];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const onSubmitForm = async (event: SyntheticEvent) => {
    event.preventDefault();
    const { description, owner, priority, day, morning, afternoon, evening, duration } = formValues;
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
      try {
        const body = { description, owner, priority, day, morning, afternoon, evening, duration };
        await fetch("http://localhost:5000/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        // window.location.href = "/";
        window.location.reload();
        } catch (error: any) {
        console.error(error.message);
      }
      setFormValues(initialValues);
      handleClose();
    };
  }
  
  const handleSelectChange = (event: SelectChangeEvent) => {
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
        <DialogTitle>New Nonlinear Stepper Todo Input</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              {allStepsCompleted() ? (
                <>
                  <Typography sx={{ mt: 1, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </>
              ) : (
                <>
                  <Container maxWidth="md" sx={{ mt: 8 }}>
                    <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                      {activeStep === 0 && (
                        <>
                          <Typography variant="h6">Step 1</Typography>
                          <br />
                          <TextField
                            autoFocus
                            id="description"
                            type="text"
                            label="Todo description"
                            name="description"
                            value={formValues.description}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                            error={descriptionError}
                          />
                        </>
                      )}

                      {activeStep === 1 && (
                        <>
                          <Typography variant="h6">Step 2</Typography>
                          <br />
                          <TextField
                            id="owner"
                            type="text"
                            label="Enter owner"
                            name="owner"
                            value={formValues.owner}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                            error={ownerError}
                          />
                        </>
                      )}

                      {activeStep === 2 && (
                        <>
                          <Typography variant="h6">Step 3</Typography>
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
                                  key="Low"
                                  value="Low"
                                  control={<Radio size="small" />}
                                  label="Low"
                                />
                                <FormControlLabel
                                  key="Medium"
                                  value="Medium"
                                  control={<Radio size="small" />}
                                  label="Medium"
                                />
                                <FormControlLabel
                                  key="High"
                                  value="High"
                                  control={<Radio size="small" />}
                                  label="High"
                                />
                              </RadioGroup>
                            </FormControl>
                          </Box>
                        </>
                      )}

                      {activeStep === 3 && (
                        <>
                          <Typography variant="h6">Step 4</Typography>
                          <br />
                          <Box sx={{ minWidth: 400 }}>
                            <FormControl required sx={{ m: 1, minWidth: 400 }}>
                              <InputLabel id="select-label">
                                Day
                              </InputLabel>
                              <Select
                                labelId="select-label"
                                id="select"
                                value={formValues.day}
                                label="Day"
                                onChange={handleSelectChange}
                                required
                                error={dayError}
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
                        </>
                      )}

                      {activeStep === 4 && (
                        <>
                          <Typography variant="h6">Step 5</Typography>
                          <br />
                          <Box sx={{ minWidth: 400 }}>
                            <FormControl sx={{ m: 1, minWidth: 400 }}>
                              <FormLabel>Time Range</FormLabel>
                              <FormGroup >
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
                            </FormGroup>
                          </FormControl>
                        </Box>
                      </>
                    )}

                    {activeStep === 5 && (
                      <>
                        <Typography variant="h6">Step 6</Typography>
                        <br />
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
                      </>
                    )}

                    {activeStep === 6 && (
                      <>
                        <Grid container alignItems="left" direction="column" spacing={1} >
                          <Typography variant="h6">Step 7</Typography>
                          <Typography variant="h6">Preview</Typography>
                          <br/>
                          <Typography variant="subtitle1" sx={{ display: 'inline-block' }}>
                            Description: {formValues.description}
                          </Typography>
                          <Typography variant="subtitle1" sx={{ display: 'inline-block' }}>
                            Owner: {formValues.owner}
                          </Typography>
                          <Typography variant="subtitle1" sx={{ display: 'inline-block' }}>
                            Priority: {formValues.priority}
                          </Typography> 
                          <Typography variant="subtitle1" sx={{ display: 'inline-block' }}>
                            Day: {formValues.day}
                          </Typography> 
                          <Typography variant="subtitle1" sx={{ display: 'inline-block' }}>
                            Time Range: {formValues.morning? 'Morning, ': ''} 
                              {formValues.afternoon? 'Afternoon, ': ''} 
                              {formValues.evening? 'Evening': ''}
                          </Typography>       
                          <Typography variant="subtitle1" sx={{ display: 'inline-block' }}>
                            Duration: {formValues.duration}
                          </Typography> 
                        </Grid>
                      </>
                    )}
                    </Typography>
                    {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}> */}
                      <Button
                        variant="contained"
                        color="secondary"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
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
                            sx={{ mr: 1 }}
                            onClick={handleNext}
                          >
                            Next
                          </Button>
                        </>
                      )}
                    {/* </Box> */}
                  </Container>
                </>
              )}
            </div>
          </Box>
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