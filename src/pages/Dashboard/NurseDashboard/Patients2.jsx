import axios from "axios";
import React, { useEffect, useState } from "react";

const Patients2 = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const BASE_URL_PATIENTS = "http://localhost:3001/api/patients/search";

  // Function to fetch patients
  const fetchPatients = async (searchQuery = "") => {
    try {
      const response = await axios.get(BASE_URL_PATIENTS, {
        params: { name: searchQuery }, // Send the name query parameter if available
      });
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients(); // Fetch all patients on initial load
  }, []);

  useEffect(() => {
    fetchPatients(searchTerm); // Fetch patients based on search term
  }, [searchTerm]);

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Patient List</h2>
        <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-96 outline-none"
      />
      </div>
      
      <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 border bg-blue-600 text-white">#</th>
            <th className="px-4 py-2 border bg-blue-600 text-white">Name</th>
            <th className="px-4 py-2 border bg-blue-600 text-white">Phone</th>
            <th className="px-4 py-2 border bg-blue-600 text-white">Gender</th>
            <th className="px-4 py-2 border bg-blue-600 text-white">Age</th>
            <th className="px-4 py-2 border bg-blue-600 text-white">
              Blood Group
            </th>
            <th className="px-4 py-2 border bg-blue-600 text-white">
              Time Of Registration
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={patient._id} className="border text-xs">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{patient.name}</td>
              <td className="border px-4 py-2">{patient.phone}</td>
              <td className="border px-4 py-2">{patient.gender}</td>
              <td className="border px-4 py-2">{patient.age}</td>
              <td className="border px-4 py-2">{patient.bloodGroup}</td>
              <td className="border px-4 py-2">{patient.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patients2;
