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
//////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react"
// import Header from "./components/suspense/Header"
// import PostsList from "./components/suspense/PostsList"
///////////////////////////////////////////////////////////////////
// import { useState, Suspense } from "react";
// import Header from "./components/suspense/Header";
// import PostsList from "./components/suspense/PostsList";
// import SkeletonPost from "./components/suspense/skeletons/SkeletonPost";
// import { ErrorBoundary } from "react-error-boundary";
// import ErrorFallback from "./components/suspense/ErrorFallback";

// function App() {
//   const [currentUserId, setCurrentUserId] = useState(0)
//   const content = currentUserId === 0
//     ? <h2 className="message">Select an Employee to view posts</h2>
//     : (
//       <ErrorBoundary
//         FallbackComponent={ErrorFallback}
//         onReset={() => setCurrentUserId(0)}
//         resetKeys={[currentUserId]}
//       >
//         <Suspense fallback={[...Array(10).keys()].map(i => <SkeletonPost key={i} />)}>
//           <PostsList currentUserId={currentUserId} />
//         </Suspense>
//       </ErrorBoundary>
//     )
//   return (
//     <>
//       <Header
//         currentUserId={currentUserId}
//         setCurrentUserId={setCurrentUserId}
//       />
//       {content}
//     </>
//   )
// }
// export default App;