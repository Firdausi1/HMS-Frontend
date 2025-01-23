import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const ReceptionistDashboard = () => {
  const [patientsCount, setPatientsCount] = useState([]);
  const [queueCount, setQueueCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsResp, queueResp] = await Promise.all([
          axios.get("http://localhost:3001/api/patients"),
          axios.get("http://localhost:3001/api/queue"),
        ]);

        // Log entire responses for debugging
        console.log("Patients Response:", patientsResp);
        console.log("Queue Response:", queueResp);

        // Check if the response data is an array and assign accordingly
        setPatientsCount(
          Array.isArray(patientsResp.data) ? patientsResp.data : []
        );
        setQueueCount(Array.isArray(queueResp.data) ? queueResp.data : []);
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
              className="text-sm text-purple-700 hover:underline"
            >
              Logout
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-4 gap-6 mb-8">
          <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/african-american-therapist-doctor-explaining-radiography-expertise-sick-woman-discussing-healthcare-treatment-medical-appointment-hospital-ward-patient-with-neck-cervical-collar_482257-33623.jpg?ga=GA1.1.1223372785.1726203975&semt=ais_hybrid"
              alt="Patients"
              className="w-full h-56 object-cover brightness-110"
            />
            <div className="absolute top-3 left-3">
              <h3 className="text-xl font-bold text-black shadow-md">
                Patients
              </h3>
              <span className="text-4xl font-bold text-purple-500 shadow-md">
                {patientsCount?.length}
              </span>
            </div>
          </div>

          <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/portrait-young-mother-with-little-girl-sitting-hospital-reception-lobby-attend-medical-consultation-with-appointment-waiting-room-area-healthcare-clinic-checkup-examination_482257-47694.jpg?ga=GA1.1.1223372785.1726203975&semt=ais_hybrid"
              alt="Queue"
              className="w-full h-56 object-cover brightness-110"
            />
            <div className="absolute top-3 right-3">
              <h3 className="text-xl font-bold text-black shadow-md">Queue</h3>
              <span className="text-4xl font-bold text-purple-500 shadow-md ml-6">
                {queueCount?.length}
              </span>
            </div>
          </div>

          <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/doctor-explaining-coronavirus-illustration-tablet-display-adult-little-child-medical-cabinet-man-talking-about-virus-spreading-animation-device-checkup-examination_482257-39188.jpg?ga=GA1.1.1223372785.1726203975&semt=ais_hybrid"
              alt="Appointments"
              className="w-full h-56 object-cover brightness-110"
            />
            <div className="absolute top-3 left-3">
              <h3 className="text-xl font-bold text-white shadow-md">
                Appointments
              </h3>
              <span className="text-4xl font-bold text-purple-500 shadow-md">
                4
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
