import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const ReceptionistDashboard = () => {
  const [patientsCount, setPatientsCount] = useState([]);
  const [queueCount, setQueueCount] = useState([]);
  const [appointmentCount, setAppointmentsCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsResp, queueResp, appointmentsResp] = await Promise.all([
          axios.get("http://localhost:3001/api/patients"),
          axios.get("http://localhost:3001/api/queue"),
          axios.get("http://localhost:3001/api/appointment"),
        ]);

        // Log entire responses for debugging
        console.log("Patients Response:", patientsResp);
        console.log("Queue Response:", queueResp);
        console.log("Queue Response:", appointmentsResp);

        // Check if the response data is an array and assign accordingly
        setPatientsCount(
          Array.isArray(patientsResp.data) ? patientsResp.data : []
        );
        setQueueCount(Array.isArray(queueResp.data) ? queueResp.data : []);
        setAppointmentsCount(Array.isArray(appointmentsResp.data) ? appointmentsResp.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 px-8">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2">
            <AiOutlineUser className="text-2xl" />
            Receptionist
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Idogbe Anne</span>
            <div
              onClick={logout}
              className="text-sm text-red-700 hover:underline"
            >
              Logout
            </div>
          </div>
        </header>

        {/* Stats Section */}

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="relative bg-white shadow-md rounded-lg overflow-hidden h-64 flex flex-row items-center justify-between p-3 col-span-2 md:col-span-3">
            <img
              src="https://img.freepik.com/free-photo/african-american-therapist-doctor-explaining-radiography-expertise-sick-woman-discussing-healthcare-treatment-medical-appointment-hospital-ward-patient-with-neck-cervical-collar_482257-33623.jpg?ga=GA1.1.1223372785.1726203975&semt=ais_hybrid"
              alt="Patients"
              className="w-2/3 h-full object-cover brightness-110"
            />
            <div className="w-1/3 pl-4">
              <h3 className="text-4xl font-bold text-blue-700 mb-2">Patients</h3>
              <span className="text-4xl font-bold text-blue-700">
                {patientsCount?.length}
              </span>
            </div>
          </div>

          <div className="relative bg-white shadow-md rounded-lg overflow-hidden h-64 flex flex-row items-center justify-between p-3 col-span-2 md:col-span-3">
            <img
              src="https://img.freepik.com/free-photo/portrait-young-mother-with-little-girl-sitting-hospital-reception-lobby-attend-medical-consultation-with-appointment-waiting-room-area-healthcare-clinic-checkup-examination_482257-47694.jpg?ga=GA1.1.1223372785.1726203975&semt=ais_hybrid"
              alt="Queue"
              className="w-2/3 h-full object-cover brightness-110"
            />
            <div className="w-1/3 pl-8">
              <h3 className="text-4xl font-bold text-blue-700 mb-2">Queue</h3>
              <span className="text-4xl font-bold text-blue-700">
                {queueCount?.length}
              </span>
            </div>
          </div>

          {/* Increase width for Appointments */}
          <div className="relative bg-white shadow-md rounded-lg overflow-hidden h-64 flex flex-row items-center justify-between p-3 col-span-2 md:col-span-3">
            <img
              src="https://img.freepik.com/free-photo/doctor-explaining-coronavirus-illustration-tablet-display-adult-little-child-medical-cabinet-man-talking-about-virus-spreading-animation-device-checkup-examination_482257-39188.jpg?ga=GA1.1.1223372785.1726203975&semt=ais_hybrid"
              alt="Appointments"
              className="w-2/3 h-full object-cover brightness-110"
            />
            <div className="w-1/3 pl-8">
              <h3 className="text-4xl font-bold text-blue-700 mb-2">Appointments</h3>
              <span className="text-4xl font-bold text-blue-700">
                {appointmentCount?.length}
              </span>
            </div>
          </div>
        </section>






        {/* Calendar Section */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Calendar</h3>
          <div className="flex justify-center items-center">
            <iframe
              src="https://calendar.google.com/calendar/embed?showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=1"
              title="Calendar"
              className="w-full h-96 border-none"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
