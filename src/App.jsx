import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/AuthContext";
import DoctorLogin from "./pages/Login/DoctorLogin";
import DoctorRegister from "./pages/Register/DoctorRegister";
import DoctorDashboard from "./pages/Dashboard/DoctorDashboard";
import SinglePatient from "./pages/SinglePatient";
import Layout from "./annedashboard/Layout";
import AnneDashboard from "./annedashboard/AnneDashboard";
import Patients from "./annedashboard/Patients";
import Queue from "./annedashboard/Queue";
import Appointment from "./annedashboard/Appointment";
import ReceptionistProfile from "./annedashboard/ReceptionistProfile";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/DoctorLogin" element={<DoctorLogin />} />
          <Route path="/DoctorRegister" element={<DoctorRegister />} />
          <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
          <Route path="/patients/:patientId" element={<SinglePatient />} />

          {/* Redirect root to /annedashboard */}
          <Route path="/" element={<Navigate to="/annedashboard" replace />} />

          {/* Dashboard Layout with nested routes */}
          <Route path="/annedashboard" element={<Layout />}>
            <Route index element={<AnneDashboard />} /> {/* Default route */}
            <Route path="patients" element={<Patients />} />
            <Route path="queue-list" element={<Queue />} />
            <Route path="appointment-list" element={<Appointment />} />
            <Route path="receptionist-profile" element={<ReceptionistProfile />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
