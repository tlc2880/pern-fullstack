import React, { Fragment } from "react";
import CssBaseline from "@mui/material/CssBaseline";
// import InputTodo from "./components/InputTodo";
// import ListTodos from "./components/ListTodos";
import Container from "@mui/material/Container";
import  ListTodos  from "./features/todo/ListTodos";
import "./App.css";

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <h1 className="input-header" >PERN Todo using Redux Toolkit</h1>
        < ListTodos />
      </Container>
    </Fragment>
  );
}

export default App;
