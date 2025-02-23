import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../../../components/Modal/DeleteModal";
import { EmployeeContext } from "../../../context/EmployeeContext";

const Patients2 = () => {
  const [patients, setPatients] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    gender: "",
    genotype: "",
    bloodGroup: "",
  });
  const { setPatientId, deletePatient } = useContext(EmployeeContext);
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const bloodGroup = ["O+", "A+", "AB", "O-", "B", "A-"];

  const BASE_URL_PATIENTS = "http://localhost:3001/api/patients/search";

  // Function to fetch patients
  const fetchPatients = async (filters = {}) => {
    try {
      const response = await axios.get(BASE_URL_PATIENTS, { params: filters });
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchPatients(filters); // Fetch patients based on search term
  }, [filters]);

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Patient List</h2>
        <input
          type="text"
          name="search"
          placeholder="Search by Name or ID"
          onChange={handleChange}
          className="mb-4 p-2 border border-gray-300 rounded w-96 outline-none"
        />
        {!user?.role && (
          <div className="flex justify-between gap-6">
            <div className="flex items-center">
              <p className="w-full text-sm">Filter by Blood Group:</p>
              <select
                id="bloodGroup"
                name="bloodGroup"
                onChange={handleChange}
                className="w-full  p-1 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                {bloodGroup?.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <p className="w-full text-sm">Filter by Gender:</p>
              <select
                id="gender"
                name="gender"
                onChange={handleChange}
                className="w-full  p-1 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="male" key="male">
                  Male
                </option>
                <option value="female" key="female">
                  Female
                </option>
              </select>
            </div>
          </div>
        )}
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
            {!user.role && (
              <th className="px-4 py-2 border bg-blue-600 text-white">
                Action
              </th>
            )}
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
              {!user?.role && (
                <td className="border px-2 py-4">
                  <Link
                    className="px-2 py-1 bg-blue-700 text-white rounded-md"
                    to={"/"}
                  >
                    View
                  </Link>

                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded-md ml-2"
                    onClick={() => {
                      setPatientId(patient._id);
                      setShowModal(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <DeleteModal
          close={() => setShowModal(false)}
          proceed={() => {
            deletePatient();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Patients2;
