import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DoctorRegister from "./pages/Register/DoctorRegister";
import DoctorDashboard from "./pages/Dashboard/DoctorDashboard/DoctorDashboard";
import AccountantDashboard from "./pages/Dashboard/AccountantDashboard/AccountantDashboard";
import SinglePatient from "./pages/SinglePatient";
import Layout from "./pages/Dashboard/ReceptionistDashboard/Layout";
import Patients from "./pages/Dashboard/ReceptionistDashboard/Patients";
import Queue from "./pages/Dashboard/ReceptionistDashboard/Queue";
import Appointment from "./pages/Dashboard/ReceptionistDashboard/Appointment";
import ReceptionistProfile from "./pages/Dashboard/ReceptionistDashboard/ReceptionistProfile";
import Login from "./pages/Login/Login";
import ReceptionistDashboard from "./pages/Dashboard/ReceptionistDashboard/AnneDashboard";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import PrivateRoute from "./route/PrivateRoute";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/DoctorRegister" element={<DoctorRegister />} />
        <Route
          path="patients/:patientId"
          element={<PrivateRoute Component={SinglePatient} />}
        />
        <Route
          path="/doctor"
          element={<PrivateRoute Component={DoctorDashboard} />}
        />
        <Route
          path="/accountant"
          element={<PrivateRoute Component={AccountantDashboard} />}
        />

        {/* Redirect root to /annedashboard */}
        {/* <Route path="/receptionist" element={<ReceptionistDashboard />} /> */}

        {/* Dashboard Layout with nested routes */}
        <Route
          path="/receptionist"
          element={<PrivateRoute Component={Layout} />}
        >
          <Route index element={<ReceptionistDashboard />} />{" "}
          {/* Default route */}
          <Route path="patients" element={<Patients />} />
          <Route path="queue-list" element={<Queue />} />
          <Route path="appointment-list" element={<Appointment />} />
          <Route
            path="receptionist-profile"
            element={<ReceptionistProfile />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
