import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { MdLocalPharmacy } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";

const PharmacistDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  // Define API URLs
  const BASE_URL_PATIENTS = "http://localhost:3001/api/patients";
  const BASE_URL_MED = "http://localhost:3001/api/medication";
  const BASE_URL_BED_ALLOTMENT = "http://localhost:3001/api/bedallotment"; //change to prescription

  // State for patients, vitals, and prescriptions
  const [patients, setPatients] = useState([]);
  const [meds, setMeds] = useState([]);
  const [bedAllotment, setBedAllotment] = useState([]);

  // State for stock totals
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Fetch the data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsResponse = await axios.get(BASE_URL_PATIENTS);
        // console.log("Patients Response:", patientsResponse.data);
        setPatients(patientsResponse.data);

        const medResponse = await axios.get(BASE_URL_MED);
        // console.log("Vitals Response:", vitalsResponse.data.data);
        setMeds(medResponse.data.data);

        // Calculate total quantity after meds are fetched
        calculateTotalQuantity(medResponse.data.data);

        const bedAllotmentResponse = await axios.get(BASE_URL_BED_ALLOTMENT);
        // console.log("Bed Allotment Response:", bedAllotmentResponse.data.data);
        setBedAllotment(bedAllotmentResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate total quantity for medications
  const calculateTotalQuantity = (medications) => {
    let quantity = 0;
    medications.forEach((med) => {
      quantity += parseInt(med.quantity, 10); // Ensure quantity is a number
    });
    setTotalQuantity(quantity);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 px-8">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2 uppercase">
            <MdLocalPharmacy className="text-2xl" />
            Pharmacist
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
        <section className="grid grid-cols-4 gap-6 mb-8 h-[300px]">
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
              src="https://img.freepik.com/free-photo/medicine-capsules-global-health-with-geometric-pattern-digital-remix_53876-126742.jpg?ga=GA1.1.471668084.1725895193&semt=ais_hybrid"
              alt="meds"
              className="w-full h-full object-cover brightness-110 opacity-70"
            />
            <div className="absolute top-3 left-3 text-blue-700">
              {" "}
              <span className="text-4xl font-bold">{meds?.length}</span>
              <h3 className="text-xl font-bold">Medication</h3>
            </div>
          </div>

          <div className="relative bg-white shadow-md rounded-lg shadow-blue-700 overflow-hidden cursor-pointer">
            <img
              src="https://img.freepik.com/free-photo/young-woman-pharmacist-pharmacy_1303-25544.jpg?ga=GA1.1.471668084.1725895193&semt=ais_hybrid"
              alt="prep"
              className="w-full h-full object-cover brightness-110 opacity-70"
            />
            <div className="absolute top-3 left-3 text-blue-700">
              {" "}
              <span className="text-4xl font-bold">{bedAllotment?.length}</span>
              <h3 className="text-xl font-bold">Prescription</h3>
            </div>
          </div>

          <div className="relative bg-white shadow-md rounded-lg shadow-blue-700 overflow-hidden cursor-pointer">
            <img
              src="https://img.freepik.com/free-photo/portrait-female-pharmacist-working-drugstore_23-2151684859.jpg?ga=GA1.1.471668084.1725895193&semt=ais_hybrid"
              alt="inventory"
              className="w-full h-full object-cover brightness-110 opacity-70"
            />
            <div className="absolute top-3 left-3 text-blue-700">
              {" "}
              <span className="text-4xl font-bold">{totalQuantity}</span>
              <h3 className="text-xl font-bold">Inventory</h3>
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

export default PharmacistDashboard;
