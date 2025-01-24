import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DoctorDashboard from "./pages/Dashboard/DoctorDashboard/DoctorDashboard";
import SinglePatient from "./pages/SinglePatient";
import Patients from "./pages/Dashboard/ReceptionistDashboard/Patients";
import Queue from "./pages/Dashboard/ReceptionistDashboard/Queue";
import Appointment from "./pages/Dashboard/ReceptionistDashboard/Appointment";
import ReceptionistProfile from "./pages/Dashboard/ReceptionistDashboard/ReceptionistProfile";
import Login from "./pages/Login/Login";
import ReceptionistDashboard from "./pages/Dashboard/ReceptionistDashboard/AnneDashboard";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import PrivateRoute from "./route/PrivateRoute";
import NurseDashboard from "./pages/Dashboard/NurseDashboard/NurseDashboard";
import Layout2 from "./pages/Dashboard/NurseDashboard/Layout2";
import Vitals from "./pages/Dashboard/NurseDashboard/Vitals";
import BedAllotment from "./pages/Dashboard/NurseDashboard/BedAllotment";
import AddBed from "./pages/Dashboard/NurseDashboard/AddBed";
import NurseProfile from "./pages/Dashboard/NurseDashboard/NurseProfile";
import Patients2 from "./pages/Dashboard/NurseDashboard/Patients2";
import Layout3 from "./pages/Dashboard/PharmacistDashboard/Layout3";
import PharmacistDashboard from "./pages/Dashboard/PharmacistDashboard/PharmacistDashboard";
import Medication from "./pages/Dashboard/PharmacistDashboard/Medication";
import Prescription from "./pages/Dashboard/PharmacistDashboard/Prescription";
import Inventory from "./pages/Dashboard/PharmacistDashboard/Inventory";
import PharmacistProfile from "./pages/Dashboard/PharmacistDashboard/PharmacistProfile";
import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";
import Employees from "./pages/Dashboard/Admin/Employees/Employees";
import AdminLogin from "./pages/Login/AdminLogin";
import { adminDashboardLinks } from "./layout/NavLinks";
import Departments from "./pages/Dashboard/Admin/Departments/Departments";
import AdminProfile from "./pages/Dashboard/Admin/Profile/AdminProfile.jsx";
import DashboardLayout from "./layout/Layout";
import Layout from "./pages/Dashboard/ReceptionistDashboard/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin_login" element={<AdminLogin />} />
        <Route
          path="/patients/:patientId"
          element={<PrivateRoute Component={SinglePatient} />}
        />
        <Route
          path="/doctor"
          element={<PrivateRoute Component={DoctorDashboard} />}
        />
        <Route
          path="/receptionist"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<ReceptionistDashboard />} />
          {/* Default route */}
          <Route path="patients" element={<Patients />} />
          <Route path="queue-list" element={<Queue />} />
          <Route path="appointment-list" element={<Appointment />} />
          <Route
            path="receptionist-profile"
            element={<ReceptionistProfile />}
          />
        </Route>
        <Route
          path="/nurse"
          element={
            <PrivateRoute>
              <Layout2 />
            </PrivateRoute>
          }
        >
          <Route index element={<NurseDashboard />} />
          <Route path="patients" element={<Patients2 />} />
          <Route path="vitals" element={<Vitals />} />
          <Route path="bed-allotment" element={<BedAllotment />} />
          <Route path="add-bed" element={<AddBed />} />
          <Route path="profile" element={<NurseProfile />} />
        </Route>
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <DashboardLayout nav={adminDashboardLinks} />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="employee" element={<Employees />} />
          <Route path="department" element={<Departments />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
        <Route
          path="/pharmacist"
          element={
            <PrivateRoute>
              <Layout3 />
            </PrivateRoute>
          }
        >
          <Route index element={<PharmacistDashboard />} />
          {/* Default route */}
          <Route path="patients" element={<Patients2 />} />
          <Route path="medication" element={<Medication />} />
          <Route path="prescription" element={<Prescription />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="profile" element={<PharmacistProfile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
