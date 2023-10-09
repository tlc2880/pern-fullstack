import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import InputDialog from './components/todos/InputDialog'
import InputStepperDialog from './components/todos/InputStepperDialog'
import ListTodos from './components/todos/ListTodos'
import Container from '@mui/material/Container'
import SusApp from './components/suspense/SusApp'
import IMAGE from './react.png'
import LOGO from './React.svg'
import './App.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const name = "Tommy"
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container maxWidth="xl">
          <h1>
            <img src={IMAGE} alt="React Logo" width="30" height="30" />
            PERN, MUI, Styled Table, & Webpack - {process.env.NODE_ENV}
            <img src={LOGO} alt="React Logo" width="30" />
          </h1>
          <div className="container">
            <InputDialog />
            <InputStepperDialog />
          </div>
          <ListTodos />
          <SusApp />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
