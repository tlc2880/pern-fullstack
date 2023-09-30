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
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormGroup,
  DialogTitle,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SelectChangeEvent } from '@mui/material/Select';
import todoType from '../../types'

export default function InputStepperDialog() {
  const [ open, setOpen ] = useState(false);
  const [ descriptionError, setDescriptionError ] = useState(false);
  const [ durationError, setDurationError ] = useState(false);
  const [ activeStep, setActiveStep ] = useState(0);
  const [ day, setDay ] = useState("");
  const [ time, setTime ] = useState({
    morning: false,
    afternoon: false,
    evening: false
  });

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

  const [ formValues, setFormValues ] = useState<todoType>(initialValues);

  const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7"];
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
    setDescriptionError(false);
    setDurationError(false);

    if (formValues.description === '') {
      setDescriptionError(true);
    }
    if (formValues.duration === '') {
      setDurationError(true);
    }
    if (
      formValues.description &&
      formValues.duration
    ) {
        dispatch(createTodo(formValues));
        window.location.reload();
        setFormValues(initialValues)
      }
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
        + New Todo Stepper
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
        <DialogTitle>New Todo Stepper Input</DialogTitle>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <DialogContent >
        <form noValidate onSubmit={onSubmitForm}>
        <Grid container alignItems="center" direction="column" spacing={1}  >
          <Container maxWidth="md" >
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
                  required
                  error={descriptionError}
                  
                />
                <br />
                <br />
              </>
            )}

            {activeStep === 1 && (
              <>
                <Typography variant="h6">Step 2</Typography>
                <br />
                <TextField
                  id="owner"
                  label="Enter owner"
                  name="owner"
                  value={formValues.owner}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <br />
                <br />
              </>
            )}

            {activeStep === 2 && (
              <>
                <Typography variant="h6">Step 3</Typography>
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
                <br />
                <br />
              </>
            )}

            {activeStep === 3 && (
              <>
                <Typography variant="h6">Step 4</Typography>
                  <br />
                  <FormControl sx={{ m: 1, minWidth: 400 }}>
                    <InputLabel id="simple-select-label">
                      Day
                    </InputLabel>
                    <Select
                      labelId="simple-select-label"
                      id="simple-select"
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
                <br />
                <br />
              </>
            )}

            {activeStep === 4 && (
              <>
                <Typography variant="h6">Step 5</Typography>
                <br />
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
                <br />
              </>
            )}

            {activeStep === 5 && (
              <>
                <Typography variant="h6">Step 6</Typography>
                <br/>
                  <TextField
                    id="duration"
                    name="duration"
                    label="Enter duration"
                    type="text"
                    sx={{ width: 400 }}
                    required
                    error={durationError}
                    value={formValues.duration}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <br />
                  <br />
              </>
            )}

            {activeStep === 6 && (
              <>
                <br/>
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
                  <br/>
                </Grid>
              </>
            )}

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
          </Container>
          </Grid>
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