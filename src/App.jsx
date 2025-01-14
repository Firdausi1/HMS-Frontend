<<<<<<< HEAD
import React from 'react'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DoctorLogin from "../src/pages/Login/DoctorLogin";

function App() {
  return(
  
      <Router>
        <Routes>
          <Route path="/DoctorLogin" element={<DoctorLogin />} />
        </Routes>
      </Router>
  )
=======
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <h1 className="text-3xl font-bold underline text-center">Hello world!</h1>
  );
>>>>>>> 2c657c55ad92670eed0d48b8ee2cde8b0084ad67
}

export default App;
