import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import InputDialog from "./features/todo/InputDialog";
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
        <Container maxWidth="md">
          <h1 className="input-header" >PERN using Redux Toolkit, MUI, & Styled Table</h1>
          < InputDialog />
          < ListTodos />
        </Container>
      </ThemeProvider>
    </>
  );
}
export default App;
