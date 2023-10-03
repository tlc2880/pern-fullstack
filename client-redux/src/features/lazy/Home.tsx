import React from 'react';
import { Link } from "react-router-dom"
import InputDialog from "../todo/InputDialog";
import ListTodos  from "../todo/ListTodos";
import InputStepperDialog from "../todo/InputStepperDialog"

const Home = () => {
  return (
    <main>
      <div className="container">
        <InputDialog />
        <InputStepperDialog />
      </div>
      < ListTodos />
      <p>
        <Link to="/admin">Go to Admin</Link>
      </p>
    </main>
  )
}
export default Home