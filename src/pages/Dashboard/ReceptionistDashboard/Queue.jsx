import React, { useState, useEffect } from "react";
import axios from "axios";

const Queue = () => {
  const [showForm, setShowForm] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    // Fetch all registered patients
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    // Fetch patients added to the queue
    const fetchQueue = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/queue");
        setQueue(response.data);
      } catch (error) {
        console.error("Error fetching queue:", error);
      }
    };

    fetchPatients();
    fetchQueue();
  }, []);

  // const handleAddToQueue = async (e) => {
  //   e.preventDefault();

  //   if (!selectedPatient) {
  //     alert("Please select a patient.");
  //     return;
  //   }

  //   try {
  //     // Send only the patient's name to the backend
  //     const response = await axios.post("http://localhost:3001/api/queue/add", {
  //       patient_name: selectedPatient, // Send patient's name, not _id
  //     });

  //     console.log("Patient added to queue:", response.data);
  //     alert("Patient added to the queue successfully!");

  //     setSelectedPatient(""); // Reset selected patient
  //     // Refresh the queue after adding a new patient
  //     const updatedQueue = await axios.get("http://localhost:3001/api/queue");
  //     setQueue(updatedQueue.data);
  //   } catch (error) {
  //     console.error("Error adding patient to queue:", error.response ? error.response.data : error.message);
  //     alert("Failed to add patient to queue. Please try again.");
  //   }
  // };

  const handleAddToQueue = async (e) => {
    e.preventDefault();

    if (!selectedPatient) {
      alert("Please select a patient.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/queue/add", {
        patient_name: selectedPatient, // Send patient's name
      });

      console.log("Patient added to queue:", response.data);
      alert("Patient added to the queue successfully!");

      // Update queue
      setQueue((prevQueue) => [...prevQueue, response.data]);
      setSelectedPatient(""); // Reset selected patient
    } catch (error) {
      // Check if error.response exists and contains a message
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Failed to add patient to queue. Please try again.";
      console.error("Error adding patient to queue:", errorMessage);
      alert(errorMessage); // Display error message in an alert
    }
  };


  const handleDelete = async (queueId) => {
    try {
      // Delete the patient from the queue using the queueId
      const response = await axios.delete(`http://localhost:3001/api/queue/${queueId}`);
      console.log("Patient removed from queue:", response.data);
      alert("Patient removed from queue successfully!");

      // Refresh the queue after deletion
      const updatedQueue = await axios.get("http://localhost:3001/api/queue");
      setQueue(updatedQueue.data);
    } catch (error) {
      console.error("Error deleting patient from queue:", error.response ? error.response.data : error.message);
      alert("Failed to remove patient from queue. Please try again.");
    }
  };

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium ${!showForm ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"
            }`}
          onClick={() => setShowForm(false)}
        >
          Queue
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${showForm ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"
            }`}
          onClick={() => setShowForm(true)}
        >
          Add Patient to Queue
        </button>
      </div>

      {/* Queue List */}
      {!showForm && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Patient Name</th>
                <th className="py-2 px-4 text-center">Options</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((patient, index) => (
                <tr
                  key={patient._id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} border-b`}
                >
                  <td className="py-2 px-4 text-left">{index + 1}</td>
                  <td className="py-2 px-4 text-left">{patient.patient_name}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleDelete(patient._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="bg-blue-100 w-[550px] p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Add Patient to Queue</h2>
            <form onSubmit={handleAddToQueue}>
              <div className="mb-4">
                <label htmlFor="patient" className="block text-md font-medium text-blue-800">
                  Select Patient
                </label>
                <select
                  id="patient"
                  value={selectedPatient}
                  onChange={(e) => {
                    // Get the selected patient's ObjectId by name
                    const selectedPatientData = patients.find(
                      (patient) => patient.name === e.target.value
                    );
                    setSelectedPatient(selectedPatientData ? selectedPatientData.name : ""); // Set the patient's name, not _id
                  }}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a patient</option>
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient.name}>
                      {patient.name} {/* Display name */}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="w-[25%] py-2 px-2 bg-blue-900 text-white rounded-md hover:bg-blue-600">
                Add to Queue
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Queue;

