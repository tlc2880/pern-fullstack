import { Routes, Route, useNavigate } from "react-router-dom"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./features/lazy/ErrorFallback";
import Container from "@mui/material/Container";
import Home from "./features/lazy/Home"
import Layout from "./features/lazy/Layout"
// import Admin from "./features/lazy/Admin"
import SkeletonAdmin from './features/lazy/skeletons/SkeletonAdmin'
import React, { lazy, Suspense } from "react"
import "./App.css";

const Admin = lazy(() => import('./features/lazy/Admin'))

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const navigate = useNavigate();

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container maxWidth="xl">
          {/* <h1 className="input-header" >PERN using Redux Toolkit, MUI, & Styled Table</h1> 
          < InputDialog />
          < ListTodos />*/}
            <Routes>
              <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="admin" element={
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => navigate('/')}
              >
                <Suspense fallback={<SkeletonAdmin />}>
                  <Admin />
                  </Suspense>
                  </ErrorBoundary>}
                />
              </Route>
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
