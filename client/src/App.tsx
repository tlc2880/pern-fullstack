import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import Container from "@mui/material/Container";

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
          <InputTodo />
          <ListTodos />
        </Container>
      </ThemeProvider>
      
    </>
  );
}

export default App;
