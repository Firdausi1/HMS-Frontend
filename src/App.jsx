import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./annedashboard/Layout";
import AnneDashboard from "./annedashboard/AnneDashboard";
import Patients from "./annedashboard/Patients";
import Queue from "./annedashboard/Queue";
import Appointment from "./annedashboard/Appointment";
import ReceptionistProfile from "./annedashboard/ReceptionistProfile";



function App() {
  return (
    <Router>
      <Routes>
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
  );
}

export default App;


