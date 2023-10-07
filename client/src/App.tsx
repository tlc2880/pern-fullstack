import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import InputDialog from "./components/todos/InputDialog";
import InputStepperDialog from "./components/todos/InputStepperDialog";
import ListTodos from "./components/todos/ListTodos";
import Container from "@mui/material/Container";
import SusApp from './components/suspense/SusApp';
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
			    <h1 className="input-header" >PERN using MUI, Styled Table, Stepper Inputs, & Webpack</h1>
          <div className="container">
            <InputDialog />
            <InputStepperDialog />
          </div>
          <ListTodos />
          <SusApp />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;