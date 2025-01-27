import React, { useEffect, useState } from "react";
import axios from "axios";

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPrescription, setCurrentPrescription] = useState(null);
  const [newNotes, setNewNotes] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null); // For tracking selected patient
  const [activeTab, setActiveTab] = useState("list"); // State for tab navigation

  const BASE_URL = "http://localhost:3001/api/prescription/getPrescription";
  const UPDATE_URL = "http://localhost:3001/api/prescription/update/";

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(BASE_URL);
        setPrescriptions(response.data.data); // Access the `data` array from the response
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch prescriptions"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setActiveTab("details"); // Switch to the details tab when a patient is clicked
  };

  const handleBack = () => {
    setSelectedPatient(null);
    setActiveTab("list"); // Go back to the list tab
  };

  const handleEdit = (prescription) => {
    setCurrentPrescription(prescription);
    setNewNotes(prescription.notes || "");
    setIsModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentPrescription(null);
    setNewNotes("");
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${UPDATE_URL}${currentPrescription._id}`,
        {
          notes: newNotes,
        }
      );
      if (response.data.message === "Prescription updated successfully") {
        setPrescriptions((prevPrescriptions) =>
          prevPrescriptions.map((pres) =>
            pres._id === currentPrescription._id
              ? { ...pres, notes: newNotes }
              : pres
          )
        );
        handleModalClose(); // Close the modal after updating
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update prescription");
    }
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="p-6">
        {/* Tab Content */}
        {activeTab === "list" ? (
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Prescription List
            </h2>
            <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 border bg-blue-600 text-white">#</th>
                  <th className="px-4 py-2 border bg-blue-600 text-white">
                    Patient Name
                  </th>
                  <th className="px-4 py-2 border bg-blue-600 text-white">
                    Medication Names
                  </th>
                  <th className="px-4 py-2 border bg-blue-600 text-white">
                    Dose
                  </th>
                  <th className="px-4 py-2 border bg-blue-600 text-white">
                    Date Created
                  </th>
                  <th className="px-4 py-2 border bg-blue-600 text-white">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {prescriptions?.map((prescription, index) => (
                  <tr key={prescription._id} className="border text-xs">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td
                      className="border px-4 py-2 text-blue-700 cursor-pointer"
                      onClick={() => handlePatientClick(prescription.patient)}
                    >
                      {prescription.patient?.name}
                    </td>
                    <td className="border px-4 py-2">
                      {prescription.medications.map((med, medIndex) => (
                        <span key={medIndex}>
                          {med.medication.name}
                          {medIndex < prescription.medications.length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))}
                    </td>
                    <td className="border px-4 py-2">
                      {prescription.notes || "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(prescription.date).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2 flex justify-between">
                      <button
                        className="px-2 py-1 bg-blue-700 text-white rounded-md"
                        onClick={() => handleEdit(prescription)}
                      >
                        Dosage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6">
            <button
              className="px-4 py-2 bg-blue-700 text-white rounded-md mb-4"
              onClick={handleBack}
            >
              Back to List
            </button>
            {loading ? (
              <p>Loading prescriptions...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : prescriptions.length > 0 ? (
              <ul className="space-y-4">
                {prescriptions
                  .filter(
                    (prescription) =>
                      prescription.patient._id === selectedPatient._id
                  )
                  .map((prescription) => (
                    <li
                      key={prescription._id}
                      className="p-4 border rounded-lg shadow bg-blue-700/5"
                    >
                      <h1 className="text-xl font-bold mb-4">
                        Patient: {selectedPatient?.name}
                      </h1>
                      <h1 className="uppercase mt-10 text-lg font-bold">
                        Medications
                      </h1>
                      <div className="h-[2px] w-full bg-blue-500 mb-4"></div>
                      <p className="mb-4">
                        <strong>Drugs:</strong>
                      </p>
                      <ul className="list-decimal pl-6">
                        {prescription.medications.map((med, index) => (
                          <li className="mb-4" key={med._id}>
                            {med.medication.name}
                          </li>
                        ))}
                      </ul>
                      <p className="mb-4">
                        <strong>Dosage:</strong>{" "}
                        {prescription.notes || "No dosage provided"}
                      </p>
                      <p className="mb-4">
                        <strong>Date:</strong>{" "}
                        {new Date(prescription.date).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No prescriptions found for this patient.</p>
            )}
          </div>
        )}
      </div>

      {/* Modal for editing notes */}
      {isModalOpen && currentPrescription && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-lg font-bold mb-4">Add Dosage</h2>
            <textarea
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              placeholder="Enter new dosage notes"
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Save
              </button>
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescription;
