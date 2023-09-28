import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import InputDialog from "./features/todo/InputDialog";
import InputStepperDialog from "./features/todo/InputStepperDialog";
import Container from "@mui/material/Container";
import ListTodos  from "./features/todo/ListTodos";
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
          <h1 className="input-header" >PERN using Redux Toolkit with Async Thunk, MUI, & Styled Table</h1>
          <div className="container">
            <InputDialog />
            <InputStepperDialog />
          </div>
          < ListTodos />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
