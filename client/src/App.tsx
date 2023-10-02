import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import InputDialog from "./components/InputDialog";
import InputStepperDialog from "./components/InputStepperDialog";
import ListTodos from "./components/ListTodos";
import Container from "@mui/material/Container";
import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container maxWidth="xl">
			    <h1 className="input-header" >PERN using MUI, Styled Table, and Stepper Inputs</h1>
          <div className="container">
            <InputDialog />
            <InputStepperDialog />
          </div>
          <ListTodos />
        </Container>
      </ThemeProvider>
      
    </>
  );
}

export default App;
