import React from 'react'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { UserProvider } from './context/AuthContext'
import DoctorLogin from "./pages/Login/DoctorLogin";
import DoctorRegister from "./pages/Register/DoctorRegister";
import DoctorDashboard from './pages/Dashboard/DoctorDashboard';
import SinglePatient from './pages/SinglePatient';

function App() {
  return(
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/DoctorLogin" element={<DoctorLogin />} />
          <Route path="/DoctorRegister" element={<DoctorRegister />} />
          <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
          <Route path="/patients/:patientId" element={<SinglePatient />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App;
