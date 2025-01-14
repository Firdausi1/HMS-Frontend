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
}

export default App;
