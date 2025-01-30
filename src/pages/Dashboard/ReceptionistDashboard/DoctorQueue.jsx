import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorQueue = () => {
  const [patients, setPatients] = useState([]);

  // Fetch queued patients
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/queue")
      .then((response) => {
        // Ensure the response data is an array and log the full response to debug
        console.log("Fetched patients:", response.data);
        
        if (Array.isArray(response.data)) {
          setPatients(response.data);
        } else {
          console.error("Expected an array of patients, but got:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
        alert("Failed to fetch patients. Please try again.");
      });
  }, []);

  // Update patient details
  const updatePatient = async (queueId, newVitals) => {
    try {
      // Ensure newVitals is either "Pending" or "Completed"
      if (newVitals !== "Pending" && newVitals !== "Completed") {
        console.error("Invalid vitals status:", newVitals);
        alert("Invalid vitals status.");
        return;
      }

      const response = await axios.put(
        `http://localhost:3001/api/queue/${queueId}`,
        { vitals: newVitals }
      );

      // Update local state with the new vitals status after successful update
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient._id === queueId ? { ...patient, vitals: newVitals } : patient
        )
      );

      alert("Patient updated successfully!");
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Doctors Queue</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border p-2">#</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Queued Time</th>
            <th className="border p-2">Vitals</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(patients) && patients.length > 0 ? (
            patients.map((patient, index) => (
              <tr key={patient._id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  {/* Check if patient.patient exists */}
                  {patient.patient ? patient.patient.name : "N/A"}
                </td>
                <td className="border p-2">
                  {patient.createdAt
                    ? new Date(patient.createdAt).toLocaleString()
                    : "N/A"}
                </td>
                <td className="border p-2">{patient.vitals || "N/A"}</td>
                <td className="border p-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => updatePatient(patient._id, "Completed")}
                  >
                    Complete
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => updatePatient(patient._id, "Pending")}
                  >
                    Pending
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No patients in queue.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorQueue;


