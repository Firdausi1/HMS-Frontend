import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AiOutlineDashboard,
  AiOutlineUserAdd,
  AiOutlineSchedule
} from 'react-icons/ai';
import { FaUserFriends, FaClipboardList } from 'react-icons/fa';
import axios from 'axios';

const AccountantSideBar = () => {
  const [prescription, setPrescription] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState([]);

  const fetchPrescriptions = async () => {
    if (!patientId) {
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/api/prescription/patientPrescription/${patientId}`);
      setMedications(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/queue');
      console.log('Fetched patients:', response.data);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchPatients();
    }
  }, [isModalOpen]);

  return (
    <div className="gap-4 p-6 flex flex-col mt-6 bg-white shadow-md">
      {/* Sidebar Section */}

      <NavLink
        to="/accountant"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`
        }
      >
        <AiOutlineDashboard className="mr-3 text-lg" />
        Dashboard
      </NavLink>

      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center px-6 py-3 rounded-lg text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
      >
        <FaUserFriends className="mr-3 text-lg" />
        View Medication
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Medication Details</h2>
            <select
              value={patientId}
              onChange={(e) => {
                setPatientId(e.target.value);
                console.log('Selected Patient ID:', e.target.value);
              }}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
            >
              <option value="" disabled>Select a Patient</option>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <option key={patient.id} value={patient._id}>
                    {patient.patient_name}
                  </option>
                ))
              ) : (
                <option value="" disabled>No patients available</option>
              )}
            </select>
            {prescription.length > 0 ? (
              <ul>
                {medications.map((medication, index) => (
                  <li key={index} className="border-b border-gray-300 py-2">
                    <span className="font-semibold">Medication ID:</span> {medication.id} - 
                    <span className="font-semibold"> Medication:</span> {medication.medication} - 
                    <span className="font-semibold"> Date:</span> {new Date(medication.date).toLocaleString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No prescription available.</p>
            )}
            {(!prescription.length && !patientId) && (
              <p className="text-red-500">Please enter a Patient ID to view prescriptions.</p>
            )}
            <button
              onClick={async () => {
                if (!patientId) {
                  console.error('No Patient ID selected');
                  return;
                }
                console.log('Fetching prescriptions for Patient ID:', patientId);
                try {
                  const response = await axios.get(`http://localhost:3001/api/prescription/patientPrescriptions/${patientId}`);
                  console.log('Fetched prescriptions:', response.data);
                  setPrescription(response.data);
                  setIsModalOpen(true);
                } catch (error) {
                  console.error('Error fetching prescriptions:', error);
                }
              }}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <NavLink
        to="/payment"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`
        }
      >
        <FaClipboardList className="mr-3 text-lg" />
        New Invoice
      </NavLink>

      <NavLink
        to="/history"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`
        }
      >
        <AiOutlineSchedule className="mr-3 text-lg" />
        View Payments
      </NavLink>

      <NavLink
        to="/accountant-Profile"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`
        }
      >
        <AiOutlineUserAdd className="mr-3 text-lg" />
        Profile
      </NavLink>

    </div>
  );
};

export default AccountantSideBar;




