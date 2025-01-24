import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { FaUserNurse } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";

const NurseDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  // Define API URLs
  const BASE_URL_PATIENTS = "http://localhost:3001/api/patients";
  const BASE_URL_VITALS = "http://localhost:3001/api/vitals";
  const BASE_URL_BED_ALLOTMENT = "http://localhost:3001/api/bedallotment";

  // State for patients, vitals, and bed allotment
  const [patients, setPatients] = useState([]);
  const [vitals, setVitals] = useState([]);
  const [bedAllotment, setBedAllotment] = useState([]);

  // Fetch the data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsResponse = await axios.get(BASE_URL_PATIENTS);
        console.log("Patients Response:", patientsResponse.data);
        setPatients(patientsResponse.data);

        const vitalsResponse = await axios.get(BASE_URL_VITALS);
        console.log("Vitals Response:", vitalsResponse.data.data);
        setVitals(vitalsResponse.data.data);

        const bedAllotmentResponse = await axios.get(BASE_URL_BED_ALLOTMENT);
        console.log("Bed Allotment Response:", bedAllotmentResponse.data.data);
        setBedAllotment(bedAllotmentResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 px-8">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2 uppercase">
            <FaUserNurse className="text-2xl" />
            Nurse
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-semibold">
              {user ? `${user.firstName}` : ""}
            </span>
            <div
              onClick={logout}
              className="text-sm text-purple-700  cursor-pointer px-4 py-2 bg-blue-300 rounded-md"
            >
              Logout
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-4 gap-6 mb-8 h-[150px]">
          <div className="relative bg-white shadow-md rounded-lg shadow-blue-700 overflow-hidden cursor-pointer">
            <img
              src="https://img.freepik.com/free-photo/african-american-therapist-doctor-explaining-radiography-expertise-sick-woman-discussing-healthcare-treatment-medical-appointment-hospital-ward-patient-with-neck-cervical-collar_482257-33623.jpg?ga=GA1.1.1223372785.1726203975&semt=ais_hybrid"
              alt="patients"
              className="w-full h-full object-cover brightness-110 opacity-40"
            />
            <div className="absolute top-3 left-3 text-blue-700">
              <span className="text-4xl font-bold">{patients?.length}</span>
              <h3 className="text-xl font-bold">Patients</h3>
            </div>
          </div>

          <div className="relative bg-white shadow-md rounded-lg  shadow-blue-700 overflow-hidden cursor-pointer">
            <img
              src="https://img.freepik.com/free-photo/excited-female-doctor-asian-physician-holding-clipboard-raising-pen-up-found-solution-idea-standing-medical-face-mask-white-background_1258-83479.jpg?ga=GA1.1.471668084.1725895193&semt=ais_incoming_vrsd"
              alt="vitals"
              className="w-full h-full object-cover brightness-110 opacity-70"
            />
            <div className="absolute top-3 left-3 text-blue-700">
              {" "}
              <span className="text-4xl font-bold">{vitals?.length}</span>
              <h3 className="text-xl font-bold">Vital Signs</h3>
            </div>
          </div>

          <div className="relative bg-white shadow-md rounded-lg shadow-blue-700 overflow-hidden cursor-pointer">
            <img
              src="https://img.freepik.com/free-psd/hospital-room-with-bed-table-generative-ai_587448-2116.jpg?ga=GA1.1.471668084.1725895193&semt=ais_incoming_vrsd"
              alt="beds"
              className="w-full h-full object-cover brightness-110 opacity-70"
            />
            <div className="absolute top-3 left-3 text-blue-700">
              {" "}
              <span className="text-4xl font-bold">{bedAllotment?.length}</span>
              <h3 className="text-xl font-bold">Bed Allotment</h3>
            </div>
          </div>
          <div className="relative bg-white shadow-md rounded-lg shadow-blue-700 overflow-hidden cursor-pointer">
            <img
              src="https://img.freepik.com/free-psd/3d-rendered-light-blue-gear-icon-transparent-background_84443-30368.jpg?ga=GA1.1.471668084.1725895193&semt=ais_incoming_vrsd"
              alt="profile"
              className="w-full h-full object-cover brightness-110 opacity-70"
            />
            <div className="absolute top-3 left-3 text-blue-700">
              {" "}
              <span className="text-4xl font-extrabold">
                <AiOutlineUserAdd />
              </span>
              <h3 className="text-xl font-bold">Profile</h3>
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

export default NurseDashboard;
