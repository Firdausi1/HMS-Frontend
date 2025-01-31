import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const QueuedPatients = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState({});

  const BASE_URL_QUEUEDPATIENTS = "http://localhost:3001/api/queue";

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(BASE_URL_QUEUEDPATIENTS);
        console.log("Fetched patients:", response.data); // Display fetched data in console
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  // Function to handle updating vitals
  const handleUpdateVitals = async (queueId, patientId, vitals) => {
    try {
      const response = await axios.put(
        `${BASE_URL_QUEUEDPATIENTS}/${queueId}`,
        {
          patient_id: patientId,
          vitals,
        }
      );
      toast.success("Vitals updated successfully");

      // Update local state
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient._id === patientId ? { ...patient, vitals } : patient
        )
      );

      setEditMode((prev) => ({ ...prev, [queueId]: false }));
    } catch (error) {
      console.error(
        "Error updating vitals:",
        error.response?.data || error.message
      );
    }
  };

  // Filter patients based on search input
  const filteredPatients = patients.filter((patient) =>
    patient.patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Patient List */}
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
            <th className="px-4 py-2 border bg-blue-600 text-white">
              Queued Time
            </th>
            <th className="px-4 py-2 border bg-blue-600 text-white">Vitals</th>
            <th className="px-4 py-2 border bg-blue-600 text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient, index) => (
            <tr key={patient._id} className="border text-xs">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{patient.patient.name}</td>
              <td className="border px-4 py-2">
                {new Date(patient.createdAt).toLocaleString()}
              </td>
              <td className="border px-4 py-2">
                <span
                  className={`${
                    patient.vitals === "Pending" ? "text-red-800" : "text-green-800"
                  }`}
                >
                  {editMode[patient._id] ? (
                    <select
                      className="border rounded p-1"
                      value={patient.vitals}
                      onChange={(e) =>
                        setPatients((prev) =>
                          prev.map((p) =>
                            p._id === patient._id
                              ? { ...p, vitals: e.target.value }
                              : p
                          )
                        )
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  ) : (
                    patient.vitals
                  )}
                </span>
              </td>
              <td className="px-4 py-2 flex gap-4">
                <Link to={"/nurse/vitals"}>
                  <button className="px-2 py-1 bg-blue-700 text-white rounded-md">
                    Vitals
                  </button>
                </Link>
                {editMode[patient._id] ? (
                  <button
                    className="px-2 py-1 bg-green-700 text-white rounded-md"
                    onClick={() =>
                      handleUpdateVitals(
                        patient._id,
                        patient.patient._id,
                        "Completed"
                      )
                    }
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="px-2 py-1 bg-green-700 text-white rounded-md"
                    onClick={() =>
                      setEditMode((prev) => ({ ...prev, [patient._id]: true }))
                    }
                  >
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
          {filteredPatients.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-4">
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QueuedPatients;
