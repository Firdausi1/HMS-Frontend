import axios from "axios";
import React, { useEffect, useState } from "react";

const Patients2 = () => {
  const [patients, setPatients] = useState([]);

  const BASE_URL_PATIENTS = "http://localhost:3001/api/patients";

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(BASE_URL_PATIENTS);
        // console.log("Fetched patients:", response.data); // Display fetched data in console
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);
  return (
    <div className="p-6">
      {/* Patient List */}
      <h2 className="text-lg font-bold text-gray-700 mb-4">Patient List</h2>
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
